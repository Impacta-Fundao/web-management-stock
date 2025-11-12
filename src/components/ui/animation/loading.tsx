"use client";

import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

import animationData from "./loading.json";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-white z-10">
        <Player className="" src={animationData} loop speed={0.6} autoplay />
      </div>
    </>
  );
};

export default Loading;
