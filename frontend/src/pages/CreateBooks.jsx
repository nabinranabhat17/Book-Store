import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const data = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    setLoading(true);
    axios
      .post("http://localhost:3001/books", data) // Corrected URL
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      {loading ? <Spinner /> : ""}
      <h4 className="text-2xl font-semibold text-gray-800">Add new book</h4>
      <form className="mt-8 mb-2" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            id="title" // Corrected id
            type="text"
            value={title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author
          </label>
          <input
            id="author" // Corrected id
            type="text"
            value={author}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publishYear"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Publish Year
          </label>
          <input
            id="publishYear" // Corrected id
            type="number"
            value={publishYear}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add
        </button>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium underline mt-4 block text-center transition duration-150 ease-in-out"
        >
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default CreateBooks;
