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
    <div>
      <div>{Author}</div>
      <div>{title}</div>
      <div>{content}</div>
      <div>{publishedDate}</div>
    </div>
  );
};
