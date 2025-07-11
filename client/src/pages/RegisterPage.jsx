import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    const user = await registerUser(data);
    if (user) {
      reset();
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-sm w-full">
        <input
          type="text"
          placeholder="User Name"
          required
          {...register("username", { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          {...register("password", { required: true })}
        />
        <button type="submit">Submit</button>
        <button onClick={() => navigate("/login")}>
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
