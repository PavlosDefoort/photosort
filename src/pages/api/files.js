export default function handler(req, res) {
  res.status(200).json([
    {
      name: "laptop",
      url: "https://res.cloudinary.com/dbxcernxw/image/upload/v1674379837/Mridul.Tech%20Blog/pexels-laptop_tfnlrg.jpg",
      type: "jpeg",
    },
    {
      name: "python",
      url: "https://res.cloudinary.com/dbxcernxw/image/upload/v1674379837/Mridul.Tech%20Blog/pexels-laptop_tfnlrg.jpg",
      type: "jpeg",
    },
    {
      name: "fun",
      url: "https://res.cloudinary.com/dbxcernxw/image/upload/v1674379837/Mridul.Tech%20Blog/pexels-laptop_tfnlrg.jpg",
      type: "jpeg",
    },
    {
      name: "coding-pdf",
      url: "https://zip-download-next-js.vercel.app/assets/photos-pdf.pdf",
      type: "pdf",
    },
  ]);
}
