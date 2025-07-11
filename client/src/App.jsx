import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router";
import { Toaster } from "sonner";

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors />
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
