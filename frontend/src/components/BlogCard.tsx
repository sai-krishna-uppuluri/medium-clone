interface BlogCardProps {
  Author: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  Author,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="flex flex-col justify-center content-center border-t-0 border-l-0 border-r-0  border-b border p-4 border-slate-200">
      <div className="flex">
        <div className="content-center">
          <Avatar name={"SAI"} />
        </div>
        <div className="ml-1">{Author}</div>
      </div>
      <div className="font-bold">{title}</div>
      <div className="text-sm font-semi-bold text-grey-400"> {content} </div>
      <div className="text-xs font-light pt-3">{publishedDate}</div>
    </div>
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
