import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LayoutPage } from "../../landing/layout";
import { LandingPage } from "../../landing/landing";
import { Courses } from "../../courses/courses";
import { CourseInfo } from "../../courses/[courseId]/course-info";
import { Blogs } from "../../blogs/blogs";
import { BlogInfo } from "../../blogs/[blogId]/blog-info";
import { Holder } from "../../auth/login/holder";
import { RegHolder } from "../../auth/register/regHolder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,

    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseInfo />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogInfo />,
      },
      {
        path: "/teachers",
        element: null,
      },
      {
        path: "/about",
        element: null,
      },
      {
        path: "contact-us",
        element: null,
      },
      {
        path: "/sign-in",
        element: <Holder/> ,
      },
      {
        path: "/sign-up",
        element: <RegHolder /> ,
      },
    ],
  },
  {
    path: "*",
    element: null,
  },
]);

function RouteProvider() {
  return <RouterProvider router={router} />;
}

export { RouteProvider };