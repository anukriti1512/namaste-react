import { IMG_CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {
  console.log(items);
  return (
    <div>
      {items.map((item) => (
        <div className="p-2 m-2 border-t-2 border-gray-200 flex justify-between gap-4">
          <div key={item.card.info.id}>
            <div className="py-2">
              <span className="font-semibold">{item.card.info.name}</span>
              <span>
                {" "}
                - ₹{" "}
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="pb-1 text-xs">{item.card.info.description}</p>
          </div>
          <img
            src={IMG_CDN_URL + item.card.info.imageId}
            className="w-32 rounded-md"
          />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
