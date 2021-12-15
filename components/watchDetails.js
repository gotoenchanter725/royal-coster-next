import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { Skeleton } from "@material-ui/lab";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

function getFilterValue(str) {
  str = str.toLowerCase();
  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }
  str = str.replace(/\W+/g, "-");
  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }
  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }
  return str;
}

export default function WatchDetails({ watchData, loading }) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  return (
    <>
      {watchData.length > 0 &&
        watchData.map(
          (watch, index) =>
            watch.data.length && (
              <div
                className="watch-detail-section r-container pt-5"
                id={watch.title}
                key={index}
              >
                <div className="watch-info-panel row m-0 mb-5">
                  <div
                    className={
                      "text-panel col-md-6 col-12 d-flex flex-column justify-content-center mt-md-0 mt-5 p-0 pe-md-5 " +
                      (index % 2 == 1 && "ps-md-5")
                    }
                  >
                    <h3
                      className={
                        "blue-text watch-title text-capitalize mb-md-5 mb-3 " +
                        (index % 2 == 0 ? "pe-md-5" : "ps-md-5 ms-md-5")
                      }
                    >
                      {watch.title + " Watches"}
                    </h3>
                    <p
                      className={
                        "watch-description pb-5 m-0 " +
                        (index % 2 == 0 ? "pe-md-5" : "ps-md-5 ms-md-5")
                      }
                    >
                      {watch.description}
                    </p>
                    <div
                      className={
                        "btn-panel pt-md-5 pt-3 " +
                        (index % 2 == 0 ? "pe-md-5" : "ps-md-5 ms-md-5")
                      }
                    >
                      <Link
                        href={{
                          pathname: "/shop",
                          query: {
                            tags: watch.title,
                            productType: "watches",
                          },
                        }}
                      >
                        <a className="btn btn-show-watch text-uppercase round-form py-3 px-5 blue-btn">
                          {`Show ${watch.title} watches`}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div
                    className={
                      "image-panel col-md-6 col-12 px-0 " +
                      (index % 2 == 1
                        ? "order-first"
                        : "order-md-last order-first")
                    }
                  >
                    <img
                      src={"/img/watch/" + watch.title + "_image.jpg"}
                      className="watch-cover-image"
                      alt="watch-cover-image"
                    />
                  </div>
                </div>
                {watch.data.length ? (
                  <div className="watch-items-panel">
                    <h3 className="title py-3 mb-4 text-capitalize">
                      {watch.title + " watches"}
                    </h3>
                    <div className="item-panel row mb-5">
                      {
                        <Swiper
                          navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                          }}
                          slidesPerView={4}
                          spaceBetween={30}
                          // loop={true}
                          className="mySwiper"
                          breakpoints={{
                            996: {
                              slidesPerView: 4,
                            },
                            768: {
                              slidesPerView: 3,
                            },
                            590: {
                              slidesPerView: 2,
                            },
                            480: {
                              slidesPerView: 1.5,
                            },
                            360: {
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
                              swiper.params.navigation.prevEl =
                                navigationPrevRef.current;
                              swiper.params.navigation.nextEl =
                                navigationNextRef.current;

                              // Re-init navigation
                              swiper.navigation.destroy();
                              swiper.navigation.init();
                              swiper.navigation.update();
                            });
                          }}
                        >
                          {watch.data.map((item, index) => {
                            return (
                              <SwiperSlide key={index}>
                                <div>
                                  <Link
                                    passHref={true}
                                    href={{
                                      pathname: "/shop/[slug]",
                                      query: {
                                        slug:
                                          getFilterValue(item.title) +
                                          "-" +
                                          item.shopifyid,
                                      },
                                    }}
                                  >
                                    <a>
                                      <div className="image-panel round hover-scale mb-3">
                                        <img
                                          src={item.image}
                                          className="item-image"
                                          alt="watch-image"
                                        />
                                      </div>
                                    </a>
                                  </Link>
                                  <h4 className="item-title text-capitalize mb-3">
                                    {item.title}
                                  </h4>
                                  {/* <p className="item-id text-capitalize mb-4">
                                {"#" + item.costerid}
                              </p> */}
                                  <h3 className="item-cost text-uppercase">
                                    <NumberFormat
                                      value={item.price}
                                      displayType="text"
                                      decimalScale={2}
                                      fixedDecimalScale={true}
                                      thousandSeparator={true}
                                      prefix="€ "
                                    />
                                  </h3>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      }
                    </div>
                  </div>
                ) : (
                  <h3 className="py-5 text-center empty-text">No product</h3>
                )}
              </div>
            )
        )}
      {loading && (
        <div className="r-container pt-5">
          <div className="row m-0 mb-5">
            <div
              className={
                "col-md-6 col-12 d-flex flex-column mt-md-0 mt-5 p-0 pe-md-5 " +
                (loading == 2 && "ps-md-5")
              }
            >
              <Skeleton variant="text" className="mb-4" height={40} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={30} />
              <Skeleton variant="text" height={30} />
            </div>
            <div
              className={
                "col-md-6 col-12 px-0 " +
                (loading == 2 ? "order-first" : "order-md-last order-first")
              }
            >
              <Skeleton variant="rect" width="100%" height={350} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={250} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
            </div>
            <div className="col-md-4 col-sm-6 mb-5 d-none d-sm-block">
              <Skeleton variant="rect" height={250} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
            </div>
            <div className="col-md-4 mb-5 d-none d-md-block">
              <Skeleton variant="rect" height={250} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
            </div>
            <div className="col-md-4 mb-5 d-none d-md-block">
              <Skeleton variant="rect" height={250} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
              <Skeleton variant="text" height={30} width="100%" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
