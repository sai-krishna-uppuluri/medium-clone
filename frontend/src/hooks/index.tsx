import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface EachBlog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<EachBlog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("response", response);
        setBlog(response.data.getPostById);
      } catch (error) {
        return Response.json(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<EachBlog[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("response", response);

        if (response.data.status !== "success") {
          console.log("response", response);
          alert("You are not authorized to view this page");
          navigate("/signin");
          return;
        }
        return setBlogs(response.data.getAllPosts);
        //console.log("reached Here", response.data);
      } catch (error) {
        alert("Error fetching blogs");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, [navigate]);

  return {
    loading,

    blogs,
  };
};
