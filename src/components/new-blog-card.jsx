import { Link } from "react-router-dom"
import { LayoutDashboard } from "lucide-react"

export const NewBlogCard = ({id,title,image,isBlog}) => {
  return (
    <div className="py-2">
      <Link to={`/blogs/${id}`} className="flex items-center justify-center gap-x-3 hover:bg-[#e5e5e5] transition px-5 py-2 rounded-xl">
        <img src={image} alt="courseImage" className="w-16 h-16 rounded-full object-cover" />
        <div className="flex flex-col justify-start items-start gap-y-2">
        <h2 className="text-gray-700">
          {title}
        </h2>
        <span className="flex justify-center items-center gap-x-1 text-sm">
          <LayoutDashboard className="text-primary h-4 w-4" />
          {isBlog ? "بلاگ" : "خبر"}
        </span>
        </div>
      </Link>
    </div>
  )
}
