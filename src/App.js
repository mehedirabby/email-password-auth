import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LoginBootstrap from "./Components/LoginBootstrap";

import RegisterReactBootstrap from "./Components/RegisterReactBootstrap";
import Main from "./Layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main>0</Main>,
    children: [
      {
        path: "/",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/register",
        element: <RegisterReactBootstrap></RegisterReactBootstrap>,
      },
      {
        path: "/login",
        element: <LoginBootstrap></LoginBootstrap>,
      },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
