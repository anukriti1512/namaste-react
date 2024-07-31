import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const cardItems = useRestaurantMenu(resId);

  if (cardItems == null) {
    return <Shimmer />;
  }

  const resName = cardItems?.cards[0]?.card?.card?.text;
  const itemCards =
    cardItems?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card
      ?.card?.itemCards;

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
