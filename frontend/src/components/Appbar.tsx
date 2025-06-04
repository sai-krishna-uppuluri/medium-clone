import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex justify-between px-8 border-b border-slate-200 py-2">
      <div>Medium</div>
      <Avatar name="Sai" />
    </div>
  );
};
