import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import Instagram from "../../components/instagram";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill, RiPlayCircleFill } from "react-icons/ri";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const collectionSlider = [
  {
    title: "Diamond Rings",
    url: "/shop?tags=diamond&productType=rings",
    image: "/img/collection/slider-1.png"
  },
  {
    title: "Diamond Earrings",
    url: "/shop?tags=diamond&productType=earrings",
    image: "/img/collection/slider-4.png"
  },
  {
    title: "Diamond Bracelets",
    url: "/shop?tags=diamond&productType=bracelets",
    image: "/img/collection/slider-2.png"
  },
  {
    title: "Diamond Necklaces",
    url: "/shop?tags=diamond&productType=necklaces",
    image: "/img/collection/slider-3.png"
  },
]

const collectionData = [
  {
    title: "Rainbow Collection",
    description: "All the colors of rain and sunshine",
    image: "/img/collection/item-1.png",
    subImage: "/img/collection/sub-item-1.png",
    slug: "rainbow-collectie"
  },
  {
    title: "Empress Collection",
    description: "‘The City of Diamonds” As an homage to this unique visitor, we created the Empress Collection. A tribute to a very special woman.",
    image: "/img/collection/item-2.png",
    subImage: "/img/collection/sub-item-2.png",
    slug: "empress-collectie"
  },
  // {
  //   title: "Diamond Petals Spring Collection",
  //   description: "Spring brings along fresh hope, enthusiasm of new beginnings and the promise of renewal as nature bursts to life....",
  //   image: "/img/collection/item-3.png",
  //   subImage: "/img/collection/sub-item-3.png",
  //   slug: "rainbow-collectie"
  // },
  {
    title: "The Royal 201 Collection",
    description: "More facets, more sparkle, more fire! The regular brilliant cut with 57 facets was introduced in the 1920’s. For many years,...",
    image: "/img/collection/item-4.png",
    subImage: "/img/collection/sub-item-4.png",
    slug: "rainbow-collectie"
  },
  {
    title: "Touch of Glam ",
    description: "This collection of diamond jewelry focuses on the youthful woman. The jewels exude refined luxury and elegance and tell the story of who you are. ",
    image: "/img/collection/item-5.png",
    subImage: "/img/collection/sub-item-5.png",
    slug: "touch-of-glam"
  },
  {
    title: "NIKKIE x Royal Coster Diamonds",
    description: "The  Diamonds by NIKKIE x Royal Coster Diamonds  collection is a classic and timeless diamond line for young and old. Diamonds...",
    image: "/img/collection/item-6.png",
    subImage: "/img/collection/sub-item-6.png",
    slug: "nikkie-x-royal-coster-diamonds"
  },
  {
    title: "Wedding Ring Collection",
    description: "Sentiment and emotions are central to creativity. Making jewelry is no exception. Royal Coster Diamonds has been known for centuries for creating meaningful jewelry...",
    image: "/img/collection/item-8.png",
    subImage: "/img/collection/sub-item-8.jpg",
    slug: "trouwringen"
  },
  // {
  //   title: "Watches Collection",
  //   description: "This collection of diamond jewelry focuses on the youthful woman. The jewels exude refined luxury and elegance and tell the story of who you are.",
  //   image: "/img/collection/item-7.png",
  //   subImage: "/img/collection/sub-item-7.png",
  //   slug: "rainbow-collectie"
  // },
]

SwiperCore.use([Autoplay, Navigation]);

export default function Collection() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div className="collection_page">
      <Head>
        <title>Collection | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container text-center">
          <h1 className="title text-white text-center text-capitalize pb-md-5">
            Our Collections
          </h1>
          <button className="btn btn-play p-0 mt-sm-5"><RiPlayCircleFill /></button>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-md-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Diamond <span>Jewelry</span></h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              With an extensive stock of loose and set diamonds, we have the most beautiful diamond jewelry Collections. For more than 180 years, our craftsmen and women create beauty that lasts for centuries.</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start collection section */}
      <div className="collection-section r-container pb-5">
        {
          collectionData.map((collection, index) => {
            return (
              <div className="row m-0 align-items-center mt-5 pt-5 collection-panel" key={index}>
                <div className="image-panel d-flex align-items-center p-0 col-md-6 mb-md-0 mb-5">
                  <img className="sub-image" src={collection.subImage} alt="collection-sub-image" />
                  <img className="main-image" src={collection.image} alt="collection-main-image" />
                </div>
                <div className={"text-panel col-md-6 p-0 ps-md-5 " + (index % 2 && 'order-md-first')}>
                  <h3 className="title mx-lg-5 px-md-5 mb-5 blue-text">{collection.title}</h3>
                  <p className="description mx-lg-5 px-md-5 pb-5 mb-0">{collection.description}</p>
                  <div className="btn-panel mt-md-5 mx-lg-5 px-5">
                    <Link
                      passHref={true}
                      href={{
                        pathname: "/collections/[slug]",
                        query: {
                          slug: collection.slug.replace('collectie', 'collection'),
                        },
                      }}
                    >
                      <a className="btn btn-explore px-5 py-3">
                        EXPLORE
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* End collection section */}

      {/* Start our collection section */}
      <div className="our-collection-section mt-5">
        <div className="r-container py-5">
          <div className="title-panel">
            <h3 className="title py-5 mb-0">Other Collections</h3>
          </div>
          <div className="slider-panel">
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
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
              {
                collectionSlider.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Link href={item.url}>
                        <div className="slider-item mb-5">
                          <div className="image-panel hover-scale round mb-4">
                            <img src={item.image} className="tour-image" alt="tour-image" />
                          </div>
                          <h3 className="title mb-4 blue-text">{item.title}</h3>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <div className="btn-bottom-panel py-5">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End our collection section */}

      {/* Start instagram section */}
      <Instagram />
      {/* End instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

      <AppointmentModal />

    </div >
  );
}
