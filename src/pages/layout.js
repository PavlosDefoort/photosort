import Selector from "./selector.js";
import IndeterminateCheckbox from "./flairs.js";
import { useState, useEffect } from "react";

export default function Layout({ data }) {
  const [content, setContent] = useState(null);
  const [subUrl, setUrl] = useState("r/OnePiece");
  const [subIcon, setIcon] = useState(
    "https://a.thumbs.redditmedia.com/NxZsg97tAVMZunF-ZeyJZTxoxpCFHOvTQvxKzMhi1X0.png"
  );
  const [subTitle, setTitle] = useState("One Piece");
  const [subSlash, setSlash] = useState("r/OnePiece");
  const [subUsers, setUsers] = useState("690,000");
  const [subPosts, setPosts] = useState("20");
  const [subNSFW, setNSFW] = useState("No");

  // Fetch url when the component mounts and data changes
  useEffect(() => {
    const url = "https://www.reddit.com/r/" + data + "/about.json";

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        // Set url to the result
        setUrl(result.data.url);
        if (result.data.icon_img != "") {
          setIcon(result.data.icon_img);
        } else if (result.data.header_img != null) {
          setIcon(result.data.header_img);
        } else {
          setIcon(result.data.mobile_banner_image);
        }

        setTitle(result.data.title);
        setSlash(result.data.display_name_prefixed);
        setUsers(result.data.subscribers);
        setPosts(result.data.created_utc);
        setNSFW(result.data.over18.toString());
      })
      .catch((error) => console.log("error", error));
  }, [data]);

  return (
    <div>
      <div class="flex justify-center items-center  space-x-6 pt-10">
        <a href={"https://www.reddit.com/" + subUrl} class="inline-block">
          <img
            className=" w-[17rem] h-[17rem] object-cover rounded-full ring-2 ring-gray-400 dark:ring-gray-500"
            src={subIcon}
            alt="Subreddit icon"
          />
        </a>
        <div class="font-medium dark:text-white text-left">
          <div class="text-5xl">{subTitle}</div>
          <div class="text-m text-gray-500 dark:text-gray-100 pl-1">
            {subSlash}
          </div>
          <div class="text-sm text-gray-400 dark:text-gray-100 pt-3 pl-1">
            <h2>Users: {subUsers}</h2>
            <h2>Total Posts: {subPosts}</h2>
            <h2>NSFW: {subNSFW}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
