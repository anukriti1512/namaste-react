
import { IMG_CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
    return (<div className='res-card'>
        <img className='res-logo' src={IMG_CDN_URL + props.imgUrl} />
        <h3>{props.resName}</h3>
        <h4>{props.cuisine}</h4>
        <h4>{props.starRating}</h4>
        <h4>38 mins</h4>
    </div>)
}

export default RestaurantCard;