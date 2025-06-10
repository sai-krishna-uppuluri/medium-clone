import { Appbar } from "../components/Appbar";
import { NewBlog } from "../components/NewBlog";

export const Publish = () => {
  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="flex justify-center px-2 sm:px-4 md:px-8 py-6">
        <NewBlog />
      </div>
    </div>
  );
};
