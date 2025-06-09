import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  author: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${id}`}
      className=" flex flex-col m-2 lg:max-w-lg cursor-pointer md:max-w-sm w-full justify-center content-center border-t-0 border-l-0 border-r-0  border-b border p-4 border-slate-200"
    >
      <div className="flex">
        <div className="content-center">
          <Avatar name={"SAI"} />
        </div>
        <div className="ml-1">{author}</div>
      </div>
      <div className="font-bold">{title}</div>
      <div className="text-sm font-semi-bold text-grey-400">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}{" "}
      </div>
      <div className="text-xs font-light pt-3">{publishedDate}</div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-sm text-gray-500 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
