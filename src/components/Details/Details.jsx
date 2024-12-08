import { useContext } from "react";
import Rating from "react-rating";
import { NavLink, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../AuthProvider/AuthProvider";


const Details = () => {
  const items = useLoaderData();
  const { _id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const email = user.email;

  const details = items.find(item => item._id === _id);

  const { poster, title, genre, duration, rating, summary, releaseYear } = details;

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
        fetch(`https://movie-portal-server-alpha.vercel.app/movies/${_id}`, {
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
            navigate("/allmovies");
          })
      }
    });
  }

  // Add to favorite function
  const handleFavorite = (details) => {
    const { poster, title, genre, duration, rating, summary } = details;
    const myFav = { email, poster, title, genre, duration, rating, summary };


    fetch(`https://movie-portal-server-alpha.vercel.app/favorite`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myFav),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.insertedId) {
          Swal.fire({
            title: "Movie Added To Favorite Successfully!",
            icon: "success",
          });
        }
      })
  };


  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row w-3/4">
          <img src={poster} className="rounded-lg shadow-2xl w-44" alt="" />
          <div>
            <h1 className="text-4xl font-bold py-2">{title}</h1>
            <div>
              <p>
                <span className="text-lg font-semibold">Release Year:</span> {releaseYear}
              </p>
              <p>
                <span className="font-semibold">Genre:</span>{" "}
                {genre.length > 0 ? genre.join(", ") : "No genres available"}
                .</p>
              <p>
                <span className="text-lg font-semibold">Duration:</span> {duration} min.
              </p>
              <div className="flex gap-1 items-center"><span className="font-semibold">Rating:</span>
                <p>
                  <Rating
                    readonly
                    initialRating={rating}
                    emptySymbol={<span className="text-gray-500 text-lg">☆</span>}
                    fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
                  />
                  <span className="ml-2 text-sm text-gray-300">({rating})</span>
                </p></div>
              <p className="my-2">
                <span className="text-lg font-semibold">Summery:</span>{" "}
                {summary}
              </p>
              <div className="flex gap-4">
                <button onClick={() => handleDelete(_id)} className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-800 hover:text-white">Delete Movie</button>
                <button onClick={() => handleFavorite(details)} className="px-4 py-2 bg-green-300 rounded-lg hover:bg-green-800 hover:text-white">Add to Favorite</button>
                <NavLink to={`/update/${_id}`}><button className="px-4 py-2 bg-yellow-300 rounded-lg hover:bg-yellow-800 hover:text-white">Update Movie</button></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
