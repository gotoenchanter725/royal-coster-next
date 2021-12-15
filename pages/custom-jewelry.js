import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import CraftingIdea from "../components/craftingIdea";
import Instagram from "../components/instagram";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";

const timeLineLists = [
  {
    title: "Share your idea",
    description:
      "Contact our design team to let us know what jewellery you would like to create. The more detailed your enquiry, the easier we can craft your dream jewellery piece. Once you agree to a design, our experts will offer you a quote on your bespoke piece.",
    image: "item-1.png",
  },
  {
    title: "Design your item.",
    description:
      "After settling a deposit fee, our team will start working on the fine details of your piece. This is a collaborative process between you and the designer. To better illustrate your vision, we can provide drawings, computer designs and mock-ups of the jewel. Our experts will not proceed to production until you are completely satisfied with the result.",
    image: "item-2.png",
  },
  {
    title: "Receive your dream jewellery.",
    description:
      "Contact our design team to let us know what jewellery you would like to create. The more detailed your enquiry, the easier we can craft your dream jewellery piece. Once you agree to a design, our experts will offer you a quote on your bespoke piece.",
    image: "item-3.png",
  },
];

let signatureSliders = [
  { url: "product-1.png" },
  { url: "product-2.png" },
  { url: "product-3.png" },
  { url: "product-4.png" },
];

SwiperCore.use([Autoplay, Navigation]);

export default function Bespoke() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    document.addEventListener("scroll", () => {
      if (document.querySelectorAll(".MuiTimelineItem-root"))
        document
          .querySelectorAll(".MuiTimelineItem-root")
          .forEach((element) => {
            if (
              element.offsetTop - element.offsetHeight < window.scrollY &&
              window.scrollY < element.offsetTop + element.offsetHeight
            ) {
              if (!element.classList.contains("active")) {
                element.classList.add("active");
              } else {
              }
            } else
              element.classList.contains("active") &&
                element.classList.remove("active");
          });
    });
  }, []);
  return (
    <div className="bespoke_page">
      <Head>
        <title>Bespoke | Royal Coster</title>
      </Head>
      <Header page="homepage" />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize">
            Expertly <span>crafted</span>.<br />
            Eternally yours.
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-sm-5 py-3">
          <div className="col-lg-3 col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">We will guide you</h3>
          </div>
          <div className="col-lg-9 col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text">
              For your jewellery to tell a story, sometimes it’s best you
              inspire the narrative. Craft your vision into reality through our
              outstanding bespoke service. From engagement rings, to wedding
              bands, to unique jewellery creations, our team of experts will
              guide you through the creative process of fine jewellery design.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start journey section */}
      <div className="journey-section py-5 r-container">
        <h3 className="title text-capitalize text-sm-center mt-sm-5 py-5">
          The <span>Journey</span>
          <br />
          of Jewel
        </h3>
        <Timeline className="time-line time-line-mobile d-lg-none d-block mb-0 pb-0 px-0">
          {timeLineLists.map((item, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot className={"line-dot-" + index} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <img
                    src={"/img/bespoke/" + item.image}
                    className="item-image mb-5"
                    alt="timeLine-image"
                    data-aos-duration={700}
                    data-aos-once={true}
                    data-aos={index % 2 == 1 ? "fade-right" : "fade-left"}
                  />
                  <div
                    className="text-panel mb-5 pb-5"
                    data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
                    data-aos-duration={400}
                    data-aos-once={true}
                  >
                    <p className="item-step m-0 pb-4 text-uppercase">
                      Step {index + 1}
                    </p>
                    <h3 className="item-title m-0 pb-5">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>

        <Timeline
          className="time-line d-lg-block d-none mb-0 pb-0"
          align="alternate"
        >
          {timeLineLists.map((item, index) => {
            return (
              <TimelineItem key={index}>
                <TimelineOppositeContent>
                  <div
                    className="text-panel"
                    data-aos={index % 2 == 0 ? "fade-right" : "fade-left"}
                    data-aos-duration={400}
                    data-aos-once={true}
                  >
                    <p className="item-step m-0 pb-4 text-uppercase">
                      Step {index + 1}
                    </p>
                    <h3 className="item-title m-0 pb-5">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot className={"line-dot-" + index} />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>
                    <img
                      src={"/img/bespoke/" + item.image}
                      className="item-image"
                      alt="timeLine-image"
                      data-aos-duration={700}
                      data-aos-once={true}
                      data-aos={index % 2 == 1 ? "fade-right" : "fade-left"}
                    />
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
        <div className="btn-panel text-center pb-5 mb-5">
          <button className="btn blue-btn round-form text-uppercase px-5 py-3 mb-5" data-bs-toggle="modal" data-bs-target="#enquiryModal">
            send an enquiry
          </button>
        </div>
      </div>
      {/* End journey section */}
      {/* Start signature section */}
      <div className="signature-section pt-sm-5">
        <div className="title-panel py-5">
          <div className="r-container">
            <div className="row mt-5 mx-0">
              <div className="col-md-6 p-0 pe-5 py-5">
                <h3 className="m-0 pe-lg-5 me-lg-5">
                  Royal Coster Signature Creations
                </h3>
              </div>
              <div className="col-md-6 p-0 ps-lg-5 pt-md-5 pb-5">
                <p className="m-0 ps-lg-5 ms-lg-5">
                  From contemporary pieces, to timeless designs, to simple
                  alterations, discover the artistry of fine craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-panel r-container">
          <Swiper
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            className="mySwiper"
            breakpoints={{
              1024: {
                slidesPerView: 4
              },
              996: {
                slidesPerView: 3.5,
              },
              768: {
                slidesPerView: 2,
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
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
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
            {signatureSliders.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link passHref={true} href="#">
                    <a>
                      <div className="image-panel round hover-scale">
                        <img
                          src={"/img/bespoke/" + item.url}
                          alt="category"
                        />
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="btn-bottom-panel mt-5">
            <button ref={navigationPrevRef} className="btn px-0 me-5">
              <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
            </button>
            <button ref={navigationNextRef} className="btn px-0">
              <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
            </button>
          </div>
        </div>
      </div>
      {/* End signature section */}
      {/* Start Help section */}
      <CraftingIdea />
      {/* End Help section */}

      {/* Start Instagram section */}
      <Instagram />
      {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
