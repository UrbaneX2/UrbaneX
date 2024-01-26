"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { Button, Progress, useDisclosure } from "@nextui-org/react";
import Modals from "./modal";

export default function Cards({ createdAt, author, text, _id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="max-w-[340px] sm:max-w-full bg-gray-800 text-white">
      <CardHeader className="justify-between flex-col sm:flex-row items-center">
        <div className="flex flex-col items-center sm:items-start gap-3 sm:flex-row sm:gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {author}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {_id}
            </h5>
          </div>
        </div>

        <Progress
          size="sm"
          radius="sm"
          classNames={{
            base: "max-w-60",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="Issue resolved"
          value={37}
          showValueLabel={true}
        />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{text}</p>
      </CardBody>
      <CardFooter className="flex flex-col gap-3 sm:flex-row sm:gap-1 items-center justify-end">
        <div className="flex gap-1 px-10">
          <Button className="bg-sky-500" onPress={onOpen} color="secondary">
            Poll
          </Button>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {createdAt}
          </p>
          <p className="text-default-400 text-small">at 2:00 PM</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Posted by</p>
          <p className="text-default-400 text-small">{`@ ${author}`}</p>
        </div>
        <Modals isOpen={isOpen} onOpenChange={onOpenChange} />
      </CardFooter>
    </Card>
  );
}
