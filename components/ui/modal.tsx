import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Checkbox,
    Divider,
  } from "@nextui-org/react";
  import Sliders from "./slider";
  import React, { useState } from "react";
  
  export default function Modals({ isOpen, onOpenChange }) {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  
    const handleCheckboxChange = (isChecked) => {
      setIsCheckboxChecked(isChecked);
  
      // Reset slider value when checkbox is unchecked
    };
  
    return (
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Poll your Issue
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit
                  amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
                  consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                  et. Culpa deserunt nostrud ad veniam.
                </p>
                <Divider className="my-3" />
                <div className="flex items-center">
                  <span className="mx-0 text">Are you facing this problem?</span>
                  <Checkbox
                    defaultSelected={isCheckboxChecked}
                    radius="full"
                    onChange={(isChecked) => handleCheckboxChange(isChecked)}
                    className="px-8 text-white text"
                  ></Checkbox>
                </div>{" "}
                <Divider className="my-2" />
                <Sliders />
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }