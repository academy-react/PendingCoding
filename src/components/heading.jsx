import { Link } from "react-router-dom";

export const Heading = ({ title, description, to }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <h1 className="text-2xl text-gray-600">{title}</h1>
      <h4 className="text-sm text-gray-400">{description}</h4>
      <Link
        to={to}
        className="text-white text-lg bg-primary hover:bg-primary/90 hover:text-white/90 transition rounded-full px-14 py-2 mt-8"
      >
        مشاهده همه
      </Link>
    </div>
  );
};
