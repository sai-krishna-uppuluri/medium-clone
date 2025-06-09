import type { EachBlog } from "../hooks";
import { Avatar } from "./BlogCard";

export const BlogIdPage = ({ blog }: { blog: EachBlog }) => {
  return (
    <div className="bg-white px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mx-auto gap-8">
        {/* Blog Content */}
        <div className="flex-1 md:pr-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 break-words">
            {blog.title}
          </h1>
          <div className="text-gray-500 mb-6 text-base sm:text-lg">
            Posted on March
          </div>
          <div className="text-base sm:text-lg text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>
        {/* Author Sidebar */}
        <aside className="w-full md:w-1/4 mt-10 md:mt-0 flex flex-col items-start">
          <div className="text-gray-700 text-base sm:text-lg mb-2">Author</div>
          <div className="flex items-center mb-2">
            <Avatar name={blog.author?.name || "A"} />
            <div className="ml-3">
              <div className="font-bold text-lg sm:text-xl">
                {blog.author?.name || "Unknown"}
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            {/* You can add more author info here if available */}
            Master of mirth, purveyor of puns, and the funniest person in the
            kingdom.
          </div>
        </aside>
      </div>
    </div>
  );
};
