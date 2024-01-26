import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import IssueCard from "../cards/IssueCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
}

interface Result {
    name: string;
    image: string;
    id: string;
    issues: {
      _id: string;
      text: string;
      parentId: string | null;
      author: {
        name: string;
        image: string;
        id: string;
      };
      community: {
        id: string;
        name: string;
        image: string;
      } | null;
      createdAt: string;
      children: {
        author: {
          image: string;
        };
      }[];
    }[];
  }

const IssuesTab = async({currentUserId, accountId, accountType}: Props) => {

  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }
    
  return (
    <section className='mt-9 flex flex-col gap-10'>
    {result.issues.map((issue: any) => (
      <IssueCard
        key={issue._id}
        id={issue._id}
        currentUserId={currentUserId}
        parentId={issue.parentId}
        content={issue.text}
        author=
        {
          accountType === "User"
            ? { name: result.name, image: result.image, id: result.id }
            : {
                name: issue.author.name,
                image: issue.author.image,
                id: issue.author.id,
              }
        }
        community={issue.community}
        createdAt={issue.createdAt}
        comments={issue.children}
      />
    ))}
  </section>
);
}

export default IssuesTab