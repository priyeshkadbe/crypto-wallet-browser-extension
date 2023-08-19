"use client";
import Image from "next/image";
import { useState } from "react";

import Buy from "@/../public/icons/buy.svg";
import Send from "@/../public/icons/send.svg";
import Swap from "@/../public/icons/swap.svg";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <div className="p-2 m-2 bg-[#807DC0] rounded-full cursor-text">
        <h1>0x34....5</h1>
      </div>
      <div className="m-2">
        <h1 className="text-3xl">4 ETH</h1>
      </div>
      <div>
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col justify-center items-center p-2 ">
            <Image src={Buy} alt="logo" />
            <p>Buy</p>
          </div>
          <div className="flex flex-col justify-center items-center p-2 ">
            <Image src={Send} alt="logo" />
            <p>Send</p>
          </div>
          <button className="flex flex-col justify-center items-center p-2 ">
            <Image src={Swap} alt="logo" />
            <p>Swap</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
