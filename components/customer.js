import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
SwiperCore.use([Autoplay, Navigation]);

export default function Customer({ customerSlider }) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div className="customer-section r-container py-5">
      <div className="top-panel d-flex justify-content-between">
        <h3 className="title py-5 blue-text">Happy Customers</h3>
        <div className="btn-bottom-panel d-flex align-items-center">
          <button ref={navigationPrevRef} className="btn px-0 me-5">
            <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
          </button>
          <button ref={navigationNextRef} className="btn px-0">
            <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
          </button>
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        slidesPerView={1.6}
        spaceBetween={30}
        loop={true}
        className="mySwiper py-5"
        breakpoints={{
          1208: {
            slidesPerView: 1.6,
          },
          1: {
            slidesPerView: 1,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={(swiper) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;

            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        {customerSlider.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="customer-slider-item row m-0">
                <div className="col-lg-5 col-md-3 col-sm-4 col-12 cover-image p-0">
                  <img
                    src={"/img/product/" + item.coverImage}
                    alt="cover-image"
                  />
                </div>
                <div className="col-lg-7 col-md-9 col-sm-8 col-12 text-panel p-0 p-5">
                  <div className="customer-title d-flex">
                    <div className="avatar">
                      <img
                        src={"/img/product/" + item.customerImage}
                        alt="customer-avatar"
                      />
                    </div>
                    <div className="customer-info">
                      <h3 className="blue-text">{item.name}</h3>
                      <h4>{item.location}</h4>
                    </div>
                  </div>
                  <p className="description m-0 mt-5 text-capitalize">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
