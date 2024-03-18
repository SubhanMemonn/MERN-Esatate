import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { TextInput } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import useSignIn from "../hooks/useSignIn";
const SignIn = () => {
  const { loading, signIn: signed } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Cannot send ");
    await signed({ email, password });
  };
  return (
    <div className=" h-screen flex items-center ">
      <Card className="max-w-2xl mx-auto w-full dark:text-gray-200 dark:bg-[rgb(16,23,42)] bg-white ">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <h1 className="dark:text-white text-gray-800 font-bold text-2xl sm:text-4xl">
            Sign In
          </h1>
        </CardHeader>
        <form onSubmit={submitHandle} className="flex flex-col gap-2 px-6 my-4">
          <label>Email</label>
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email..."
            type="email"
            className="mb-2"
            required
          />
          <label>Password</label>
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password.."
            type="password"
            required
            className="mb-2"
          />
          <div className="w-full flex flex-col gap-2 mt-2">
            <Button
              fullWidth
              type="submit"
              className="dark:bg-[#08080a] flex justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sign In"}
            </Button>
            <OAuth />
          </div>
        </form>
        <CardFooter className="pt-0">
          <Link
            to={"/signUp"}
            className="mt-6 flex justify-center items-center"
          >
            Don&apos;t have an account?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
