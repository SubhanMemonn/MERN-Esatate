import { Button, Spinner } from "flowbite-react";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetListing from "../hooks/useGetListing";
import { useState } from "react";
import toast from "react-hot-toast";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { listing, loading } = useGetListing(listingId);
  const { currentUser } = useSelector((state) => state.user);
  {
    copied && toast.success("Link copied!");
  }
  console.log(Object.keys(listing).length);
  return (
    <main>
      {loading && listing.length === 0 && (
        <p className=" h-screen flex justify-center items-center">
          <Spinner size={"xl"} />
        </p>
      )}
      {!loading && listing && (
        <div>
          <Swiper navigation>
            {listing.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="bg-slate-100 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer fixed right-[3%] top-[13%] z-10 border hover:opacity-80"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <FaShare className=" text-slate-700 text-xl" />
          </div>
          <div className="max-w-4xl mx-auto p-3 flex flex-col gap-4">
            <h1 className=" font-semibold text-xl my-6">
              {listing.name} - Rs.
              {listing.regularPrice}
              {listing.type === "rent" && "/month"}
            </h1>
            <span className="flex items-center gap-2 text-gray-500">
              <span className=" text-green-500">
                <FaMapMarkerAlt />
              </span>
              {listing.address}
            </span>
            <div className=" flex gap-2">
              <Button color={"red"}>{listing.type}</Button>
              <Button color={"green"}>Rs.{listing.discountPrice} off</Button>
            </div>
            <p className=" text-gray-500">
              <span className=" font-semibold text-black dark:text-gray-100">
                Description:{" "}
              </span>
              {listing.description}
            </p>
            <div className=" flex flex-wrap gap-4 !text-green-500">
              <div className=" flex gap-2 items-center whitespace-nowrap">
                <span>
                  <FaBath className="text-lg" />
                </span>
                <span>
                  {" "}
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </span>
              </div>
              <div className=" flex gap-2 items-center whitespace-nowrap">
                <span>
                  <FaBed className="text-lg" />
                </span>
                <span>
                  {" "}
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </span>
              </div>
              <div className=" flex gap-2 items-center whitespace-nowrap">
                <span>
                  <FaChair className="text-lg" />
                </span>
                <span> {listing.furnished ? "Furnished" : "Unfurnished"}</span>
              </div>
              <div className=" flex gap-2 items-center whitespace-nowrap">
                <span>
                  <FaParking className="text-lg" />
                </span>
                <span> {listing.parking ? "Parking spot" : "No Parking"}</span>
              </div>
            </div>
            {currentUser && !contact && currentUser._id !== listing.userRef && (
              <Button
                color={"dark"}
                onClick={() => setContact(true)}
                className="w-full uppercase"
              >
                Contact Landlord
              </Button>
            )}
            {contact && <Contact userListing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
