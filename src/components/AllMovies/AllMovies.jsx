import { useLoaderData } from "react-router-dom";
import Rating from "react-rating";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const AllMovies = () => {
  const datas = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // New state for sort order

  // Filter the movies based on the search term
  const filteredMovies = datas.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort movies by rating based on the selected sort order (ascending or descending)
  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  // Toggle the sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="-mt-8 pt-8">
      <h1 className="text-center text-4xl font-bold underline italic text-purple-800">
        All Movies
      </h1>

      {/* Search input */}
      <div className="flex justify-center my-6 items-center gap-2">
        <p className="text-xl font-semibold">Search:</p>
        <input
          type="text"
          placeholder="Search movie....."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-purple-900 w-1/2 p-2 rounded-md border-2 border-purple-500 focus:outline-none focus:border-purple-700"
        />
      </div>

      {/* Sort Button */}
      <div className="flex justify-center my-6">
        <button
          onClick={toggleSortOrder}
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Sort by Rating: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Movie Cards */}
      <div className="px-8 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4 mt-8">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((data) => {
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
          })
        ) : (
          <p className="text-center text-gray-300 col-span-full">
            No movies.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
