
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import { Rating } from "react-simple-star-rating";

const AddMovie = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const { user } = useContext(AuthContext);
  const { email } = user;

  const years = [2024, 2023, 2022, 2021, 2020];
  const genres = ["Comedy", "Drama", "Horror", "Action", 'Suspense', 'Thriller', "Romance", "Sci-Fi"];
  const [genre, setGenre] = useState([]);

  const handleChange = ((e) => {
    const value = e.target.value;
    setGenre([...genre, value])
  })


  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const poster = form.poster.value;
    const title = form.title.value;
    const duration = form.duration.value;
    const summary = form.summary.value;
    const releaseYear = form.releaseYear.value;

    const newUser = { email, poster, title, genre, duration, rating, summary, releaseYear }

    if (!poster || !poster.startsWith("http")) {
      toast.error("Poster must be a valid URL.");
      return false;
    }
    if (!title || title.length < 2) {
      toast.error("Title must be at least 2 characters.");
      return false;
    }
    if (!duration || parseInt(duration) < 60) {
      toast.error("Duration must be at least 60 minutes.");
      return false;
    }
    if (!releaseYear) {
      toast.error("Please select a release year.");
      return false;
    }
    if (rating === 0) {
      toast.error("Please provide a rating.");
      return false;
    }
    if (!summary || summary.length < 10) {
      toast.error("Summary must be at least 10 characters.");
      return false;
    }

    if (!genre) {
      alert("Please select a genre!");
      return;
    }

    fetch(`https://movie-portal-server-alpha.vercel.app/movies`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            title: "Movie Added Successfully!",
            icon: "success"
          });
        }
        form.reset();
        setGenre([]);
        setRating(0);
      })
    return true;
  };

  return (
    <div className="bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 min-h-screen flex flex-col items-center py-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Add a New Movie</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        {/* Movie Poster */}
        <div>
          <label className="block text-sm font-medium mb-2">Movie Poster URL</label>
          <input
            type="text"
            name="poster"
            placeholder="Enter poster URL"
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          />
        </div>

        {/* Movie Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Movie Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter movie title"
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select multiple
            name="genre"
            value={genre}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            placeholder="Enter duration in minutes"
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          />
        </div>

        {/* Ratting */}
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <Rating
            onClick={handleRating}
            showTooltip
          />
        </div>

        {/* Release Year */}
        <div>
          <label className="block text-sm font-medium mb-2">Release Year</label>
          <select
            name="releaseYear"
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <textarea
            name="summary"
            placeholder="Enter a short summary"
            className="w-full p-2 rounded bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-white -mt-8 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 text-black font-medium rounded hover:bg-yellow-600 transition"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
