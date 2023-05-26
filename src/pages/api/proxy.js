import axios from "axios";

export default async (req, res) => {
  const { url } = req.query;

  const response = await axios.get(url, { responseType: "arraybuffer" });
  res.writeHead(200, {
    "Content-Type": response.headers["content-type"],
    "Content-Length": response.headers["content-length"],
  });
  res.end(response.data);
};
