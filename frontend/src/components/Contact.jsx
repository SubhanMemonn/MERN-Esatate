import { Button, Textarea } from "flowbite-react";
import useGetUser from "../hooks/useGetUser";
import { useState } from "react";
import { Link } from "react-router-dom";
const Contact = ({ userListing }) => {
  const { user, loading } = useGetUser(userListing?.userRef);
  const [message, setMessage] = useState("");
  return (
    <>
      {user && (
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-sm">
            Contact with{" "}
            <span className=" font-semibold">
              {user.username}{" "}
              <span className=" font-semibold">
                for {userListing?.name.toLowerCase()}
              </span>
            </span>
          </p>
          <Textarea
            placeholder="Send your messages....."
            rows={"4"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Link
            to={`mailto:${user.email}?subject=Regarding ${userListing?.name}&body=${message}`}
          >
            <Button className=" w-full" color={"dark"}>
              Send Message
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
