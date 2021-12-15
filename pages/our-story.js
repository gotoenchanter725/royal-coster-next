import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import { RiPlayCircleFill, RiPlayFill } from "react-icons/ri";
import AboutSlider from "../components/aboutSlider";

let articleSlides = [
  {
    img: "article-1.png",
    title: "How we cut the Koh-I-Noor for the Queen of England",
    description:
      "In 1852, our Master Polishers Fedder and Voorzanger went to London to repolish...",
    moreDetail: true,
  },
  {
    img: "article-2.png",
    title: "How we Polished the Famous Star of the South Diamond",
    description:
      "Presumably the first diamond from Brazil to receive international fame. We turned ...",
    moreDetail: true,
  },
  {
    img: "article-3.png",
    title: "How we Created Queen Juliana’s Diamond Watch",
    description:
      "Our connection with the Dutch Royal House is one we treasure deeply. So...",
    moreDetail: true,
  },
];
let famousSlides = [
  {
    img: "famous-1.png",
    title: "The Story of King Willem III",
  },
  {
    img: "famous-2.png",
    title: "The Story of Sisi",
  },
  {
    img: "famous-3.png",
    title: "The Story of King Rama V",
  },
];
let buySlides = [
  {
    img: "buy-1.png",
    title: "Why buy a Diamond?",
  },
  {
    img: "buy-2.png",
    title: "What is a Diamond Certificate?",
  },
  {
    img: "buy-3.png",
    title: "Our VIP Service",
  },
];
let educationItems = [
  { img: "education-1.png", title: "Brief History of Diamonds" },
  { img: "education-2.png", title: "The Story of Sisi" },
  { img: "education-3.png", title: "The Story of King Rama V" },
  { img: "education-4.png", title: "Brief History of Diamonds" },
  { img: "education-5.png", title: "The Story of Sisi" },
  { img: "education-6.png", title: "The Story of King Rama V" },
  { img: "education-7.png", title: "Brief History of Diamonds" },
  { img: "education-8.png", title: "The Story of Sisi" },
];
export default function OurStory() {
  return (
    <div className="about_page">
      <Head>
        <title>OurStory | Royal Coster</title>
      </Head>
      <Header page="about" />
      {/* Start hero section */}
      <div className="hero-section"></div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section py-md-5">
        <div className="row r-container py-5">
          <div className="col-md-5 col-12 p-0 pe-md-5 py-5">
            <h3 className="title text-capitalize">
              Our legacy of 180 years of <span>diamond craftsmanship</span>
            </h3>
          </div>
          <div className="col-md-7 col-12 p-0 ps-md-5 ps-0 pt-md-5 pb-5">
            <p className="guide-text">
              The world’s oldest and most trusted diamond factory has a rich and
              compelling history. Royal Coster Diamonds is around for a long
              time, dating back all the way to at least 1840. Actually, Mr.
              Coster founded his company before that date, but we just cannot
              prove it. Therefore, we stick to what we do know. Let us tell you
              more about our eventful history. A few of our highlights are:
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start video section */}
      <div className="video-section">
        <div className="r-container">
          <div className="video-panel">
            <iframe className="responsive-iframe" src="https://www.youtube.com/embed/Bi5NxXIEjZg"></iframe>
          </div>
        </div>
      </div>
      {/* End video section */}

      {/* Start acticle section */}
      <div className="article-section r-container py-sm-5 mt-5">
        <div className="title-panel d-flex py-4 mb-5 justify-content-between">
          <h3 className="blue-text">Blogs & Articles</h3>
          <button className="btn text-uppercase d-sm-block d-none">
            Show ALL
          </button>
        </div>
        <AboutSlider slides={articleSlides} />
      </div>
      {/* End acticle section */}
      {/* Start famous section */}
      <div className="famous-section py-5 my-5">
        <div className="title-panel py-5">
          <div className="r-container mt-5 mb-sm-5">
            <h3 className="blue-text mb-sm-5">
              Famous Visitors &<br />
              Other <span>Milestones</span>
            </h3>
            <p>A million tales to tell</p>
          </div>
        </div>
        <div className="r-container">
          <AboutSlider slides={famousSlides} />
        </div>
      </div>
      {/* End famous section */}

      {/* Start facet section */}
      <div className="facet-section r-container mt-5">
        <div className="video-panel px-md-5 mx-md-5">
          <img
            src="/img/about/facet-video_img.jpg"
            className="video-image round-form"
            alt="video-image"
          />
          <RiPlayCircleFill className="btn-play" />
        </div>
        <div className="title-panel px-md-5 mx-md-5 pt-5">
          <h3 className="blue-text">
            The More Facets, More Sparkle, more Fire, The Royal 201
          </h3>
          <Link passHref={true}  href="#">
            <a className="text-uppercase d-flex align-items-center mt-5">
              More Details <RiPlayFill className="ms-3" />
            </a>
          </Link>
        </div>
      </div>
      {/* End facet section */}

      {/* Start education section */}
      <div className="education-section pt-5 mt-5">
        <div className="title-panel py-5">
          <div className="r-container py-5">
            <h3 className="blue-text">
              Diamond <span>Education</span>
            </h3>
            <p>Everything about that sparkling little stone</p>
          </div>
        </div>
        <div className="education-items d-sm-block d-none r-container">
          <div className="row">
            {educationItems.map((item, index) => {
              return (
                <Link passHref={true}  href="#" key={index}>
                  <a className="col-lg-4 col-6 mb-5">
                    <div>
                      <div className="image-panel hover-scale round">
                        <img
                          src={"/img/about/" + item.img}
                          alt="education-image"
                          className="education-image"
                        />
                      </div>
                      <h3 className="my-5">{item.title}</h3>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="r-container d-sm-none">
          <AboutSlider slides={educationItems} />
        </div>
      </div>
      {/* End education section */}

      {/* Start buy section */}
      <div className="buy-section py-5 my-5">
        <div className="title-panel py-5">
          <div className="r-container py-5">
            <h3 className="blue-text">Before you buy</h3>
            <p>Good to know</p>
          </div>
        </div>
        <div className="r-container mb-sm-5 pb-sm-5">
          <AboutSlider slides={buySlides} btnDisable={false} />
        </div>
      </div>
      {/* End buy section */}

      {/* Start legacy section */}
      <div className="legacy-section r-container mb-5 round">
        <div className="row m-0">
          <div className="col-lg-5 col-md-6 col-12 main-panel p-5">
            <h3 className="p-sm-5 pb-sm-5 pb-0">
              Discover our <span>Legacy</span>
            </h3>
            <p className="px-sm-5">
              From famous visitors to memorable celebrations. As a company that
              has been in business for 180 years, we've hit some serious
              milestones.
            </p>
            <button className="btn pink-btn mt-5 mx-sm-5 mb-sm-5 px-5 py-3 round-form">
              GO TO TIMELINE
            </button>
          </div>
          <div className="col-lg-7 col-md-6 col-12 p-0 image-panel order-md-last order-first"></div>
        </div>
      </div>
      {/* End legacy section */}

      {/* Start Schedule section */}
      <Schedule normalMode={true} />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
