import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>

        </div>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1 mb-2'>
          Community Annoucements 
        </h3>
        <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">XU-3 Greater Noida</p>
        <small className="text-default-500">14th Feb | 2pm-9pm</small>
        <h4 className="font-bold text-large">Power Cut</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="assets/images/ew2.jpeg"
          width={270}
        />
      </CardBody>
    </Card>
        </div>
    </section>
  )
}

export default RightSidebar