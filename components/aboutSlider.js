import React, { useState, useRef, useEffect } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { RiPlayFill } from "react-icons/ri";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

export default function AboutSlider({ slides, btnDisable, componentProduct }) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <div className="about-slider">
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        className="about-slider"
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          990: {
            slidesPerView: 2.8,
          },
          768: {
            slidesPerView: 2.4,
          },
          480: {
            slidesPerView: 1,
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
        {slides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Link  passHref={true} href="#">
                <a>
                  <div className="image-panel hover-scale round">
                    {componentProduct ? (
                      <img src={item.img} alt="category" />
                    ) : (
                      <img src={"/img/about/" + item.img} alt="category" />
                    )}
                  </div>
                  {item.title && (
                    <h3
                      className={
                        "mt-3 m-0 " + (item.description ? "blue-text" : "")
                      }
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="mt-4 mb-5">{item.description}</p>
                  )}
                </a>
              </Link>
              {item.moreDetail && (
                <Link  passHref={true} href="#">
                  <a className="text-uppercase d-flex align-items-center">
                    More Details <RiPlayFill className="ms-3" />
                  </a>
                </Link>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className={
          "btn-bottom-panel mt-sm-5 mt-0 pt-5 " + (btnDisable ? "d-none" : "")
        }
      >
        <button ref={navigationPrevRef} className="btn px-0 me-5">
          <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
        </button>
        <button ref={navigationNextRef} className="btn px-0">
          <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
        </button>
      </div>
    </div>
  );
}
