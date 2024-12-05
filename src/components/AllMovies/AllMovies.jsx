import { useLoaderData } from "react-router-dom";
import Rating from "react-rating";
import { NavLink } from "react-router-dom";

const AllMovies = () => {
  const datas = useLoaderData();
  console.log(datas);

  return (
    <>
      <h1 className="text-center text-4xl font-bold underline italic text-purple-800">All Movies</h1>
      <div className="px-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mt-8">
        {datas.map((data) => {
          const { poster, title, genre, duration, releaseYear, rating, _id } = data;
          return (
            <div
              key={_id}
              className="card card-compact bg-gradient-to-b from-violet-700 via-neutral-500 to-indigo-800 shadow-xl"
            >
              <figure>
                <img
                  className="w-1/2 h-52 m-2 rounded-md"
                  src={poster}
                  alt="Movie Poster"
                />
              </figure>
              <div className="p-4">
                <h2 className="font-bold text-lg text-white">
                  Movie Title: {title}
                </h2>
                <p className="text-white">
                  <span className="font-semibold">Genre:</span>{" "}
                  {genre.length > 0 ? genre.join(", ") : "No genres available"}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Duration:</span> {duration} min.
                </p>
                <p className="text-white">
                  <span className="font-semibold">Release Year:</span>{" "}
                  {releaseYear}
                </p>
                <div className="text-white flex gap-1 items-center">
                  <span className="font-semibold">Rating:</span>
                  <Rating
                    readonly
                    initialRating={rating}
                    emptySymbol={<span className="text-gray-500 text-lg">☆</span>}
                    fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
                  />
                  <span className="ml-2 text-sm text-gray-300">({rating})</span>
                </div>
                <div className="card-actions justify-end">
                  <NavLink to={`/details/${_id}`}>
                    <button className="hover:bg-green-500 px-4 py-2 text-gray-300 bg-slate-900 rounded-lg">
                      See Details
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllMovies;