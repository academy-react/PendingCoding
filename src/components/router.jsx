import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "../landing";
import { Heroic } from "../landing/heroic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/",
        element: <Heroic />,
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
