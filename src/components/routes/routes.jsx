import { LayoutPage } from "../../landing/layout";
import { LandingPage } from "../../landing/landing";
import { Courses } from "../../courses/courses";
import { CourseInfo } from "../../courses/[courseId]/course-info";
import { Teachers } from "../../teachers/teachers";
import { TeacherInfo } from "../../teachers/[teacherId]/teacher-info";
import { Blogs } from "../../blogs/blogs";
import { BlogInfo } from "../../blogs/[blogId]/blog-info";
import { Dashboard } from "../../dashboard/dashboard";
import { Home } from "../../dashboard/home/home";
// import { Holder } from "../../Lgin&Register/holder";
import { MyCourses } from "../../dashboard/my-courses/my-courses";
import { Favorites } from "../../dashboard/favorites/favorites";
import { EditProfile } from "../../dashboard/edit/edit-profile";

const routes = [
  {
    id: "home",
    path: "/",
    label: "خانه",
  },
  {
    id: "courses",
    path: "/courses",
    label: "دوره‌ها",
  },
  {
    id: "blogs",
    path: "/blogs",
    label: "بلاگ‌",
  },
  {
    id: "teachers",
    path: "/teachers",
    label: "اساتید",
  },
  {
    id: "about",
    path: "/about",
    label: "درباره ما",
  },
  {
    id: "contact",
    path: "contact-us",
    label: "ارتباط با ما",
  },
];

const routers = [
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
        element: <Teachers />,
      },
      {
        path: "/teachers/:id",
        element: <TeacherInfo />,
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
        element: null,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "/dashboard/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/dashboard/favorites",
        element: <Favorites />,
      },
      {
        path: "/dashboard/edit-profile",
        element: <EditProfile />,
      },
    ],
  },
  {
    path: "*",
    element: null,
  },
];

export { routes, routers };
