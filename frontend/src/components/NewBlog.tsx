import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg p-4 sm:p-8">
      <input
        type="text"
        id="large-input"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <TextEditor onChange={(e) => setContent(e.target.value)} />
      <button
        type="submit"
        onClick={async () => {
          const response = await axios.post(
            `${BACKEND_URL}/api/v1/blog`,
            {
              title,
              content,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          navigate(`/blog/${response.data.id}`);
        }}
        className="inline-flex mt-4 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Publish post
      </button>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <textarea
        id="editor"
        rows={10}
        className="block w-full px-0 mt-4 bg-gray-50 text-sm text-gray-800 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write an article..."
        required
        onChange={onChange}
      ></textarea>
    </div>
  );
}
