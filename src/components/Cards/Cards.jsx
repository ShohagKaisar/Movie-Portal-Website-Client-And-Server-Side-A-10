/* eslint-disable react/prop-types */
import Rating from "react-rating";
import { NavLink } from "react-router-dom";


const Cards = ({ data }) => {
  const { _id, poster, title, genre, duration, rating, summary, releaseYear } = data;


  return (
    <div className="card card-compact bg-gradient-to-b from-violet-700 via-neutral-500 to-indigo-800 shadow-xl">
      <figure>
        <img className="w-1/2 h-52 m-2 rounded-md"
          src={poster}
          alt="Image" />
      </figure>
      <div className="p-4">
        <h2 className="font-bold text-lg text-white">Movie Title: {title}</h2>
        <p className="text-white">
          <span className="font-semibold">Genre:</span>{" "}
          {genre.length > 0 ? genre.join(", ") : "No genres available"}
       .</p>
        <p className="text-white"><span className="font-semibold">Duration:</span> {duration} min.</p>
        <p className="text-white"><span className="font-semibold">Release Year:</span> {releaseYear}</p>
        <div className="text-white flex gap-1 items-center"><span className="font-semibold">Rating:</span>
        <p>
        <Rating
          readonly
          initialRating={rating}
          emptySymbol={<span className="text-gray-500 text-lg">☆</span>}
          fullSymbol={<span className="text-yellow-400 text-lg">★</span>}
        />
        <span className="ml-2 text-sm text-gray-300">({rating})</span>
      </p></div>
        <div className="card-actions justify-end">
          <NavLink to={`/details/${_id}`}><button className="hover:bg-green-500 px-4 py-2 text-gray-300 bg-slate-900 rounded-lg">See Details</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cards;
