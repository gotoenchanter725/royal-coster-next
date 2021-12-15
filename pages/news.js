import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import renderHTML from "react-render-html";
import WatchItems from "../components/watchItems";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Skeleton from "@mui/material/Skeleton";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";

const descritionData = [
  {
    title: "How we Guarantee Our Diamonds are Untainted",
    image: "/img/news/image-2.png",
  },
  {
    title: "Our In-House Sustainability is a Team Effort",
    image: "/img/news/image-3.png",
  },
  {
    title: "Interview with CEO Kees Noomen about Corporate Responsibilty",
    image: "/img/news/image-4.png",
  },
  {
    title: "How we Guarantee Our Diamonds are Untainted",
    image: "/img/news/image-2.png",
  },
  {
    title: "Our In-House Sustainability is a Team Effort",
    image: "/img/news/image-3.png",
  },
  {
    title: "Interview with CEO Kees Noomen about Corporate Responsibilty",
    image: "/img/news/image-4.png",
  },
]

const sliderData = [
  {
    image: "/img/news/logo1.png",
    description: "“77 DIAMONDS IS HELPING THE JEWELRY INDUSTRY BE MORE ETHICAL AND INNOVATIVE”",
  },
  {
    image: "/img/news/logo2.png",
    description: "“77 DIAMONDS IS HELPING THE JEWELRY INDUSTRY BE MORE ETHICAL AND INNOVATIVE”",
  },
  {
    image: "/img/news/logo3.png",
    description: "“77 DIAMONDS IS HELPING THE JEWELRY INDUSTRY BE MORE ETHICAL AND INNOVATIVE”",
  },
  {
    image: "/img/news/logo1.png",
    description: "“77 DIAMONDS IS HELPING THE JEWELRY INDUSTRY BE MORE ETHICAL AND INNOVATIVE”",
  },
]

const blogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/blogs?orderby=id&per_page=7&categories=";
const categoryURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories?search=news";
let localBlog;

SwiperCore.use([Autoplay, Navigation]);

export default function News({ blogData }) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [blog, setBlog] = useState(blogData);

  useEffect(() => {
    if (localBlog) {
      setBlog(localBlog)
    } else {
      fetch(categoryURL, {
        method: "get"
      }).then(res => res.json())
        .then(category => {
          fetch(blogURL + category[0].id, {
            method: "get"
          }).then(res => res.json())
            .then(data => {
              localBlog = data;
              setBlog(localBlog)
            })
        })
    }
  }, [])

  return (
    <div className="news_page">
      <Head>
        <title>New & Press | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white col-lg-6 col-sm-8 text-capitalize mb-5">
            News <span>&</span> <br />Press
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize pe-lg-5">In the press around the world</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              At Royal Coster Diamonds, there are many facets to our diamond family. From sales executives to jewellery craftsmen, from technology to design we have many roles that keep the company moving. We are always looking for talented and motivated people to join our family. Don't see a relevant role advertised? Contact us anyway to see if we can find a role for you</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start Description section */}
      <div className="description-section r-container py-5 my-md-5">
        <div className="main-panel row m-0 mb-5 align-items-center">
          <div className="image-panel col-lg-7 p-0 round mb-5 mb-lg-0">
            {
              blog && blog[0] ?
                <img src={blog[0].acf.featured_image.sizes.large} alt="news-image" />
                : <Skeleton variant="rect" height={350} width="100%" />

            }
          </div>
          {
            blog && blog[0] ?
              <div className="col-lg-5 p-0 ps-lg-5 text-panel">
                <Link passHref={true} href={"/blog/" + blog[0].slug}>
                  <a className="title blue-text">{renderHTML(blog[0].title.rendered)}</a>
                </Link>
                <p className="mt-md-5 mt-4 mb-4">{renderHTML(blog[0].acf.content.intro)}</p>
              </div>
              : <div className="col-lg-5 p-0 ps-lg-5 ">
                <Skeleton variant="text" height={40} width="100%" className="mb-3" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
          }
        </div>
        {
          blog ?
            <div className="sub-panel row pb-lg-5">
              {
                blog.length > 1 ?
                  blog.map((item, index) => {
                    return (
                      index > 0 &&
                      <div className="col-lg-4 col-md-6 mb-lg-0 mb-5" key={index}>
                        <div className="hover-scale round mb-4">
                          <img src={item.acf.featured_image.sizes.large} alt="description-image" />
                        </div>
                        <h3 className="mb-4 title blue-text">{renderHTML(item.title.rendered)}</h3>
                        <Link passHref={true} href={"/blog/" + item.slug}>
                          <a className="more-detail text-uppercase mb-5 d-flex">More Details <RiArrowRightSFill className="ms-2" /></a>
                        </Link>
                      </div>
                    )
                  })
                  : <h3 className="empty-text text-center">No result</h3>
              }
            </div>
            : <div className="row">
              <div className="col-lg-4 col-md-6 mb-5">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
              <div className="col-lg-4 col-md-6 mb-5">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
              <div className="col-lg-4 col-md-6 mb-5 d-none d-md-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
              <div className="col-lg-4 col-md-6 mb-5 d-none d-md-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
              <div className="col-lg-4 col-md-6 mb-5 d-none d-lg-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
              <div className="col-lg-4 col-md-6 mb-5 d-none d-lg-block">
                <Skeleton variant="rect" height={250} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
              </div>
            </div>
        }
      </div>
      {/* End Description section */}

      {/* Start sponsorship section */}
      {/*<div className="sponsorship-section">
        <div className="title-panel">
          <div className="r-container py-5 d-flex align-items-center justify-content-between flex-md-row flex-column">
            <h3 className="title  mb-4 py-5 blue-text col-lg-5 col-md-6 text-capitalize">What <span>they</span> <br className="d-none d-md-block" />say</h3>
            <div className="btn-bottom-panel text-center">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
        </div>
        <div className="tours-panel">
          <div className="row r-container">
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              className="mySwiper"
              breakpoints={{
                996: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2.5,
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
                sliderData.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="info-box border round p-4">
                        <div className="image-panel mb-4">
                          <img src={item.image} className="logo-image" alt="logo-image" />
                        </div>
                        <p className="description blue-text text-lowercase">{item.description}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>*/}

      {/* End more tour section */}

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
