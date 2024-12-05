/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";


const Cards = ({data}) => {
  const {_id, poster, title, genre, duration, rating, summary} = data;


  return (
    <div className="card card-compact bg-gradient-to-b from-violet-700 via-neutral-500 to-indigo-800 shadow-md">
  <figure>
    <img className="w-1/2 h-52 m-2 rounded-md"
      src={poster}
      alt="Image" />
  </figure>
      <h2 className="font-bold text-lg text-center text-white">{title}</h2>
  <div className="card-body">
        <p>Genre: {
          genre.map((item, i) => (
            <p className="inline-block" key={i}>{item},</p>
          ))
        }.</p>
    <div className="card-actions justify-end">
      <NavLink to={`/details/${_id}`}><button className="btn btn-primary">See Details</button></NavLink>
    </div>
  </div>
</div>
  );
}

export default Cards;
