import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import res from "../utils/mockData";
const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);
  const { loggedInUser, setUserName } = useContext(UserContext);
  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)
  console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // const data = await fetch(
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&collection=83667"
    // );

    // const json = await data.json();

    const data = res;
    // Optional Chaining
    // setListOfRestraunt(
    //   data?.cards?.[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // setFilteredRestaurant(
    //   data?.cards?.[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );

    //USING MOCKED RESPONSE DUE TO API ERROR
    setListOfRestraunt(data);
    setFilteredRestaurant(data);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className='body'>
      <div className='filter flex'>
        <div className='search m-4 p-4'>
          <input
            type='text'
            className='border border-solid border-black'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className='px-4 py-2 bg-green-100 m-4 rounded-lg'
            onClick={() => {
              // Filter the restraunt cards and update the UI
              // searchText
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className='search m-4 p-4 flex items-center'>
          <button
            className='px-4 py-2 bg-gray-100 rounded-lg'
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setListOfRestraunt(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className='search m-4 p-4 flex items-center'>
          <label>UserName : </label>
          <input
            className='border border-black p-2'
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-wrap'>
        {filteredRestaurant?.map((restaurant, index) => (
          // <RestaurantCard key={index} resData={restaurant} />

          <Link
            key={restaurant?.info.id}
            to={"/restaurants/" + restaurant?.info.id}
          >
            {/* <RestaurantCard resData={restaurant?.info} /> */}
            {restaurant?.info?.promoted ? (
              <RestaurantCardPromoted resData={restaurant?.info} />
            ) : (
              <RestaurantCard resData={restaurant?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
