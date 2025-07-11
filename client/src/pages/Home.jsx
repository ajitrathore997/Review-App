import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>Welcome, {user?.username}</h1>
      <button className="p-2 border rounded-lg" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default Home;
