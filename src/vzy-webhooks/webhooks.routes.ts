import express, { Request, Response } from 'express';
import { Types } from 'mongoose';
import Stripe from 'stripe';

import { baseRouter } from '../vzy-shared/api';
import { PaymentStatus, UserModel } from '../vzy-entities';

const stripe = new Stripe('your test key', {
    apiVersion: '2023-10-16', // Replace with your desired API version and also your stripe secret
});
const { POST, router } = baseRouter();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_....."; // add your whec here

POST('/stripe', [express.raw({ type: 'application/json' }), async (request: Request, response: Response) => {
    const sig = request.headers['stripe-signature'] as string;
    let event, userID;

    try {
        // Cast request.body to Buffer explicitly
        event = stripe.webhooks.constructEvent(request.body as Buffer, sig, endpointSecret);
    } catch (err) {
        console.log("erro", { err })
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }


    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            console.log('AM CLALLED SUCCESS')
            userID = new Types.ObjectId(event.data.object.metadata?.userID);
            await UserModel.findByIdAndUpdate(userID, { paymentStatus: PaymentStatus.PAID })
            break;
        case 'payment_intent.payment_failed':
            console.log('AM CLALLED failed')
            userID = new Types.ObjectId(event.data.object.metadata?.userID);
            await UserModel.findByIdAndUpdate(userID, { paymentStatus: PaymentStatus.UNPAID })
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.status(200).json({ received: true });
}]);

export default router;
