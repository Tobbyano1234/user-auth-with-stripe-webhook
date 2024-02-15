import express, { Request, Response } from 'express';
import { Types } from 'mongoose';

import { baseRouter } from '../vzy-shared/api';
import { PaymentStatus, UserModel } from '../vzy-entities';


const { POST, router } = baseRouter();

POST('/stripe', [express.raw({ type: 'application/json' }), async (request: Request, response: Response) => {
    const event = request.body;
    let userID;

    // Handle the event
    switch (event.type) {
        case 'charge.succeeded':
            userID = new Types.ObjectId(event.data.object.metadata?.userID);
            await UserModel.findByIdAndUpdate(userID, { paymentStatus: PaymentStatus.PAID })
            break;
        case 'charge.failed':
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
