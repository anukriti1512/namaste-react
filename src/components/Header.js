import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between  bg-yellow-400 p-1 align-middle mb-5 ">
      <div className="w-30">
        <img className="w-40" src={LOGO_URL} />
      </div>
      <div className="flex">
        <ul className="flex flex-row m-1 p-4 align-middle ">
          <li className="p-4 m-4">
            Online Status : {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="p-4 m-4">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 m-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-4 m-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="p-4 m-4">Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
