import React from "react";
import axios from "axios";

const DeleteBook = ({ setDeleteOpen, deleteId, onDeleteSuccess }) => {
  const cancelDelete = () => {
    setDeleteOpen(false);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://book-store-backend-6fgb.onrender.com/books/${deleteId}`
      );
      setDeleteOpen(false);
      onDeleteSuccess();
    } catch (error) {
      console.error("Failed to delete book:", error);
      setDeleteOpen(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg z-50">
        <h4 className="text-2xl font-bold text-gray-800 mb-2">
          Confirm Deletion
        </h4>
        <p className="text-gray-600 mt-1 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
