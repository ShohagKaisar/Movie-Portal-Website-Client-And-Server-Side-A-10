import { useLoaderData } from "react-router-dom";
import FavCard from "./FavCard";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const MyFavorites = () => {
const {user} = useContext(AuthContext);
  const datas = useLoaderData();
  const filterByEmail = datas.filter(data=>data.email === user.email);
  const [favmovies, setFavmovies] = useState(filterByEmail);
  

  return (
    <>
      <h1 className="text-center text-4xl font-bold underline italic text-purple-800">My Fevourite Movies</h1>
      <div id="card" className="p-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {
          favmovies.map(data => <FavCard key={data.id} data={data} favmovies={favmovies} setFavmovies={setFavmovies}></FavCard>)
        }
      </div>
    </>
  );
};

export default MyFavorites;