import { useLoaderData, useParams } from "react-router-dom";
import FavCard from "./FavCard";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const MyFavorites = () => {
const {user} = useContext(AuthContext);
console.log(user);
  const datas = useLoaderData();
  const filterByEmail = datas.filter(data=>data.email === user.email);
  console.log(filterByEmail);
  

  return (
    <>
      <h1 className="text-center text-4xl font-bold underline italic text-purple-800">My Fevourite Movies</h1>
      <div id="card" className="p-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {
          filterByEmail.map(data => <FavCard key={data.id} data={data}></FavCard>)
        }
      </div>
    </>
  );
};

export default MyFavorites;