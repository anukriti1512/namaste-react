import { IMG_CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  console.log("props", props);
  return (
    <div className="card  hover:scale-90 flex  items-center flex-col m-2 rounded-lg w-80">
      <div className="w-[280px] h-[200px] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full  "
          src={IMG_CDN_URL + props.resData.cloudinaryImageId}
        />
      </div>
      <div
        className="flex flex-col p-4"
        style={{ width: "-webkit-fill-available" }}
      >
        <h3 className="px-2 font-gilroy font-bold text-[18px] whitespace-nowrap overflow-hidden text-ellipsis">
          {props.resData.name}
        </h3>
        <h4 className="font-semibold m-1">
          {" "}
          ⭐ {props.resData.avgRating} ⋄ {props.resData.sla.slaString}{" "}
        </h4>
        <h4 className=" px-2 font-gilroy text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis ">
          {props.resData.cuisines.join(", ")}
        </h4>
        <h4 className="px-2 font-gilroy text-gray-600">
          {props.resData.areaName}
        </h4>
      </div>
    </div>
  );
};

// Higher order component
export const promotedLabelRestaurantCard = (RestaurantCard) => {
  // return a enhanced component
  // component
  return (props) => {
    return (
      <div className="hover:scale-90">
        <label className="absolute bg-black text-white p-2 m-1 ml-4 rounded-lg z-50">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  }; // component ends
};

export default RestaurantCard;
