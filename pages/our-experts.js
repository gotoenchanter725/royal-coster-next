import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";
import Link from "next/link";
import { RiFacebookCircleFill, RiLinkedinFill, RiInstagramFill } from "react-icons/ri"

const expertsData = [
  {
    image: "/img/ourExperts/expert1.png",
    name: "Kees Noomen",
    title: "CEO"
  },
  {
    image: "/img/ourExperts/expert2.png",
    name: "Robert Groot",
    title: "CCO"
  },
  {
    image: "/img/ourExperts/expert3.png",
    name: "Robert Groot",
    title: "CCO"
  },
  {
    image: "/img/ourExperts/expert1.png",
    name: "Kees Noomen",
    title: "CEO"
  },
  {
    image: "/img/ourExperts/expert2.png",
    name: "Robert Groot",
    title: "CCO"
  },
  {
    image: "/img/ourExperts/expert3.png",
    name: "Robert Groot",
    title: "CCO"
  },
]

export default function OurExperts() {

  return (
    <div className="our-experts_page">
      <Head>
        <title>Our Experts | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize mb-5 blue-text">
            Our <br /><span>Experts</span>
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Creative <br /><span>Crew</span> behind Coster</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              For customers from outside the European Union, we offer a tax refund on their purchases. When you make a purchase, our diamond consultants or sales staff give you a detailed explanation on how to claim your tax refund. To claim your tax deduction, please make sure to do the 3 following steps on the right (desktop) or below (mobile).
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start experts section */}
      <div className="experts-section r-container row pt-5">
        {
          expertsData.map((expert, index) =>
            <div className="col-md-4 col-sm-6 my-5" key={index}>
              <div className="expert-item round">
                <div className="image-panel hover-scale mb-3">
                  <img src={expert.image} alt="expert-photo" />
                </div>
                <h3 className="expert-name mb-4 px-4 blue-text">{expert.name}</h3>
                <h3 className="expert-title mb-4 pb-1 px-4">{expert.title}</h3>
                <div className="link-panel d-flex mb-4 px-4">
                  <Link href="#">
                    <a className="me-3"><RiFacebookCircleFill /></a>
                  </Link>
                  <Link href="#">
                    <a className="me-3"><RiLinkedinFill /></a>
                  </Link>
                  <Link href="#">
                    <a><RiInstagramFill /></a>
                  </Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
      {/* End experts section */}

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
