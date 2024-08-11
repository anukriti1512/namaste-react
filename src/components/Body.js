import RestaurantCard, { promotedLabelRestaurantCard } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const PromotedRestaurantCard = promotedLabelRestaurantCard(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);

  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    //data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    setRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurantList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus == false) {
    return (
      <h1>
        Looks like you are offline ! Please check your internet connection!!!
      </h1>
    );
  }

  // shimmer UI rendering -> if now data is present
  //   if (restaurantList.length == 0) {
  //     return <Shimmer />;
  //   }

  // return actual cards UI when data is fetched from the API
  return restaurantList?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex gap-2">
        <div className="search">
          <input
            type="text"
            className="border border-solid border-blue-500 p-1 m-2 focus:outline-none focus:border-blue-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button
            className="mx-4 my-2 px-4 py-2 rounded-lg bg-blue-400 text-white"
            onClick={(e) => {
              // filtering based on search
              const filteredRes = restaurantList.filter((r) => {
                return r.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurantList(filteredRes);
            }}
          >
            search
          </button>
        </div>
        <button
          className="mx-4 my-2 px-4 py-2 rounded-lg bg-green-300 text-gray-600"
          onClick={() => {
            const filteredRes = restaurantList.filter((res) => {
              // console.log("res", res);
              return res.info.avgRating > 4;
            });
            setFilteredRestaurantList(filteredRes);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {filteredRestaurantList?.map((restaurant) => {
          console.log("rest", restaurant);
          return (
            <Link
              className="res-card-link "
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info.avgRating > 4.3 ? (
                <PromotedRestaurantCard resData={restaurant.info} />
              ) : (
                <RestaurantCard resData={restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;

{
  /* <RestaurantCard
resName={restaurant.info.name}
imgUrl={restaurant.info.cloudinaryImageId}
starRating={restaurant.info.avgRating}
cuisine={restaurant.info.cuisines.join(", ")}
areaName={restaurant.info.areaName}
deliveryTime={restaurant.info.sla.slaString}
/> */
}
