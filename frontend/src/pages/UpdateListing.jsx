import {
  Alert,
  Button,
  Checkbox,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useUpdateListing from "../hooks/useUpdateListing";
import useGetListing from "../hooks/useGetListing";
import { useParams } from "react-router-dom";

const UpdateListing = () => {
  const { currentUser } = useSelector((store) => store.user);
  const { listingId } = useParams();
  const { listing } = useGetListing(listingId);
  const { updateListing: updatedListing, loading } = useUpdateListing();
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    regularPrice: "",
    discountPrice: "",
    offer: "",
    parking: "",
    furnished: "",
    userRef: currentUser?._id,
  });
  const [photoArr, setPhotoArr] = useState([]);
  const changeImageHandler = (e) => {
    console.log(e.target.files);
    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setPhotoArr((prev) => [...prev, reader.result]);
          }
        };
      }
    }
  };
  useEffect(() => {
    setFormData({
      name: listing.name,
      description: listing.description,
      address: listing.address,
      type: listing.type,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      regularPrice: listing.regularPrice,
      discountPrice: listing.discountPrice,
      offer: listing.offer,
      parking: listing.parking,
      furnished: listing.furnished,
      userRef: listing.userRef,
    });
    if (listing.imageUrls?.length > 0) {
      setPhotoArr(listing.imageUrls);
    }
  }, [listing, listingId]);
  useEffect(() => {
    setFormData({ ...formData, ["imageUrls"]: photoArr });
  }, [photoArr]);
  const changeHandle = (e) => {
    if (e.target.name === "sale" || e.target.name === "rent") {
      setFormData({ ...formData, type: e.target.name });
    }
    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    if (
      e.target.name === "name" ||
      e.target.name === "description" ||
      e.target.name === "address" ||
      e.target.name === "bathrooms" ||
      e.target.name === "bedrooms" ||
      e.target.name === "regularPrice" ||
      e.target.name === "discountPrice"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleRemoveImage = (index) => {
    setPhotoArr((prev) => prev.filter((_, i) => i !== index));
  };
  const submitHandle = async (e) => {
    e.preventDefault();

    await updatedListing({ formData, id: listingId });
  };
  // console.log(formData);

  return (
    <div className="max-w-4xl mx-auto p-3">
      {loading ? (
        <div className=" h-screen justify-center flex items-center">
          <Spinner size={"xl"} />
        </div>
      ) : (
        Object.keys(listing)?.length > 0 && (
          <>
            {" "}
            <h1 className="text-center text-4xl font-bold my-7">
              {" "}
              Update Listing
            </h1>
            <form
              onSubmit={submitHandle}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 flex flex-col gap-4 px-1">
                <TextInput
                  name="name"
                  value={formData.name}
                  onChange={changeHandle}
                  placeholder="Enter property name.."
                  required
                />
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={changeHandle}
                  placeholder="Enter property description.."
                  rows={"3"}
                  required
                />
                <TextInput
                  name="address"
                  value={formData.address}
                  onChange={changeHandle}
                  required
                  placeholder="Enter property address.."
                />
                <div className="flex flex-wrap gap-6 my-2 justify-center sm:justify-start">
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      name="sale"
                      onChange={changeHandle}
                      checked={formData.type === "sale"}
                    />
                    <span>Sell</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      name="rent"
                      onChange={changeHandle}
                      checked={formData.type === "rent"}
                    />
                    <span>Rent</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      name="parking"
                      onChange={changeHandle}
                      checked={formData.parking}
                    />
                    <span>Parking spot</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      name="furnished"
                      onChange={changeHandle}
                      checked={formData.furnished}
                    />
                    <span>Furnished</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      name="offer"
                      onChange={changeHandle}
                      checked={formData.offer}
                    />
                    <span>Offer</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <TextInput
                      className=" w-fit"
                      name="bathrooms"
                      type="number"
                      min={"1"}
                      max={"10"}
                      value={formData.bathrooms}
                      onChange={changeHandle}
                    />
                    <span>Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TextInput
                      className="w-fit"
                      name="bedrooms"
                      type="number"
                      min={"1"}
                      max={"10"}
                      value={formData.bedrooms}
                      onChange={changeHandle}
                    />
                    <span>Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TextInput
                      className=" w-fit"
                      name="regularPrice"
                      type="number"
                      min={"10000"}
                      max={"10000000"}
                      value={formData.regularPrice}
                      onChange={changeHandle}
                    />
                    <div className="flex flex-col items-center">
                      <span>Regular price</span>
                      {formData.type === "rent" && (
                        <span className=" text-xs">(per month)</span>
                      )}
                    </div>
                  </div>
                  {formData.offer && (
                    <div className="flex items-center gap-2">
                      <TextInput
                        className=" w-fit"
                        name="discountPrice"
                        type="number"
                        min={"1000"}
                        max={"10000000"}
                        value={formData.discountPrice}
                        onChange={changeHandle}
                      />
                      <div className="flex flex-col items-center">
                        <span>Discount price</span>
                        {formData.type === "rent" && (
                          <span className=" text-xs">(per month)</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex-1 flex flex-col gap-4">
                <h1 className="font-semibold">
                  Images:{" "}
                  <span className=" font-medium text-sm">
                    The first image will be the cover (max 6)
                  </span>
                </h1>
                <div className="flex gap-4 sm:flex-col">
                  <TextInput
                    type="file"
                    onChange={changeImageHandler}
                    className="hidden"
                    ref={filePickerRef}
                    accept="image/*"
                    multiple
                  />

                  <Button
                    outline
                    color={"green"}
                    onClick={() => filePickerRef.current.click()}
                    className=" w-full"
                    disabled={photoArr?.length === 6}
                  >
                    {photoArr?.length > 0
                      ? `${photoArr.length}  Photo added`
                      : "Add Image"}
                  </Button>
                  {photoArr?.length > 6 && (
                    <Alert color={"red"}>
                      You can only upload 6 images per listing
                    </Alert>
                  )}
                </div>
                {photoArr?.length > 0 &&
                  photoArr.map((url, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-3 flex justify-between items-center gap-4 dark:border-gray-700"
                    >
                      <img
                        src={url}
                        alt="listing image"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <Button
                        onClick={() => handleRemoveImage(i)}
                        color={"red"}
                        outline
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                <Button
                  type="submit"
                  color={"dark"}
                  disabled={
                    loading || photoArr?.length > 6 || photoArr?.length === 0
                  }
                >
                  {loading ? <Spinner /> : "Create listing"}
                </Button>
              </div>
            </form>
          </>
        )
      )}
    </div>
  );
};

export default UpdateListing;
