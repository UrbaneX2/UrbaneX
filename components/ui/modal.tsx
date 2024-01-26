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

export default function Modals({ isOpen, onOpenChange, text }) {
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
              <p>{text}</p>
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
              <Button color="danger" variant="light" onPress={onClose}>
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
