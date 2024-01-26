"use client";
import { useEffect, useState } from "react";
import Cards from "@/components/ui/cards";
import { fetchAllIssues } from "@/lib/actions/issue.actions";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [allIssue, setAllIssue] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllIssues();
        setAllIssue(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container flex flex-col ">
      <section className="flex flex-wrap gap-4 items-center">
        <Button color="success">Open Issues</Button>
        <Button color="warning">Inprogress Issues</Button>
        <Button color="danger">Closed Issues</Button>
      </section>

      <section className="flex flex-col lg:flex-grow bg-transparent p-4 lg:p-10 gap-4 rounded-md md:p-10">
        {allIssue.map((issue) => (
          <Cards
            key={issue._id}
            createdAt={issue.createdAt.toString()}
            author={issue.author}
            _id={issue._id}
            text={issue.text}
          />
        ))}
      </section>
    </div>
  );
}
