import React, { useState } from "react";
import Rating from "react-rating";
import { useLoaderData, useParams } from "react-router-dom";

const Details = () => {
  const items = useLoaderData();
  const { _id } = useParams();

  const details = items.find(item => item._id === _id);

  const { poster, title, genre, duration, rating, summary, releaseYear } = details;


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
                <button className="px-4 py-2 bg-red-300 rounded-lg hover:bg-red-800 hover:text-white">Delete Movie</button>
                <button className="px-4 py-2 bg-green-300 rounded-lg hover:bg-green-800 hover:text-white">Add to Favorite</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
