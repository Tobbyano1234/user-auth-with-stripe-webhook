import { Joi } from "celebrate";

export const schema = {
    NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
    PORT: Joi.number().default(4500),
    MONGO_HOST: Joi.string()
        .default('mongodb://localhost/vzy')
        .description('Production Database host name')
        .required(),
}