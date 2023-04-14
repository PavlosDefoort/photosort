import React, { useEffect, useState } from "react";
import Head from "next/head";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function HomeComing({ props }) {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(0);

  const getFiles = async () => {
    const res = await fetch("/api/files");
    const files = await res.json();

    setFiles(props);
  };

  useEffect(() => {
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const downloadResourcesOnClick = async () => {
    setLoading(true);

    console.log(files);

    try {
      const zip = new JSZip();
      const remoteZips = files.map(async (file) => {
        if (
          file.data.url.includes("png") ||
          file.data.url.includes("jpg") ||
          file.data.url.includes("jpeg")
        ) {
          try {
            const response = await fetch(file.data.url);
            const data = await response.blob();
            zip.file(`${file.data.title}.jpeg`, data);
            console.log("here");
            return data;
          } catch (error) {
            console.error(`Error fetching ${file.data.url}: ${error}`);
            return null;
          }
        }
      });

      Promise.all(remoteZips.filter((data) => data !== null))
        .then(() => {
          zip.generateAsync({ type: "blob" }).then((content) => {
            // give the zip file a name
            saveAs(content, "zip-download-next-js.zip");
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error generating zip file: ${error}`);
          setLoading(false);
        });

      setLoading(false);
    } catch (error) {
      console.error(`Error fetching remote files: ${error}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="flex   items-center justify-between">
        <h1 className="text-sm text-gray-400 dark:text-gray-100">
          Note: Due to CORS Policy a lot of images may not be included in the
          ZIP
        </h1>
        <div className="pl-1">
          <button
            onClick={downloadResourcesOnClick}
            disabled={loading}
            className="text-white bg-gradient-to-br from-blue-400 to-orange-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Download Gallery as ZIP
          </button>
        </div>
      </main>
    </div>
  );
}
