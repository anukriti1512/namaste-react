import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
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

  // shimmer UI rendering -> if now data is present
  //   if (restaurantList.length == 0) {
  //     return <Shimmer />;
  //   }

  // return actual cards UI when data is fetched from the API
  return restaurantList?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <button
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
          className="filter-btn"
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
      <div className="restaurant-container">
        {filteredRestaurantList?.map((restaurant) => {
          return (
            <Link
              className="res-card-link"
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard
                resName={restaurant.info.name}
                imgUrl={restaurant.info.cloudinaryImageId}
                starRating={restaurant.info.avgRating}
                cuisine={restaurant.info.cuisines.join(", ")}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
