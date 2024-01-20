import * as z from 'zod';

export const userValidation = z.object({
    profile_photo: z.string(
        {required_error:"Profile photo is required"}
    ).url(),
    name: z.string(
        {required_error:"Name must be atleast 3 words"})
        .min(3).max(50),
    username: z.string({
        required_error:"Username is required"
    }).min(3).max(20),
    bio: z.string().max(500),
});
