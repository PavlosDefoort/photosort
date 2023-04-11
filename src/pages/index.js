import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";
import Example from "./home";
import HomePage from "./postman";

import MultipleSelectCheckmarks from "./multiple";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Example />
        <HomePage />
      </div>
    </main>
  );
}
