import React from "react";
import { Link } from "react-router-dom";

function TripItem({ trip }) {
  const path = "/Detail/" + trip.id;
  return (
    <Link className="col-md-6 col-lg-4 mb-5" to={path}>
      <div
        className="portfolio-item mx-auto"
        data-bs-toggle="modal"
        data-bs-target="#portfolioModal1"
      >
        <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
          <div className="portfolio-item-caption-content text-center text-white">
            <i className="fas fa-plus fa-3x"></i>
          </div>
        </div>
        <img className="img-fluid" src={trip.img} alt="..." />
      </div>
    </Link>
  );
}

export default TripItem;
