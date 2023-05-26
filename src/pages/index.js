import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";
import Example from "./home";
import HomePage from "./postman";

import { Info } from "@mui/icons-material";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Example />
      <div>
        <div>
          <HomePage />
        </div>
      </div>
    </main>
  );
}
