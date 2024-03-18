import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetListings from "../hooks/useGetListings";
import ListingItem from "../components/ListingItem";
import { Checkbox, Select, Spinner, TextInput } from "flowbite-react";
const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "desc",
  });
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { listings, loading, showMore } = useGetListings({
    limit: 9,
    page,
    searchTerm: sidebardata.searchTerm,
    parking: sidebardata.parking,
    type: sidebardata.type,
    furnished: sidebardata.furnished,
    sort: sidebardata.sort,
  });
  console.log(page);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "desc",
      });
    }
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.name === "all" ||
      e.target.name === "rent" ||
      e.target.name === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.name });
    }

    if (e.target.name === "searchTerm" || e.target.name === "sort") {
      setSidebardata({ ...sidebardata, [e.target.name]: e.target.value });
    }

    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.name]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
  };
  console.log(listings);
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:min-h-screen p-7 md:border-r-2 border-gray-700 border-b-2">
        <form className=" flex flex-col gap-8">
          <div className=" flex gap-2 items-center">
            <label className=" whitespace-nowrap">Search Term:</label>
            <TextInput
              name="searchTerm"
              placeholder="Search esatate..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className=" flex gap-3 items-center">
            <label className=" whitespace-nowrap">Type:</label>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="all"
                checked={sidebardata.type === "all"}
                onChange={handleChange}
              />
              <span>Rent & Sale</span>
            </div>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="sale"
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
              />
              <span>Sale</span>
            </div>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="rent"
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
              />
              <span>rent</span>
            </div>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="offer"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label>Amenities:</label>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="parking"
                checked={sidebardata.parking}
                onChange={handleChange}
              />
              <span>Parking</span>
            </div>
            <div className=" flex items-center gap-2">
              <Checkbox
                name="furnished"
                checked={sidebardata.furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label>Sort:</label>
            <Select
              name="sort"
              value={sidebardata.sort}
              onChange={handleChange}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className=" text-center text-3xl font-semibold md:border-b p-3 text-gray-700 my-5">
          {" "}
          Listing results:
        </h1>
        {loading && typeof listings === "undefined" && (
          <div className=" flex justify-center items-center h-screen">
            <Spinner size={"xl"} />
          </div>
        )}
        <div className="p-7 flex flex-wrap gap-4">
          {listings && !loading && listings.length > 1 ? (
            listings?.map((i) => <ListingItem key={i._id} listing={i} />)
          ) : (
            <p className=" text-gray-500 text-4xl flex justify-center items-center h-[40vh] font-semibold mx-auto">
              No Result
            </p>
          )}
          {showMore && (
            <p
              onClick={() => setPage((prev) => (prev += 1))}
              className="my-7 text-green-500 font-semibold hover:underline cursor-pointer text-center"
            >
              Show More
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
