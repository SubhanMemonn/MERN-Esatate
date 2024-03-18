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
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import useSignUp from "../hooks/useSignUp";
const SignUp = () => {
  const { loading, signUp: signed } = useSignUp();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
    await signed({ username, email, password });
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
            Sign Up
          </h1>
        </CardHeader>
        <form onSubmit={submitHandle} className="flex flex-col gap-2 px-6 my-4">
          <label>Username</label>
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
            type="text"
            className="mb-2"
            required
          />
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
              {loading ? <Spinner /> : "Sign Up"}
            </Button>
            <OAuth />
          </div>
        </form>
        <CardFooter className="pt-0">
          <Link
            to={"/signIn"}
            className="mt-6 flex justify-center items-center"
          >
            Already have an account?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign In
            </Typography>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
