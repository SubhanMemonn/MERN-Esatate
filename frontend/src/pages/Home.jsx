import useGetListings from "../hooks/useGetListings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const { listings: offerListings } = useGetListings({
    limit: 4,
    offer: true,
  });
  const { listings: saleListings } = useGetListings({
    limit: 4,
    type: "sale",
  });
  const { listings: rentListings } = useGetListings({
    limit: 4,
    type: "rent",
  });
  SwiperCore.use([Navigation]);
  return (
    <div>
      <div className=" px-3 flex flex-col gap-6 max-w-6xl mx-auto py-28">
        <h1 className=" font-bold text-3xl sm:text-5xl lg:text-6xl">
          Find your next <span className="text-gray-500">perfect</span>
          <br />
          place with ease
        </h1>
        <p className=" text-sm text-gray-500 mt-6">
          My Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </p>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((i) => (
            <SwiperSlide key={i._id}>
              <div
                style={{
                  background: `url(${i.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className=" px-3 flex flex-col gap-6 max-w-6xl mx-auto py-28">
        {offerListings && offerListings.length > 0 && (
          <>
            <div>
              <h1 className=" text-2xl sm:text-4xl font-semibold dark:text-gray-400">
                Recent offers
              </h1>
              <Link
                className=" text-sm text-blue-500 hover:underline font-semibold tracking-wider"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListings?.map((i) => (
                <ListingItem listing={i} />
              ))}
            </div>
          </>
        )}
        {rentListings && rentListings.length > 0 && (
          <>
            <div>
              <h1 className=" text-2xl sm:text-4xl font-semibold dark:text-gray-400">
                Recent places for rent
              </h1>
              <Link
                className=" text-sm text-blue-500 hover:underline font-semibold tracking-wider"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {rentListings?.map((i) => (
                <ListingItem listing={i} />
              ))}
            </div>
          </>
        )}
        {offerListings && offerListings.length > 0 && (
          <>
            <div>
              <h1 className=" text-2xl sm:text-4xl font-semibold dark:text-gray-400">
                Recent places for sale
              </h1>
              <Link
                className=" text-sm text-blue-500 hover:underline font-semibold tracking-wider"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListings?.map((i) => (
                <ListingItem listing={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
