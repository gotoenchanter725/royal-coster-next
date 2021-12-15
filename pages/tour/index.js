import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import WatchItems from "../../components/watchItems";
import Skeleton from "@mui/material/Skeleton";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";


const toursData = [
  { title: "Luxury Shopping Experience", description: "During our Luxury Shopping Experience, you will be completely pampered. Choosing a diamond is a special occasion. While enjoying a glass of champagne, one of our diamond consultants will take you through all the ins and outs that come with choosing the perfect diamond.", image: "/img/tour/tour-1.png" },
  { title: "Luxury Shopping Experience", description: "During our Luxury Shopping Experience, you will be completely pampered. Choosing a diamond is a special occasion. While enjoying a glass of champagne, one of our diamond consultants will take you through all the ins and outs that come with choosing the perfect diamond.", image: "/img/tour/tour-1.png" },
  { title: "Free Guided Diamond Factory Tour", description: "Our guided diamond factory tour is completely free of charge. We give free guided tours in more than 35 languages. Get your ticket today and discover the magical world of diamonds!", image: "/img/tour/tour-3.png" },
  { title: "Luxury Shopping Experience", description: "Our engagement workshop is for couples who are preparing for an engagement or anniversary and want to learn more about diamonds before they purchase. Make buying your engagement ring an unforgettable experience.", image: "/img/tour/tour-4.png" },
  { title: "Luxury Shopping Experience", description: "Come in for a Royal Experience at Royal Coster Diamonds and combine it with 'This is Holland'. Discover all the beautiful things the Dutch are so famous for.", image: "/img/tour/tour-5.png" },
]

const tourURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/tours?order=asc&orderby=id";
let tourData, localSticky = 1;

export default function Tour() {
  const [perPage, setPerPage] = useState(6);
  const [loadding, setLoadding] = useState(true);
  const [tours, setTours] = useState([]);
  const [sticky, setSticky] = useState(localSticky);
  const [mounted, setMounted] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);

  // Get all tour's data and set local tour's data, loadding statu and loadmore button's state // --count=6
  const getTourData = () => {
    localSticky = sticky;
    setLoadding(true)
    fetch(tourURL + "&per_page=" + perPage + "&page=" + sticky, {
      method: 'get'
    }).then(res => res.json()).
      then(data => {
        setShowLoadMore(data.length >= 6);
        setLoadding(false);
        if (data.length) {
          tourData = [...tours, ...data];
          setTours(tourData);
        }
      })
  }

  // when first mounted, if there is local tour's data, set tour' data from it. if else, call getTourData() function and set tour's data. when sticky change, call getTourData() function and set tour's data
  useEffect(() => {
    if (sticky) {
      if (mounted) {
        getTourData();
      } else {
        if (tourData) {
          setTours(tourData);
          setLoadding(false);
        } else {
          getTourData();
        }
        setMounted(true);
      }
    }
  }, [sticky])

  return (
    <div className="tour_page">
      <Head>
        <title>Tour | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <p className="text-capitalize col-lg-4 col-md-6 col-sm-8 mb-3">Experience 180 years of diamond craftsmanship</p>
          <h1 className="title text-white col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5">
            Tours <span>in</span> Amsterdam
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section pt-5">
        <div className="row r-container pt-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">magical world of diamonds</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              Diamonds can be bought at any jeweler around the world. So why is Royal Coster Diamonds the most renowned diamond supplier for Royal families around the world for 180 years? We believe the reason for this is a combination of unparalleled craftsmanship and trust.</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start more tour section */}
      <div className="more-tour-section mb-5">
        <div className="title-panel pb-5">
          <h3 className="title mb-lg-5 text-center py-5 blue-text">More <span>Tours</span> & Experiences</h3>
        </div>
        <div className="tours-panel">
          <div className="r-container">
            <div className="row">
              {tours.length > 0 &&
                tours.map((tour, index) => {
                  return (
                    <div className="col-lg-4 col-md-6 tour-item px-3 mb-5" key={index}>
                     <Link
                      passHref={true}
                      href={{
                        pathname: "/tour/[slug]",
                        query: {
                          slug: tour.slug,
                        },
                      }}>
                        <a>
                          <div className="image-panel hover-scale round mb-4">
                            <img src={window.innerWidth > 575 ? tour.acf.landing.image.url : tour.acf.landing.image_mobile.url} className="tour-image" alt="tour-image" />
                          </div>
                        </a>
                      </Link>
                      <h3 className="title mb-4 blue-text">{renderHTML(tour.title.rendered)}</h3>
                      <p className="description mb-5">{renderHTML(tour.acf.overview.content)}</p>
                      <Link
                        passHref={true}
                        href={{
                          pathname: "/tour/[slug]",
                          query: {
                            slug: tour.slug,
                          },
                        }}>
                        <a className="more-detail text-uppercase mb-5 d-flex">More Details <RiArrowRightSFill className="ms-2" /></a>
                      </Link>
                    </div>
                  )
                })
              }
              {
                loadding && <>
                  <div className="col-lg-4 col-md-6 px-3 mb-5">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                  <div className="col-lg-4 col-md-6 px-3 mb-5 d-md-block d-none">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                  <div className="col-lg-4 col-md-6 px-3 mb-5 d-lg-block d-none">
                    <div className="image-panel hover-scale round mb-4">
                      <Skeleton variant="rect" animation="wave" width="100%" height={250} />
                    </div>
                    <Skeleton variant="text" animation="wave" width="100%" height={50} />
                    <Skeleton className="mt-3" variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width="100%" height={30} />
                    <Skeleton variant="text" animation="wave" width={100} height={30} />
                  </div>
                </>
              }
            </div>
            {
              !loadding && showLoadMore &&
              <button className="btn btn-load text-uppercase blue-btn round-form px-5 py-3" onClick={() => { setSticky(sticky + 1) }}>Load More</button>
            }
          </div>
        </div>
      </div>
      {/* End more tour section */}

      {/* Start banner section */}
      <div className="banner-section r-container round row mt-5 mb-4">
        <div className="text-panel col-lg-7 col-12 p-0 p-md-5 p-sm-3">
          <h3 className="title text-capitalize px-5 pt-5 mb-5">Great For Events: The Champagne Diamond Surprise</h3>
          <div className="description mb-5 pb-5 px-5">
            <p className="mb-5">If you are looking for a sparkling exciting addition to any event; the Champagne Surprise is perfect for you. Every guest gets a glass of champagne with a little sparkling stone inside. But is it a real diamond or a fake one?</p>
            <p className="mb-0">Our diamond polishers will check each stone closely with a diamond loupe and reveal who is the lucky winner.</p>
          </div>
          <button className="btn pink-btn round-form ms-5 mb-5 text-uppercase py-3 px-5"
            data-bs-toggle="modal"
            data-bs-target="#appointment">BOOK APPOINTMENT</button>
        </div>
        <div className="bg-panel col-lg-5 col-12 order-first order-lg-last"></div>
      </div>
      {/* End banner section */}

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
