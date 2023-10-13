import { ChevronLeft, Home } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const NavigatorTracor = () => {
  const pathnames = useMemo(() => window.location.pathname.split("/"), []);
  const pathname = window.location.pathname;
  let routes = useMemo(() => [], []);

  useMemo(() => {
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
  }, [pathnames, routes]);

  return (
    <div className="flex justify-center items-center gap-x-2 text-gray-500">
      <Link to="/" className="hover:text-gray-600 transition">
        <Home className="h-5 w-5" />
      </Link>
      <ChevronLeft className="h-5 w-5" />
      {routes?.map((route) => (
        <div key={route.id}>
          {pathname === route.to ? (
            <h1 className="text-gray-700 text-lg">{route.label}</h1>
          ) : (
            <Link
              className="hover:text-gray-600 transition text-lg"
              to={route.to}
            >
              {route.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavigatorTracor;
