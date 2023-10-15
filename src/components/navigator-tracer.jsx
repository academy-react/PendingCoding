import { ChevronLeft, Home } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const NavigatorTracor = () => {
  const { id } = useParams();
  const pathname = window.location.pathname;
  let routes = useMemo(() => [], []);

  useMemo(() => {
    const pathname = window.location.pathname;
    const pathnames = window.location.pathname.split("/");
    for (let pathname of pathnames) {
      switch (pathname) {
        case "courses":
          routes.push({
            id: "courses",
            label: "دوره‌ها",
            to: "/courses",
          });
          break;
        case "blogs":
          routes.push({
            id: "bolgs",
            label: "بلاگ",
            to: "/blogs",
          });
          break;
        case "teachers":
          routes.push({
            id: "teachers",
            label: "اساتید",
            to: "/teachers",
          });
          break;
        case "about":
          routes.push({
            id: "about",
            label: "درباره ما",
            to: "/about",
          });
          break;
        case "contact":
          routes.push({
            id: "contact",
            label: "ارتباط با ما",
            to: "/contact",
          });
          break;
      }
    }
    if (id)
      switch (pathname) {
        case `/courses/${id}`:
          routes.push({
            id: `/courses/${id}`,
            label: "عنوان دوره",
            to: `/courses/${id}`,
          });
          break;
        case `/blogs/${id}`:
          routes.push({
            id: `/blogs/${id}`,
            label: "بلاگ",
            to: `/blogs/${id}`,
          });
          break;
        case `/teachers/${id}`:
          routes.push({
            id: `/teachers/${id}`,
            label: "اساتید",
            to: `/teachers/${id}`,
          });
          break;
      }
  }, [routes, id]);

  return (
    <div className="flex justify-center items-center gap-x-2 text-gray-500">
      <Link to="/" className="hover:text-gray-600 transition">
        <Home className="h-5 w-5" />
      </Link>
      <ChevronLeft className="h-5 w-5" />
      {routes?.map((route) => (
        <div key={route.id}>
          {pathname === route.to ? (
            <div className="flex items-center justify-center">
              <h1 className="text-gray-700 text-lg">{route.label}</h1>
            </div>
          ) : (
            <Link
              className="hover:text-gray-600 transition text-lg flex items-center justify-center"
              to={route.to}
            >
              {route.label}
              <ChevronLeft className="h-5 w-5" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigatorTracor;
