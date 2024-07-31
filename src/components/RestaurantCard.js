import { IMG_CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
  return (
    <div className="flex justify-center items-center flex-col m-2 rounded-lg p-4  bg-slate-200 w-80 h-min">
      <div className="flex mb-2 rounded-lg max-w-fit min-h-72">
        <img
          className="mb-2 rounded-lg w-[300px] h-[300px] "
          src={IMG_CDN_URL + props.imgUrl}
        />
      </div>
      <div className="flex flex-col items-center min-h-40">
        <h3 className="font-extrabold">{props.resName}</h3>
        <h4 className="text-sm text-gray-700">{props.cuisine}</h4>
        <h4 className="font-semibold m-2">{props.starRating} ⭐</h4>
        <h4 className="font-semibold text-gray-800">38 mins</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
