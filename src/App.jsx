import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { LazyLoadRoutes } from "./LazyLoadRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyLoadRoutes componentName="Home"/>,
  },
  {
    path: "/todoManager",
    element: <LazyLoadRoutes componentName="TodoManager" reducers={['todo']} sagas={['todo']} />,
  },
  {
    path: "/contactsManager",
    element: <LazyLoadRoutes componentName="ContactsManager" reducers={['contact']} sagas={['contact']} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
