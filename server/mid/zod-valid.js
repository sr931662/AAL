

const { z } = require("zod");

const addressSchema = z.object({
    pincode: z
    .string({ required_error: "Pincode is required" }) 
    .trim()
    .length(6, { message: "Pincode must be exactly 6 digits" })
    .regex(/^\d{6}$/, { message: "Pincode must contain only digits" }),

    houseNo: z
        .string({ required_error: "House number is required" })
        .trim()
        .min(1, { message: "House number cannot be empty" }),
    street_name: z
        .string({ required_error: "Street name is required" })
        .trim()
        .min(3, { message: "Street name must be at least 3 characters" }),
    district: z.string().trim().optional(),
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(2, { message: "City must be at least 2 characters" }),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(2, { message: "State must be at least 2 characters" }),
    country: z
        .string({ required_error: "Country is required" })
        .trim()
        .min(2, { message: "Country must be at least 2 characters" })
});

const signupSchema = z.object({
    fname: z
        .string({ required_error: "First name is required" })
        .trim()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(255, { message: "First name must not exceed 255 characters" }),
    mname: z.string().trim().optional(), // Middle name is optional
    lname: z
        .string({ required_error: "Last name is required" })
        .trim()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(255, { message: "Last name must not exceed 255 characters" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(20, { message: "Phone number must not exceed 20 digits" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must not exceed 255 characters" }),
    pass: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(1024, { message: "Password must not exceed 1024 characters" }),
    repass: z
        .string({ required_error: "Confirm password is required" })
        .min(8, { message: "Confirm password must be at least 8 characters" })
        .max(1024, { message: "Confirm password must not exceed 1024 characters" }),
    address: addressSchema,
    role: z
        .enum(["pet_owner", "vet", "visitor", "admin"], { required_error: "Role is required" })
});

module.exports = signupSchema;
