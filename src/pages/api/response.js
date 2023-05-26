export default async function handler(req, res) {
  const { url } = req.query; // retrieve the "url" query parameter from the request

  const options = {
    headers: {
      Origin: "http://localhost:3000",
    },
  };

  const response = await fetch(url, options); // use the "url" parameter in the fetch call
  const data = await response.json();

  res.status(200).json(data);
}
