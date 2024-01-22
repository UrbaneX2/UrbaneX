import IssueCard from "@/components/cards/IssueCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchIssueById } from "@/lib/actions/issue.actions";
import Comment from "@/components/forms/Comment";

const Page = async ({params}: {params: {id: string}}) => {
    if(!params.id) return null;
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");

    const issue = await fetchIssueById(params.id);

    return (

    <section className="relative">
        <div>
        <IssueCard 
          key={issue._id}
          id={issue._id}
          currentUserId={user?.id || ""}
          parentId={issue.parentId} 
          content = {issue.text}
          author = {issue.author}
          community = {issue.community}
          createdAt={issue.createdAt}
          comments={issue.comments}          
          />
        </div>

        <div className="mt-7">
            <Comment 
            issueId={issue.id}
            currentUserImg={user.imageUrl}
            currentUserId={JSON.stringify(userInfo._id)}
            />
        </div>

    </section>
    )
}

export default Page;