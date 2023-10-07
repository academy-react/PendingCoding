import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LayoutPage } from "../../landing/layout";
import { LandingPage } from "../../landing/landing";

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
        element: null,
      },
      {
        path: "/blogs",
        element: null,
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