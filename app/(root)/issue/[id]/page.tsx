import IssueCard from "@/components/cards/IssueCard";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchIssueById } from "@/lib/actions/issue.actions";
import Comment from "@/components/forms/Comment";

async function Page({ params }: { params: { id: string } }) {
    if(!params.id) return null;
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    const issue = await fetchIssueById(params.id);

    return (
        <section className='relative'>
        <div>
          <IssueCard
            key={issue._id}
            id={issue._id}
            currentUserId={user.id || ""}
            parentId={issue.parentId}
            content={issue.text}
            author={issue.author}
            community={issue.community}
            createdAt={issue.createdAt}
            comments={issue.children}
          />
        </div>
  
        <div className='mt-4'>
          <Comment
            issueId={params.id}
            currentUserImg={user.imageUrl}
            currentUserId={JSON.stringify(userInfo._id)}
          />
        </div>
        
        <div className='mt-10'>
        {issue.children.map((childItem: any) => (
          <IssueCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>

    </section>
    )
}

export default Page;