export const Banner = ({ title }) => {
  return (
    <div className="flex flex-1 items-center justify-start mt-10">
      <div className="relative flex h-16 justify-center items-center">
        <div className="absolute right-0 h-full border-2 border-primary rounded-full ml-10" />
        <h1 className="text-3xl text-gray-700 mr-4">{title}</h1>
      </div>
    </div>
  );
};
