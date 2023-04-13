import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";
import Example from "./home";
import HomePage from "./postman";
import Layout from "./layout";

import MultipleSelectCheckmarks from "./multiple";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      {/*  
      <img
        src="https://styles.redditmedia.com/t5_3en0m/styles/mobileBannerImage_lvscrkszwcqa1.png"
        className="vw-100 h-40 object-cover"
      ></img>*/}
      <div>
        <HomePage />
      </div>
    </main>
  );
}
