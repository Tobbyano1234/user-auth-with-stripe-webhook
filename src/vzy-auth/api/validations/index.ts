import { Joi } from "celebrate";

export default {
  signupUser: {
    body: {
      email: Joi.string().email().min(5).max(500).required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It should be a minimum of 6 characters long."
        }),
      confirmPassword: Joi.ref("password"),
    },
  },
  signinUser: {
    body: {
      email: Joi.string().email().min(5).max(500).required(),
      password: Joi.string().required(),
    },
  },
};
