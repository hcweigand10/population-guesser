import React, { useState } from "react";
import henryPic from "../assets/zoomedProfpic.png";
import takaraPic from "../assets/takara.jpg";

const About = () => {
  return (
    <div className="p-5 text-white">
      <h1 className="text-4xl text-center py-3">About</h1>
      <div className="my-4 text-xl">
        <p className="max-w-xl mx-auto">
          From a couple of geography buffs, we present you: Geoquizzer!
        </p>
        <br></br>
        <p className="max-w-xl mx-auto">
          This game is an opportunity to challenge your friends on country
          population knowledge. Even if you don't know the answer exactly, your
          score will reflect how close you are to the answer, rewarding those
          who have a strong understanding of regional population densities
          around the world.
        </p>
        <br></br>
        <p className="max-w-xl mx-auto text-center">Good Luck!</p>
      </div>
      {/* <h3 className="text-2xl text-center pt-4">Created By</h3> */}
      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        <div className="p-8 bg-white shadow mt-24 rounded mx-auto">
          <div className="grid grid-cols-3 h-0">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="rounded-full"
                  src={henryPic}
                  alt="Profile pic"
                />
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
          </div>

          <div className="mt-24 pt-6 text-center  pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              Henry Weigand
            </h1>
            <p className="font-light text-gray-500 mt-3">
              San Francisco, Californa
            </p>

            <p className="mt-8 text-lg text-gray-600">Full Stack Developer</p>
            <p className="mt-2 text-gray-600">University of Washington</p>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <a
              className="text-white text-center py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              href="https://henryweigand.com/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
            <a
              className="text-white text-center py-2 px-4 uppercase rounded bg-slate-600 hover:bg-slate-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              href="https://github.com/hcweigand10"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="p-8 bg-white shadow mt-24 rounded mx-auto">
        <div className="grid grid-cols-3 h-0">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  className="rounded-full"
                  src={takaraPic}
                  alt="Profile pic"
                />
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center"></div>
          </div>

          <div className="mt-24 pt-6 text-center  pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              Takara Truong
            </h1>
            <p className="font-light text-gray-500 mt-3">Seattle, Washington</p>

            <p className="mt-8 text-lg text-gray-600">Full Stack Developer</p>
            <p className="mt-2 text-gray-600">University of Washington</p>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <a
              className="text-white text-center py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              href="http://takaraktruong.com/"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
            <a
              className="text-white text-center py-2 px-4 uppercase rounded bg-slate-600 hover:bg-slate-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              href="https://github.com/truont2"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
