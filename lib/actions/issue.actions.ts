"use server";

import { connectToDB } from "../mongoose";
import Issue from "../models/issue.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Community from "../models/community.model";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createIssue({ text, author, communityId, path }: Params) {
  try {
    connectToDB();

    const communityIdObject = await Community.findOne(
      { id: communityId },
      { _id: 1 },
    );

    const createdIssue = await Issue.create({
      text,
      author,
      community: communityIdObject,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { issues: createdIssue._id },
    });

    if (communityIdObject) {
      // Update Community model
      await Community.findByIdAndUpdate(communityIdObject, {
        $push: { issues: createdIssue._id },
      });
    }

    revalidatePath(path);
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
      path: "community",
      model: Community,
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

  return { posts, isNext };
}

export async function fetchIssueById(id: string) {
  connectToDB();

  try {
    const issue = await Issue.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Issue,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return issue;
  } catch (err: any) {
    throw new Error(`"Unable to fetch issue": ${err.message}`);
  }
}

export async function addCommentToIssue(
  issueId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectToDB();

  try {
    const originalIssue = await Issue.findById(issueId);
    if (!originalIssue) throw new Error("Issue not found");

    const commentIssue = new Issue({
      text: commentText,
      author: userId,
      parentId: issueId,
    });

    const savedCommentIssue = await commentIssue.save();

    originalIssue.children.push(savedCommentIssue._id);

    await originalIssue.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to issue: ${error.message}`);
  }
}

async function fetchAllChildIssues(issueId: string): Promise<any[]> {
  const childIssues = await Issue.find({ parentId: issueId });

  const descendantIssues = [];
  for (const childIssue of childIssues) {
    const descendants = await fetchAllChildIssues(childIssue._id);
    descendantIssues.push(childIssue, ...descendants);
  }

  return descendantIssues;
}
export async function deleteIssue(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    const mainIssue = await Issue.findById(id).populate("author community");

    if (!mainIssue) {
      throw new Error("Issue not found");
    }

    const descendantIssues = await fetchAllChildIssues(id);

    const descendantIssueIds = [
      id,
      ...descendantIssues.map((issue) => issue._id),
    ];

    const uniqueAuthorIds = new Set(
      [
        ...descendantIssues.map((issue) => issue.author?._id?.toString()),
        mainIssue.author?._id?.toString(),
      ].filter((id) => id !== undefined),
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantIssues.map((issue) => issue.community?._id?.toString()),
        mainIssue.community?._id?.toString(),
      ].filter((id) => id !== undefined),
    );

    await Issue.deleteMany({ _id: { $in: descendantIssueIds } });

    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { issues: { $in: descendantIssueIds } } },
    );

    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { issues: { $in: descendantIssueIds } } },
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete issue: ${error.message}`);
  }
}
export async function fetchAllIssues() {
  await connectToDB();

  try {
    const allIssues = await Issue.find({ parentId: { $exists: false } });
    return allIssues;
  } catch (err) {
    throw new Error("Can't fetch all issues");
  }
}
