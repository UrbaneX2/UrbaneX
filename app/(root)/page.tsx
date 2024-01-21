import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { fetchPosts } from '@/lib/actions/issue.actions';
import { currentUser } from '@clerk/nextjs';
import IssueCard from '@/components/cards/IssueCard';


export default async function Home() {

  const result = await fetchPosts(1, 25);
  const user = await currentUser();

  console.log(result);
  return (
   <>
   <h1 className="head-text text-left">Home</h1>

   <section className="mt-9 flex flex-col gap-10">
    {result.posts.length === 0 ? (
       <p className='no-result'>No Issues Found</p>
      ):(
        <>
        {result.posts.map((post) => (
          <IssueCard 
          key={post._id}
          id={post._id}
          currentUserId={user?.id || ""}
          parentId={post.parentId} 
          content = {post.text}
          author = {post.author}
          community = {post.community}
          createdAt={post.createdAt}
          comments={post.comments}          
          />
            ))}
          </>
        )}
      </section>
   </>
  );
}