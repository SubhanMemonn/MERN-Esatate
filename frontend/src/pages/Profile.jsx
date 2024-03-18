import { Avatar, Button, Spinner, TextInput } from "flowbite-react";
import useGetUserListing from "../hooks/useGetUserListing";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useUpdateUser from "../hooks/useUpdateUser";
import useDeleteUser from "../hooks/useDeleteUser";
import useDeleteListing from "../hooks/useDeleteListing";
import useSignOut from "../hooks/useSignOut";
import { Link } from "react-router-dom";
const Profile = () => {
  const { listings, setListings } = useGetUserListing();
  const { currentUser } = useSelector((store) => store.user);
  const { deleteListing, loading: delLis } = useDeleteListing();
  const { loading, updateUser } = useUpdateUser();
  const { deleteUser, loading: delloa } = useDeleteUser();
  const { signOut, loading: sigloa } = useSignOut();
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    password: "",
  });
  const [prev, setPrev] = useState("");
  const [show, setShow] = useState(false);
  // console.log(prev);
  const filePickerRef = useRef();
  const changeImageHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPrev(reader.result);
          setFormData({ ...formData, ["avatar"]: reader.result });
        }
      };
    }
  };
  const changeHandle = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    await updateUser(formData);
  };
  const deleteListingHandle = async (id) => {
    await deleteListing(id);
    setListings((prev) => prev.filter((i) => i._id !== id));
  };
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="mb-8 font-bold text-3xl sm:text-4xl text-center mt-20">
        Profile
      </h1>
      <TextInput
        type="file"
        accept="image/*"
        ref={filePickerRef}
        onChange={changeImageHandler}
        className="hidden"
      />
      <Avatar
        img={prev ? prev : currentUser?.avatar}
        size={"xl"}
        rounded
        className=" cursor-pointer"
        onClick={() => filePickerRef.current.click()}
      />
      <form onSubmit={submitHandle} className="my-4 flex flex-col gap-4">
        <TextInput
          name="username"
          type="text"
          value={formData.username}
          onChange={changeHandle}
        />
        <TextInput
          name="email"
          type="email"
          value={formData.email}
          onChange={changeHandle}
        />
        <TextInput
          name="password"
          type="password"
          value={formData.password}
          onChange={changeHandle}
          placeholder="Enter update password.."
        />
        <div className="my-2 flex flex-col gap-2">
          <Button type="submit" color={"dark"} disabled={loading}>
            {loading ? <Spinner /> : " Update Profile"}
          </Button>
          <Link to={"/create-listing"}>
            <Button type="button" color={"green"} className="!w-full" outline>
              Create Listing
            </Button>
          </Link>
        </div>
      </form>
      <div className="text-red-500 flex justify-between">
        <button
          onClick={() => deleteUser()}
          className="hover:underline cursor-pointer"
          disabled={delloa}
        >
          Delete Account
        </button>
        <button
          onClick={() => signOut()}
          className="hover:underline cursor-pointer "
          disabled={sigloa}
        >
          SignOut
        </button>
      </div>
      {listings.length > 0 && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => setShow(true)}
            className=" text-green-500 my-6 font-semibold hover:underline"
          >
            {!show && "See your listings"}
          </button>
        </div>
      )}
      {show &&
        listings.map((i) => (
          <div
            className="border rounded-lg p-3 flex justify-between items-center gap-4 dark:border-gray-700"
            key={i._id}
          >
            <img
              className="w-12 h-14"
              src={i.imageUrls[0]}
              alt="listing image"
            />
            <Link
              to={`/listing/${i._id}`}
              className="text-slate-700 font-semibold  hover:underline truncate flex-1 dark:text-gray-500"
            >
              {i.name}
            </Link>
            <div className=" flex gap-4">
              <button
                onClick={() => deleteListingHandle(i._id)}
                className="text-red-700 uppercase hover:underline"
                disabled={delLis}
              >
                Delete
              </button>
              <Link to={`/update-listing/${i._id}`}>
                <button className="text-green-700 uppercase hover:underline">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
