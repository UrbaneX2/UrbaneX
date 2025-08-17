import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostIssue from "@/components/forms/PostIssue";

async function Page()  {

    const user = await currentUser();
    if(!user) return null; // to avoid typescript warnings

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect("/onboarding");

    return(
        <>
        <h1 className="head-text">Create Issue</h1>

        <PostIssue userId={userInfo._id} />
        </>
        
    )
}

export default Page;