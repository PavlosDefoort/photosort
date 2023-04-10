import React, { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";

function GridGalleryCard({ post, show }) {
  return (
    <div
      className={`relative transition ease-in duration-300 transform ${
        show ? "" : "translate-y-16 opacity-0"
      }`}
    >
      <a
        href={"https://reddit.com" + post.data.permalink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="absolute inset-0 z-10 flex transition duration-200 ease-in hover:opacity-0">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="mx-auto text-white z-10 self-center uppercase text-center">
            {post.data.title}
          </div>
        </div>
        {post.data.is_video ? (
          <div>
            {post.data.preview.reddit_video_preview?.fallback_url && (
              <video
                controls
                autoPlay
                muted
                name
                src={post.data.preview.reddit_video_preview.fallback_url}
                onError={handleVideoError}
                allowFullScreen
              ></video>
            )}
          </div>
        ) : (
          <img
            src={post.data.url}
            alt="Description of the image"
            onError={(e) => {
              e.target.src = post.data.thumbnail;
            }}
            // Set imageLoaded to true when the image loads successfully
            className="object-cover h-full w-full"
          />
        )}
      </a>
    </div>
  );
}
export default function GridGallery({ gallery }) {
  const [imagesShownArray, setImagesShownArray] = useState(
    gallery ? Array(gallery.length).fill(false) : []
  );
  const imageVisibleChange = (index, isVisible) => {
    if (isVisible) {
      setImagesShownArray((currentImagesShownArray) => {
        currentImagesShownArray[index] = true;
        return [...currentImagesShownArray];
      });
    }
  };
  const [videoError, setVideoError] = useState(false);
  const [size, setSize] = useState("1");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key === "1") {
      setSize("grid grid-cols-1 gap 2");
    } else if (event.key === "2") {
      setSize("grid grid-cols-2 gap 2");
    } else if (event.key === "3") {
      setSize("grid grid-cols-3 gap 2");
    } else if (event.key === "4") {
      setSize("grid grid-cols-4 gap 2");
    } else if (event.key === "5") {
      setSize("grid grid-cols-5 gap 2");
    } else if (event.key === "6") {
      setSize("grid grid-cols-6 gap 2");
    } else if (event.key === "7") {
      setSize("grid grid-cols-7 gap 2");
    } else if (event.key === "8") {
      setSize("grid grid-cols-8 gap 2");
    } else if (event.key === "9") {
      setSize("grid grid-cols-9 gap 2");
    } else {
    }
  }

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Handle the error

  return (
    <div>
      <div className={size}>
        {gallery &&
          gallery.map((post, index) => {
            return (
              <VisibilitySensor
                partialVisibility={true}
                key={index}
                onChange={(isVisible) => imageVisibleChange(index, isVisible)}
                offset={{ bottom: 80 }}
              >
                <div>
                  <GridGalleryCard post={post} show={imagesShownArray[index]} />
                </div>
              </VisibilitySensor>
            );
          })}
      </div>
    </div>
  );
}
