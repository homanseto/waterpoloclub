import React from 'react';
import './Carousels.css';

const Carousels = (props) => {
  const { carouselsLists } = props;
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        {carouselsLists.map((list) => {
          return (
            <li
              key={list.id}
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={list.dataBsSlideTo}
              className={list.dataBsSlideTo}
            ></li>
          );
        })}
      </ol>
      <div className="carousel-inner">
        {carouselsLists.map((list) => {
          return (
            <div
              key={list.id}
              className={`carousel-item ${list.active}  ${list.class}`}
              data-bs-interval="5000"
            >
              <h1 className="carousels-title">{list.title}</h1>
              <p className="carousels-contain">{list.contain}</p>
              <button type="button" className="btn btn-lg btn-carousels">
                READ MORE
              </button>
            </div>
          );
        })}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousels;
