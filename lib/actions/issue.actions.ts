"use server";

import { connectToDB } from '../mongoose';
import Issue from '../models/issue.model';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createIssue({
    text,
    author,
    communityId,
    path
}: Params) {
    try {
        connectToDB();

    const createdIssue = await Issue.create({
        text,
        author,
        community: null,
    });

    // Update user model
    await User.findByIdAndUpdate(author,{
        $push: {issues: createdIssue._id}
    });

    revalidatePath(path)
    } catch (error: any) {
        throw new Error(`Error creating issue: ${error.message}`);
    }
     
    }

export async function fetchPosts(pageNumber = 1, pageSize = 15) {

    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // fetch the posts that have no parents (top level issues)

    const postsQuery = Issue.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children", 
      populate: {
        path: "author", 
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

    const totalPostsCount = await Issue.countDocuments({
        parentId: { $in: [null, undefined] },
      });

      const posts = await postsQuery.exec();

      const isNext = totalPostsCount > skipAmount + posts.length;

      return {  posts, isNext };
    }
