import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazyLoadRoutes } from "./LazyLoadRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: lazyLoadRoutes('Home'),
  },
  {
    path: "/todoManager",
    element: lazyLoadRoutes('TodoManager'),
  },
  {
    path: "/contactsManager",
    element: lazyLoadRoutes('ContactsManager'),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
