import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "../components/RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const cardItems = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  if (cardItems == null) {
    return <Shimmer />;
  }

  const resName = cardItems?.cards[0]?.card?.card?.text;
  const itemCards =
    cardItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
      ?.card?.itemCards;
  const restaurantInfo = cardItems?.cards[2].card.card.info;
  console.log(
    "cardItems",
    cardItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
  );

  const categories =
    cardItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (c) =>
        c?.card?.card["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log("categories", categories);
  return (
    <div className="flex flex-col items-center ">
      <div className="w-6/12">
        <h2 className=" text-2xl text-black font-extrabold">{resName}</h2>
        <div className="shadow-lg rounded-xl border mt-5 m-2 py-3 border-gray-300 p-4 mb-8">
          <h3>
            {restaurantInfo.avgRatingString} {restaurantInfo.totalRatingsString}{" "}
            {restaurantInfo.costForTwoMessage}
          </h3>
          <h3>{restaurantInfo.cuisines.join(", ")}</h3>
          <h3>{restaurantInfo.locality}</h3>
          <h3>{restaurantInfo.sla.slaString}</h3>
        </div>
      </div>
      {categories.map((category, index) => (
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card.title}
          showList={showIndex == index ? true : false}
          setShowIndex={() =>
            showIndex == index ? setShowIndex(null) : setShowIndex(index)
          }
        ></RestaurantCategory>
      ))}
    </div>
  );
};

export default RestaurantMenu;
