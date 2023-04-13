import Image from "next/image";
import { Fascinate, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";
import LinearProgress from "./progressbar";
import MultipleSelectCheckmarks from "./multiple";
import Selector from "./selector";
import MultipleCheckTemplate from "./MultiSelect";

import GridGallery from "./offthegrid";
import { Disclosure } from "@headlessui/react";
import Layout from "./layout";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState("after");
  const [count, setCount] = useState(0);
  const [subreddit, setSubreddit] = useState("");
  const [tag, setTag] = useState([]);
  const [keyword, setKeyWord] = useState("");
  const [upvotes, setUpvotes] = useState(0);
  const [media, setMedia] = useState([]);
  const [max, setMax] = useState(1);
  const [display, setDisplay] = useState(false);
  const [working, setWork] = useState(false);
  const [isSubreddit, setSub] = useState(false);
  const [search, setSearch] = useState("new");
  const [time, setTime] = useState("all");
  const [isTime, setIsTime] = useState(false);
  const [nsfw, setNsfw] = useState("Both");

  useEffect(() => {
    if (posts.length >= max || count == 10) {
      setDisplay(true);

      return;
    }

    let url =
      "https://www.reddit.com/r/" +
      subreddit +
      "/" +
      search +
      ".json?limit=100&t=" +
      time;

    if (after) {
      url += "&after=" + after;
    }
    console.log(url);
    fetch(url)
      .then((response) => response.json()) // parse response as JSON
      .then((result) => {
        if (result != null) {
          const filteredArticles = result.data.children.filter((post) => {
            // Replace "property" with the name of the property you want to filter by
            const searchArray = keyword.split(",");
            let hasNSFW = null;
            let tempNSFW = null;
            console.log(nsfw);
            if (nsfw == "Both") {
              hasNSFW = true;
            } else if (nsfw == "NSFW") {
              tempNSFW = true;
              hasNSFW = post.data.over_18 == tempNSFW;
            } else {
              tempNSFW = false;
              hasNSFW = post.data.over_18 == tempNSFW;
            }

            // if nsfw == nsfw, then show only nsfw posts
            // if nsfw == false, then show only non-nsfw posts
            // if nsfw == both, then show both

            if (tag.length > 0) {
              return (
                tag.includes(post.data.link_flair_text) &&
                searchArray.some((word) => post.data.title.includes(word)) &&
                hasNSFW &&
                post.data.ups >= upvotes
              );
            } else {
              return (
                searchArray.some((word) => post.data.title.includes(word)) &&
                hasNSFW &&
                post.data.ups >= upvotes
              );
            }
          });

          const newArticles = filteredArticles.filter((article) => {
            // Check if an article with the same id already exists in the articles array
            return !posts.some((a) => a.data.id === article.data.id);
          });

          setPosts((prevArticles) => [
            ...prevArticles,
            ...newArticles.slice(0, max - prevArticles.length), // limit the number of articles to the remaining slots
          ]);
          setCount(count + 1);
          setAfter(result.data.after);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setPosts([]);
      });
  }, [after]);
  function valuetext(value) {
    return `${value}°C`;
  }

  const handleButtonClick = () => {
    setWork(false);
    setPosts([]);
    setSubreddit("");
    setSub(false);
    setCount(0);
    setDisplay(false);
  };

  const handleButtonSet = () => {
    setWork(true);
    setPosts([]);
    setAfter("");
    setCount(0);
    setDisplay(false);
  };
  const handleChangeSub = () => {
    setSub(true);
  };

  const handleSelectChange = (selectedValues) => {
    // do something with selectedValues
    setTag(selectedValues);
    setPosts([]);
    setCount(0);
  };

  const handleCriteriaChange = (selectedValues) => {
    setSearch(selectedValues);
  };

  const handleTimeChange = (selectedValues) => {
    setTime(selectedValues);
  };

  const handleNSFWChange = (selectedValues) => {
    setNsfw(selectedValues);
  };

  const handleMediaChange = (selectedValues) => {
    setMedia(selectedValues);
  };
  useEffect(() => {
    if (subreddit.length == 0) {
      setSub(false);
    } else {
      const delayDebounceFn = setTimeout(() => {
        setSub(true);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [subreddit]);

  return (
    <main>
      <div>{isSubreddit == true ? <Layout data={subreddit} /> : ""}</div>

      <div className="flex  flex-col items-center justify-between p-10">
        <div style={{ padding: "1rem" }} className="flex">
          <input
            type="text"
            class="w-full h-40 px-3 py-2 text-gray-700 border rounded-lg focus:outline-full focus:shadow-outline resize-none font-medium text-4xl sm:text-6xl"
            placeholder="r/"
            value={subreddit ? `r/${subreddit}` : ""}
            onChange={(e) => {
              setPosts([]);
              setSubreddit(e.target.value.replace("r/", "").trim(""));
              setCount(0);
              setSub(false);
            }}
          />
        </div>
      </div>

      <header className="">
        <div>
          {isSubreddit == true ? (
            <div>
              <div className="flex items-center justify-center">
                <h1 className="pr-8">Max Images:</h1>

                <Box sx={{ width: 300 }}>
                  <Slider
                    aria-label="Temperature"
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={100}
                    onChange={(e) => {
                      setMax(e.target.value);
                    }}
                  />
                </Box>
              </div>
              <div className="flex items-center justify-center">
                <MultipleSelectCheckmarks
                  props={subreddit}
                  onSelectChange={handleSelectChange}
                />
                <div style={{ padding: "1rem" }}>
                  <input
                    type="text"
                    className="w-70 p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter some keywords [separated by commas]"
                    value={keyword}
                    onChange={(e) => {
                      setKeyWord(e.target.value);
                    }}
                  />
                </div>

                <div style={{ padding: "1rem" }}>
                  <input
                    type="text"
                    className="w-30 p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How popular is it?!"
                    value={upvotes}
                    onChange={(e) => {
                      setUpvotes(e.target.value);
                    }}
                  ></input>
                </div>

                <Selector
                  topics={["top", "controversial", "new", "hot", "rising"]}
                  onSelectChange={handleCriteriaChange}
                  name={"Sort"}
                />

                {search == "top" || search == "controversial" ? (
                  <div style={{ padding: "1rem" }}>
                    <Selector
                      topics={["all", "year", "month", "week", "day", "hour"]}
                      onSelectChange={handleTimeChange}
                      name={"Time"}
                    />
                  </div>
                ) : (
                  ""
                )}
                <Selector
                  topics={["NSFW", "SFW", "Both"]}
                  onSelectChange={handleNSFWChange}
                  name={"NSFW"}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleButtonSet}
                  type="button"
                  class="text-white bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Start Search!
                </button>
              </div>
              <div className="text-sm text-gray-400 dark:text-gray-100 pt-3 pl-4">
                <h1> Images found: {posts.length}</h1>
                <h2>Quota: {count}/10</h2>
                <h2>Images to generate: {max}</h2>
              </div>
              <LinearProgress score={(posts.length / max) * 100} />
            </div>
          ) : (
            ""
          )}
        </div>
      </header>

      <div className="articles">
        {display == true ? (
          <GridGallery gallery={posts} onSelectChange={handleSelectChange} />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}

export default HomePage;
