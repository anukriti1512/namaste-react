import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log("redId", resId);
  const [cardItems, setCardItems] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API_URL + resId);

    const json = await data.json();

    console.log("jsomn", json);
    setCardItems(json.data);
  };

  if (cardItems == null) {
    return <Shimmer />;
  }

  const resName = cardItems?.cards[0]?.card?.card?.text;
  const itemCards =
    cardItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
      ?.card?.itemCards;

  console.log("menu card", itemCards);

  return (
    <div className="menu">
      <h1>{resName}</h1>
      <h2>Menu</h2>
      <ul>
        {itemCards?.map((item) => {
          return (
            <li key={item.card.info.id}>
              {item.card.info.name} - Rs. {item.card.info.price / 100}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
