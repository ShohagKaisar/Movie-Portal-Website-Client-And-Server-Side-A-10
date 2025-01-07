

const VisionSection = () => {
  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-yellow-500 mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            To create the ultimate platform for movie enthusiasts where stories
            come alive, and everyone can explore, share, and celebrate the art
            of cinema together.
          </p>
        </div>

        {/* Cards Section */}
        <div className="mt-12 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transform transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://img.icons8.com/?size=100&id=oQQIRt5dU74V&format=png&color=000000"
                alt="Streaming"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-bold text-yellow-500">Seamless Streaming</h3>
            <p className="text-gray-300 mt-2">
              Enjoy high-quality streaming of your favorite movies anytime.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transform transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://img.icons8.com/ios-filled/100/FFD700/clapperboard.png"
                alt="Movie Library"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-bold text-yellow-500">Vast Movie Library</h3>
            <p className="text-gray-300 mt-2">
              Discover a rich collection of movies across genres and eras.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:scale-105 transform transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://img.icons8.com/ios-filled/100/FFD700/user-male-circle.png"
                alt="Community"
                className="w-12 h-12"
              />
            </div>
            <h3 className="text-xl font-bold text-yellow-500">Engaging Community</h3>
            <p className="text-gray-300 mt-2">
              Connect with fellow movie lovers and share your passion for films.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
