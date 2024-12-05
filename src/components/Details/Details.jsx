import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const Details = () => {
  const items = useLoaderData();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const details = items.find(item => item.id === Number(id));

  const {
    adventureTitle,
    image,
    categoryName,
    shortDescription,
    adventureCost,
    location,
    duration,
    bookingAvailability,
    adventureLevel,
    maxGroupSize,
    includedItems,
    ecoFriendlyFeatures,
    specialInstructions,
  } = details;

  const handleExpertButtonClick = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const totalMinutes = currentHour * 60 + currentMinutes;

    const startMinutes = 10 * 60;
    const endMinutes = 20 * 60;

    if (totalMinutes >= startMinutes && totalMinutes <= endMinutes) {
      window.open("https://meet.google.com", "_blank");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={image} className="rounded-lg shadow-2xl" alt={adventureTitle} />
          <div>
            <h1 className="text-5xl font-bold py-2">{adventureTitle}</h1>
            <div>
              <p>
                <span className="text-lg font-semibold">Category:</span> {categoryName}
              </p>
              <p>
                <span className="text-lg font-semibold">Short Description:</span>{" "}
                {shortDescription}
              </p>
              <p>
                <span className="text-lg font-semibold">Adventure Cost:</span> {adventureCost} Taka
              </p>
              <p>
                <span className="text-lg font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="text-lg font-semibold">Duration:</span> {duration}
              </p>
              <p>
                <span className="text-lg font-semibold">Booking:</span>{" "}
                {bookingAvailability ? "Available" : "Not Available"}
              </p>
              <p>
                <span className="text-lg font-semibold">Adventure Level:</span> {adventureLevel}
              </p>
              <p>
                <span className="text-lg font-semibold">Max Group Member:</span> {maxGroupSize}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 bg-base-200 lg:place-items-center p-4 gap-6">
        <div>
          <p className="text-xl font-bold">Included Items</p>
          {includedItems.map((item, i) => (
            <p key={i}>* {item}</p>
          ))}
        </div>
        <div>
          <p className="text-xl font-bold">Eco Friendly Features</p>
          {ecoFriendlyFeatures.map((item, i) => (
            <p key={i}>* {item}</p>
          ))}
        </div>
        <div>
          <p className="text-xl font-bold">Special Instructions</p>
          {specialInstructions.map((item, i) => (
            <p key={i}>* {item}</p>
          ))}
        </div>
      </div>
      <button
        className="text-lg w-full btn btn-primary"
        onClick={handleExpertButtonClick}
      >
        Talk With Experts
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Consultation Time</h2>
            <p className="mt-4">
              Our experts are available for consultation between 10:00 AM and 8:00 PM.
              Please contact us during this time.
            </p>
            <button
              className="mt-4 btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
