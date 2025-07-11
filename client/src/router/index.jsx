import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import CompanyList from "../pages/CompanyList";
import AddCompanyForm from "../pages/AddCompanyForm";
import CompanyDetails from "../pages/CompanyDetails";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CompanyList />,
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
