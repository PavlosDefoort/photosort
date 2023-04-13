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
      <div>
        <HomePage />
      </div>
    </main>
  );
}
