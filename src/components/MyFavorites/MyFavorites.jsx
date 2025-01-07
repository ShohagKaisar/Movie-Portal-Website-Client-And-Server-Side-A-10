import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const datas = useLoaderData();
  const filterByEmail = datas.filter(data => data.email === user.email);
  const [favmovies, setFavmovies] = useState(filterByEmail);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://movie-portal-server-alpha.vercel.app/favorite/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success"
              })
            }
          })
        const remaining = favmovies.filter(favmovie => favmovie._id !== _id);
        setFavmovies(remaining);
      }
    });
  }

  return (
    <div className="-mt-8">
      <h1 className="text-center text-4xl font-bold underline italic text-purple-800">My Fevourite Movies</h1>
      <div id="card" className="p-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Poster</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Delete</th>
              </tr>
            </thead>
            {
              favmovies.map(data => <tbody key={data._id}>
                {/* row 1 */}
                <tr>
                  <td><img className="w-12 h-12 rounded-md" src={data.poster} /></td>
                  <td>{data.title}</td>
                  <td>{data.duration} min.</td>
                  <td>{data.genre}</td>
                  <td>{data.rating}</td>
                  <td>
                    <button onClick={() => handleDelete(data._id)} className="hover:bg-green-500 px-4 py-2 text-gray-300 bg-slate-900 rounded-lg">Delete</button></td>
                </tr>
              </tbody>)
            }

          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFavorites;