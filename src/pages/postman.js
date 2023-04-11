import Image from "next/image";
import { Fascinate, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";
import LinearProgress from "./progressbar";
import MultipleSelectCheckmarks from "./multiple";
import Selector from "./selector";
import MultipleCheckTemplate from "./MultiSelect";

import GridGallery from "./offthegrid";
import { Disclosure } from "@headlessui/react";

function HomePage() {
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
  const [nsfw, setNsfw] = useState(false);
  const daKey = process.env.customKey;
  const [lastTry, setLastTry] = useState(null);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", process.env.auth);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Cookie",
      "csv=2; edgebucket=GNBcA2zVmNgEdkIhDc; loid=0000000000adnpt678.2.1613408283000.Z0FBQUFBQmtOR20tQTVuS0NJaUFpWlV5LUtqZDdwSXU0QkNKU3Rialp0NlR5RUdpRGZoNVZXbzJGN2hBZzhyRkpramxISjRIYlM0VTIwYXM2QVlkV2g3cllfXzFZTHFSTXdyOWFLcUY0WjBCLU9kcWhnOEZOSnFJUXhaa3dnXzQxRlZnTFRKb2oyS1Q"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", process.env.userName);
    urlencoded.append("password", process.env.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    if (typeof lastTry != "string") {
      fetch("https://www.reddit.com/api/v1/access_token", requestOptions)
        .then((response) => response.json())
        .then((result) => setLastTry(result.access_token))
        .catch((error) => console.log("error", error));
    }
  }, []);

  useEffect(() => {
    if (posts.length >= max || count == 10) {
      setDisplay(true);

      return;
    }
    var myHeaders = new Headers();

    myHeaders.append("User-Agent", "ChangeMeClient/0.1 by YourUsername");
    myHeaders.append("Authorization", "bearer " + lastTry);
    myHeaders.append(
      "Cookie",
      "csv=2; edgebucket=vu8Zr0Azm9tXfQWpq1; loid=0000000000adnpt678.2.1613408283000.Z0FBQUFBQmtNS3RDNDRiX1Nqc2xjeldFMW5fUFh1bGJRTHl4VlY5YmFfd1FneE14SWNMdllEQURObWRtWVdaZE1CSDU0UDZ6YWpraE8tSVJNVDhiMDRHcGlycDNtdXkzajhjZ0xyTjBNMUI1bC1JTEN5RlFxQk5lQnhCLTBhVjA1MGtvQVB1OTN4NUs; session_tracker=mpbbfqingcejjaeghe.0.1680911266642.Z0FBQUFBQmtNS3VqNnMyZUpNNE9VODBoUEhNZXc3MGZzTFJGVWRRMTBHTUUwdGdJQjBOSnRsLVVsaUZxTjcybmM4R3Jvd3cwbUEwODd4aUIwUWxOY0dzTkY5aWhVdDFHcFNPY2RSZ3pfQlBsaEhYWmk5UkZFbVpUMWVZTXdKblJrVzlOakEwUTZYdVE"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url =
      "https://oauth.reddit.com/r/" +
      subreddit +
      "/" +
      search +
      "?limit=100&t=" +
      time;

    if (after) {
      url += "&after=" + after;
    }

    fetch(url, requestOptions)
      .then((response) => response.json()) // parse response as JSON
      .then((result) => {
        if (result != null) {
          const filteredArticles = result.data.children.filter((post) => {
            // Replace "property" with the name of the property you want to filter by
            const searchArray = keyword.split(",");
            const hasNSFW = post.data.over_18.toString() == nsfw;

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LinearProgress score={(posts.length / max) * 100} />
      <h1> Images found: {posts.length}</h1>
      <h2>Quota: {count}</h2>
      <h2>Images to generate: {max}</h2>

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
      <Button onClick={handleButtonClick}>Reset</Button>
      <Button onClick={handleButtonSet}>Start Search!</Button>
      <Button onClick={handleChangeSub}>Change SubReddit!</Button>
      <header className="App-header">
        <div style={{ padding: "1rem" }}>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="r/"
            value={subreddit}
            onChange={(e) => {
              setPosts([]);
              setSubreddit(e.target.value.trim());
              setCount(0);
              setSub(false);
            }}
          />
        </div>
        <div>
          {isSubreddit == true ? (
            <div>
              <MultipleSelectCheckmarks
                props={subreddit}
                onSelectChange={handleSelectChange}
              />
              <div style={{ padding: "1rem" }}>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="How popular is it?!"
                  value={upvotes}
                  onChange={(e) => {
                    setUpvotes(e.target.value);
                  }}
                ></input>
              </div>
              <MultipleCheckTemplate
                options={["image", "video", "rich:video", "hosted:video"]}
                onSelectChange={handleMediaChange}
                name={"Media Type"}
              />

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
                topics={["true", "false"]}
                onSelectChange={handleNSFWChange}
                name={"NSFW"}
              />
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
