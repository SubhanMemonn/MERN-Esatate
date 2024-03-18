import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import { Toaster } from "react-hot-toast";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

export default function App() {
  const { currentUser } = useSelector((store) => store.user);
  return (
    <BrowserRouter>
      <main className="min-h-screen ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signIn"
            element={currentUser ? <Navigate to={"/"} /> : <SignIn />}
          />
          <Route
            path="/signUp"
            element={currentUser ? <Navigate to={"/"} /> : <SignUp />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </main>
    </BrowserRouter>
  );
}
