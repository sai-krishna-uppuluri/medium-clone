import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface EachBlog {
  content: string;
  title: string;
  id: string;
  Author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<EachBlog[]>([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);

        setBlogs(response.data.getAllPosts);
      } catch (error) {
        return Response.json(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  return {
    loading,

    blogs,
  };
};
