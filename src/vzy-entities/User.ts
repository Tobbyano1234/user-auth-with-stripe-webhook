import { Document, Schema, model } from "mongoose";
import { ModelNames } from "./models.names";

export enum PaymentStatus {
    PAID = "paid",
    UNPAID = "unpaid"
};

export class User extends Document {
    email: string;
    password: string;
    isNewUser: boolean;
    paymentStatus: PaymentStatus;
};

const UserSchema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    isNewUser: { type: Boolean, default: true, required: true },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.UNPAID, required: true }
},
    { timestamps: true },
);

export const UserModel = model<User>(ModelNames.USER, UserSchema);
