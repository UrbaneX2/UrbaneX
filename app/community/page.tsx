import Cards from "@/components/ui/cards";
import Navbars from "@/components/ui/navbar";
import { Button } from "@nextui-org/react";
export default function Home() {
  return (
    <>
      <Navbars />
      <div className="flex flex-row bg-black w-screen h-screen">
        <div className="flex flex-col bg-blue-500 p-10 gap-4 grow">
          <Cards />
          <Cards />
        </div>
        <div className="flex flex-col bg-violet-500 rounded-lg grow">
          <Button className="bg-blue-200 px-5">Open issues</Button>
          <Button className="bg-blue-200 px-5">InProgress issues</Button>
          <Button className="bg-blue-200 px-5">Closed issues</Button>
        </div>
      </div>
    </>
  );
}
