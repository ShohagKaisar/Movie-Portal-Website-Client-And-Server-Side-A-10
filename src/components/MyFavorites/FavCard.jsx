import Rating from "react-rating";
import Swal from "sweetalert2";



const FavCard = ({data}) => {
  const { _id, poster, title, genre, duration, rating, summary, releaseYear } = data;
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
        fetch(`http://localhost:5000/favorite/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success"
              })
            }
          })
      }
    });
  }

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
          <button onClick={() => handleDelete(_id)} className="hover:bg-green-500 px-4 py-2 text-gray-300 bg-slate-900 rounded-lg">Delete From Favorite</button>
        </div>
      </div>
    </div>
  );
}

export default FavCard;
