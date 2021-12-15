import Link from "next/link";
import { useState, useEffect, useRef, Fragment } from "react";
import AboutSlider from "./aboutSlider";
import InstagramFeed from 'react-ig-feed'
import 'react-ig-feed/dist/index.css'
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

const getInstagramURL = "https://graph.instagram.com/me/media?fields=media_count,media_type,permalink,media_url&&access_token=" + process.env.NEXT_PUBLIC_INSTAGRAM_FEED_TOKEN;

export default function Instagram() {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [instagramData, setInstagramData] = useState();

  useEffect(() => {
    fetch(getInstagramURL, {
      method: "get"
    }).then(res => res.json())
      .then(data => {
        setInstagramData(data.data)
      })
  }, [])

  return (
    <Fragment>
      {
        instagramData &&
        <div className="instagram pb-5">
          <div className="r-container">
            <div className="row mx-0 mb-5 text-panel">
              <div className="col-md-6 col-12 p-0">
                <h1 className="m-0 text-capitalize">
                  Follow us on <div>Instagram</div>
                </h1>
              </div>
              <div className="col-md-6 col-12 p-0 d-flex flex-column justify-content-end link-panel">
                <div className="mx-0 text-md-end text-start">
                  Follow{" "}
                  <Link passHref={true} href="https://www.instagram.com/explore/tags/royalcoster/">
                    <a className="text-primary">#Royalcoster</a>
                  </Link>{" "}
                  @Instagram For
                </div>
                <div className="mx-0 text-md-end text-start">
                  <Link passHref={true} href="https://www.instagram.com/explore/tags/diamondstories/">
                    <a className="text-primary">#Diamondstories</a>
                  </Link>
                  ,{" "}
                  <Link passHref={true} href="https://www.instagram.com/explore/tags/inspiration">
                    <a className="text-primary">#Inspiration</a>
                  </Link>{" "}
                  &{" "}
                  <Link passHref={true} href="https://www.instagram.com/explore/tags/amsterdiamonds">
                    <a className="text-primary">#Amsterdiamonds</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-md-none d-block instagram-slider-panel">
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
              {instagramData && instagramData.map((item, index) => {
                if (index < 10)
                  return (
                    <SwiperSlide key={index}>
                      <Link passHref={true} href={item.permalink}>
                        <a target="_blank">
                          <div className="image-panel hover-scale round">
                            {
                              item.media_type == "IMAGE"
                                ? < img
                                  src={item.media_url}
                                  className="round"
                                  alt="gallery-img"
                                />
                                : <video
                                  playsInline
                                  onContextMenu={() => false}
                                  preload="auto"
                                >
                                  <source src={item.media_url} type="video/mp4" />
                                </video>
                            }
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  );
              })}
            </Swiper>
            <div className="btn-bottom-panel mt-sm-5 mt-0 pt-5" >
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
          <div className="row gallery-panel d-md-flex d-none m-0 p-0">
            <div className="col-md-6 col-12 m-0 p-0 d-flex flex-column justify-content-between">
              <div className="row m-0 p-0">
                <div className="col-6 d-flex m-0 p-0">
                  <Link passHref={true} href={instagramData[0].permalink}>
                    <a className="instagram-link gallery-type-1" target="_blank">
                      <div className="gallery-item round">
                        {
                          instagramData[0].media_type == "IMAGE"
                            ? < img
                              src={instagramData[0].media_url}
                              className="round"
                              alt="gallery-img"
                            />
                            : <video
                              playsInline
                              onContextMenu={() => false}
                              preload="auto"
                            >
                              <source src={instagramData[0].media_url} type="video/mp4" />
                            </video>
                        }
                        <div className="hover-panel"></div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="col-6 d-flex m-0 p-0">
                  <Link passHref={true} href={instagramData[1].permalink}>
                    <a className="instagram-link gallery-type-1" target="_blank">
                      <div className="gallery-item round">
                        {
                          instagramData[1].media_type == "IMAGE"
                            ? < img
                              src={instagramData[1].media_url}
                              className="round"
                              alt="gallery-img"
                            />
                            : <video
                              playsInline
                              onContextMenu={() => false}
                              preload="auto"
                            >
                              <source src={instagramData[1].media_url} type="video/mp4" />
                            </video>
                        }
                        <div className="hover-panel"></div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="row m-0 p-0">
                <Link passHref={true} href={instagramData[2].permalink}>
                  <a className="instagram-link p-0 gallery-type-1" target="_blank">
                    <div className="gallery-item round">
                      {
                        instagramData[2].media_type == "IMAGE"
                          ? < img
                            src={instagramData[2].media_url}
                            className="round"
                            alt="gallery-img"
                          />
                          : <video
                            playsInline
                            onContextMenu={() => false}
                            preload="auto"
                          >
                            <source src={instagramData[2].media_url} type="video/mp4" />
                          </video>
                      }
                      <div className="hover-panel"></div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-12 p-0">
              <div className="row m-0 p-0">
                <div className="col-6 p-0">
                  <div className="row m-0 p-0">
                    <Link passHref={true} href={instagramData[3].permalink}>
                      <a className="instagram-link p-0 gallery-type-1" target="_blank">
                        <div className="gallery-item round">
                          {
                            instagramData[3].media_type == "IMAGE"
                              ? < img
                                src={instagramData[3].media_url}
                                className="round"
                                alt="gallery-img"
                              />
                              : <video
                                playsInline
                                onContextMenu={() => false}
                                preload="auto"
                              >
                                <source src={instagramData[3].media_url} type="video/mp4" />
                              </video>
                          }
                          <div className="hover-panel"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="row m-0 p-0">
                    <Link passHref={true} href={instagramData[4].permalink}>
                      <a className="instagram-link p-0 gallery-type-1" target="_blank">
                        <div className="gallery-item round">
                          {
                            instagramData[4].media_type == "IMAGE"
                              ? < img
                                src={instagramData[4].media_url}
                                className="round"
                                alt="gallery-img"
                              />
                              : <video
                                playsInline
                                onContextMenu={() => false}
                                preload="auto"
                              >
                                <source src={instagramData[4].media_url} type="video/mp4" />
                              </video>
                          }
                          <div className="hover-panel"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-6 d-flex p-0">
                  <Link passHref={true} href={instagramData[5].permalink}>
                    <a className="instagram-link gallery-type-2" target="_blank">
                      <div className="gallery-item round">
                        {
                          instagramData[5].media_type == "IMAGE"
                            ? < img
                              src={instagramData[5].media_url}
                              className="round"
                              alt="gallery-img"
                            />
                            : <video
                              playsInline
                              onContextMenu={() => false}
                              preload="auto"
                            >
                              <source src={instagramData[5].media_url} type="video/mp4" />
                            </video>
                        }
                        <div className="hover-panel"></div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
            {/* <div className="row gallery-panel d-md-flex d-none m-0 p-0">
              <div className="col-md-6 col-12 m-0 p-0 d-flex flex-column justify-content-between">
                <div className="row m-0 p-0">
                  <div className="col-6 d-flex m-0 p-0">
                    <Link passHref={true} href="#">
                      <a className="instagram-link gallery-type-1">
                        <div className="gallery-item round">
                          < img
                            src="/img/homepage/Rectangle 33.png"
                            className="round"
                            alt="gallery-img"
                          />
                          <div className="hover-panel"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="col-6 d-flex m-0 p-0">
                    <Link passHref={true} href="#">
                      <a className="instagram-link gallery-type-1">
                        <div className="gallery-item round">
                          < img
                            src="/img/homepage/Rectangle 33.png"
                            className="round"
                            alt="gallery-img"
                          />
                          <div className="hover-panel"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <Link passHref={true} href="#">
                    <a className="instagram-link p-0 gallery-type-1">
                      <div className="gallery-item round">
                        <video
                          playsInline
                          onContextMenu={() => false}
                          preload="auto"
                        >
                          <source src="video/video.mp4" type="video/mp4" />
                        </video>
                        <div className="hover-panel"></div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-12 p-0">
                <div className="row m-0 p-0">
                  <div className="col-6 p-0">
                    <div className="row m-0 p-0">
                      <Link passHref={true} href="#">
                        <a className="instagram-link p-0 gallery-type-1">
                          <div className="gallery-item round">
                            < img
                              src="/img/homepage/Rectangle 33.png"
                              className="round"
                              alt="gallery-img"
                            />
                            <div className="hover-panel"></div>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="row m-0 p-0">
                      <Link passHref={true} href="#">
                        <a className="instagram-link p-0 gallery-type-1">
                          <div className="gallery-item round">
                            <video
                              playsInline
                              onContextMenu={() => false}
                              preload="auto"
                            >
                              <source src="video/video.mp4" type="video/mp4" />
                            </video>
                            <div className="hover-panel"></div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="col-6 d-flex p-0">
                    <Link passHref={true} href="#">
                      <a className="instagram-link gallery-type-2">
                        <div className="gallery-item round">
                          < img
                            src="/img/homepage/Rectangle 33.png"
                            className="round"
                            alt="gallery-img"
                          />
                          <div className="hover-panel"></div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
            <Link href="https://www.instagram.com/costerdiamondsofficial/">
            <a target="_blank" className="btn round-form mt-5 px-5 py-3 follow-btn blue-outline-btn">
              Follow @Costerdiamondsofficial
            </a>
            </Link>
          </div>
        </div>
      }
    </Fragment>
  );
}
