import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

import { currentUser } from "@clerk/nextjs/server";

import UserCard from "../cards/UserCard";

import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

const RightSidebar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const suggestedCom = await fetchCommunities({ pageSize: 4 });

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>
        <div className='mt-7 flex w-[350px] flex-col gap-9'>
          {suggestedCom.communities.length > 0 ? (
            <>
              {suggestedCom.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>
              No communities yet
            </p>
          )}
        </div>

        </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1 mb-2'>
          Community Annoucements 
        </h3>
        <Card className="py-4 bg-gray-800">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start ">
        <p className="text-tiny uppercase font-bold text-white">XU-3 Greater Noida</p>
        <small className="text-default-500">14th Feb | 2pm-9pm</small>
        <h4 className="font-bold text-large text-red-500">Power Cut due to maintenance <br />work at Lane 6 Substation</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="assets/images/elec.jpeg"
          width={290}
          height={140}
        />
      </CardBody>
    </Card>
        </div>
    </section>
  )
}

export default RightSidebar