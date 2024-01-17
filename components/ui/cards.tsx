"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import Sliders from "./slider";
export default function Cards() {
  return (
    <Card className="max-w-[340px] ">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5>
          </div>
        </div>
        <Sliders />
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Button className="bg-sky-500"> Poll</Button>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            12th Jan, 2014
          </p>
          <p className="text-default-400 text-small">at 2:00 PM</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Posted by</p>
          <p className="text-default-400 text-small">@Aditya</p>
        </div>
      </CardFooter>
    </Card>
  );
}
