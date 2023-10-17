export const TooTip = ({ name, children }) => {
  return (
    <div
      data-tip={`${name}`}
      className={`relative
        delay-150
        before:content-[attr(data-tip)] 
        before:absolute 
        before:px-3 
        before:py-2 
        before:left-1/2 
        before:top-2
        before:w-max 
        before:max-w-xs 
        before:-translate-x-1/2 
        before:-translate-y-full 
        before:bg-[#818CF8]
        before:text-white 
        before:rounded-md 
        before:opacity-0 
        before:transition-all
        after:absolute 
        after:left-1/2 
        after:top-2 
        after:h-0 
        after:w-0 
        after:-translate-x-1/2 
        after:border-8 
        after:border-t-gray-700 
        after:text-white
        after:border-l-transparent 
        after:border-b-transparent 
        after:border-r-transparent 
        after:opacity-0 
        after:transition-all
        hover:before:opacity-100 
        hover:after:opacity-100
        cursor-pointer
        transition-all
        `}
    >
      {children}
    </div>
  );
};