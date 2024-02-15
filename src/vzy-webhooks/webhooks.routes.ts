import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Stripe from 'stripe';

import { baseRouter } from '../vzy-shared/api';
import {PaymentStatus, UserModel } from '../vzy-entities';

const stripe = new Stripe('your-stripe-secret-key', {
    apiVersion: '2023-10-16', // Replace with your desired API version and also your stripe secret
});
const { POST, router } = baseRouter();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_fdb787d9114e32ceb1b632cb9b95537ebd4ecd23845a451fec3a1976b995c6c7";

POST('/stripe', [express.raw({ type: '*/*' }), async (request: Request, response: Response) => {
    const sig = request.headers['stripe-signature'] as string;
    let event, userID;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_succeeded':
            userID = new Types.ObjectId(event.data.object.metadata?.userID);
            await UserModel.findByIdAndUpdate(userID, { paymentStatus: PaymentStatus.PAID})
            break;
        case 'checkout.session.async_payment_failed':
            userID = new Types.ObjectId(event.data.object.metadata?.userID);
            await UserModel.findByIdAndUpdate( userID, { paymentStatus: PaymentStatus.UNPAID })
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.status(200).json({ received: true });
}]);

export default router;



// // Handle the event
// switch (event.type) {
//     case 'checkout.session.async_payment_failed':
//         const paymentIntentSucceeded = event.data.object;
//         console.log(paymentIntentSucceeded)
//         // Then define and call a function to handle the event payment_intent.succeeded
//         break;
//     // ... handle other event types
//     default:
//         console.log(`Unhandled event type ${event.type}`);
// }

// // Return a 200 response to acknowledge receipt of the event
// response.send();
