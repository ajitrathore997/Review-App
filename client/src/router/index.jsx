import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import CompanyList from "../pages/CompanyList";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-company",
    element: <AddCompanyForm />,
  },
  {
    path: "/company/:id",
    element: <CompanyDetails />,
  },

  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute>
  //       <Home />
  //     </ProtectedRoute>
  //   ),
  // },
  { path: "*", element: <Navigate to="/" replace /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
