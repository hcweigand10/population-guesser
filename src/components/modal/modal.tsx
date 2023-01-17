import React, { useState } from "react";

type Props = {
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  modalStatus: boolean;
};

export default function modal({ setModalStatus, modalStatus }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
      <p className="w-1/3 text-center text-white">
        modal test
      </p>
    </div>
  );
}
