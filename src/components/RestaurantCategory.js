import { useState } from "react";
import ItemList from "../components/ItemList";

const RestaurantCategory = ({ data, showList, setShowIndex }) => {
  //const [showList, setShowList] = useState(false);

  const showListMenu = () => {
    setShowIndex();
  };

  return (
    <div className="w-6/12  mx-auto p-4  border-gray-300 border-b-2 ">
      <div
        className="flex justify-between cursor-pointer"
        onClick={showListMenu}
      >
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showList ? "▲" : "▼"}</span>
      </div>
      {showList && <ItemList items={data.itemCards}></ItemList>}
    </div>
  );
};

export default RestaurantCategory;
