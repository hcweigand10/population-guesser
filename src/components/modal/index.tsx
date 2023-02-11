import React, { useState } from "react";
import "./modal.styles.css";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

export default function Modal({ setShowModal, showModal }: Props) {
  return (
    <>
      {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
      {showModal ? (
        <>
          <div className="animate-reveal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    How to play
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Guess the population of the given country
                    <ul>
                      <li>Guesses are made in the millions</li>
                      <li>Your score will be provided to you after your guess. Aim to get 100!</li>
                    </ul>
                  </p>

                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    For the daily mode, you only have one try so do your best
                    guess.
                  </p>

                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Practice using out practice mode to get a feel of how the
                    game works!
                  </p>

                  <h1 className="text-black">Examples</h1>
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Country: Japan; Guess: 10 = 10 million
                  </p>

                </div>
                {/*footer*/}
                <div className="flex flex-col items-start justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    A new country is released daily at midnight. If you haven't already, you can sign up for our daily reminder email.
                  </p>

                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Have feedback? Email us at testing@testing.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}