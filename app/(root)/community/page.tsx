import Cards from "@/components/ui/cards";
import Navbars from "@/components/ui/navbar";
import { Button } from "@nextui-org/react";
export default function Home() {
  return (
<>
  <div className="main-container flex-col">
    <section className="flex flex-row bg-gray-800 rounded-md lg:mt-0 fixed z-10">
      <Button className="bg-green-500 px-4 lg:px-5 mb-2 hover:bg-green-600">
        Open issues
      </Button>
      <Button className="bg-yellow-500 px-4 lg:px-5 mb-2 hover:bg-yellow-600">
        InProgress issues
      </Button>
      <Button className="bg-red-500 px-4 lg:px-5 mb-2 hover:bg-red-600">
        Closed issues
      </Button>
    </section>
    <section className="flex flex-col bg-blue-500 gap-4 p-10 grow">
      <Cards />
      <Cards />
    </section>
  </div>
</>
  );
}