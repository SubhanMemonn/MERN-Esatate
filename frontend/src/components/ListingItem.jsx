import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl flex flex-col gap-6 dark:bg-slate-950 transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="px-2">
          <h1 className=" font-semibold mt-5 truncate ">{listing.name}</h1>

          <div className=" flex items-center gap-1 my-2">
            <span className=" text-green-500">
              <MdLocationOn />
            </span>
            <span className="text-gray-500">{listing.address}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {" "}
            {listing.description}
          </p>
          <span className=" text-gray-600">
            Rs.
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice}
            {listing.type === "rent" && " / month"}
          </span>
          <div className="text-sm my-2 flex gap-3 items-center font-semibold ">
            <span>
              {" "}
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </span>
            <span>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
