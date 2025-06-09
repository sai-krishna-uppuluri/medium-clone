// import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogIdPage } from "../components/BlogIdPage";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const BlogId = () => {
  const { id } = useParams();
  console.log("id", id);
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Appbar />
      <BlogIdPage blog={blog} />
    </div>
  );
};
