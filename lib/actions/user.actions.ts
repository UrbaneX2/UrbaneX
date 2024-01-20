"use server"

import { connectToDB } from "../mongoose"
import User from "../models/user.model"
import { revalidatePath } from "next/cache";

export async function fetchUser(userId: string) {
    try {
      connectToDB();

      return await User.findOne({ id: userId });
    } catch (error: any) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
  }

export async function updateUser(
   {
    userId,
    username,
    name,
    bio,
    image,
    path,
   }: Params): Promise<void> {
   connectToDB();

    try {
        await User.findOneAndUpdate(
            {id: userId},
            {username: username.toLowerCase(),
             name: name,
             bio: bio,
             image: image,
             onboarded:true,
            },
            {upsert: true}
            );

            if(path === '/profile/edit'){
                revalidatePath(path);
            }
    } catch (error:any) {
        throw new Error(`Error creating/updating user: ${error.message}`);
    } 
}