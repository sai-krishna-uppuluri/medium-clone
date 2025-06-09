import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blog = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div> loading ... </div>;
  }
  console.log(blogs);

  return (
    <div>
      <Appbar />
      <div className="flex flex-col w-full justify-center items-center content-center">
        {blogs.map((eachBlog) => (
          <BlogCard
            id={eachBlog.id}
            title={eachBlog.title}
            content={eachBlog.content}
            publishedDate={"March"}
            author={eachBlog.author?.name || "Sai krishna"}
          />
        ))}
      </div>
    </div>
  );
};
