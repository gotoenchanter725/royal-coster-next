import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import AnswerPanel from "../components/answerPanel";
import renderHTML from "react-render-html";
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";

const answersData = [
  {
    title: "How <span>do</span> we <br/><span>do</span> this?",
    answers: [
      {
        title: "Largest stock of loose diamonds in Europe",
        answer: "With 20.000 loose diamonds in stock, we have the biggest collection in Europe. If you're looking for that one special diamond, we can probably provide you with it!"
      },
      {
        title: "Our diamond jewelry is handmade inhouse",
        answer: "Our diamond polishers and goldsmiths polish and create the jewelry themselves. In their workshop they create the most fascinating and unique masterpieces."
      },
      {
        title: "Four monumental villas in the heart of Amsterdam",
        answer: "Discover something in every building! See how our craftsmen work on diamond jewelry and enter the world of diamonds in one of our luxurious showrooms."
      }
    ]
  },
  {
    title: "What does <br/><span>this</span> mean?",
    answers: [
      {
        title: "For every taste",
        answer: "Whatever style you prefer, you are in the right hands with us! From solitaire rings, to tennis bracelets and big statements pieces. We got it all. And if you still can't find that perfect jewel? Our craftsmen can easily create a one-of-a-kind piece for you."
      },
      {
        title: "The most trusted jeweller",
        answer: "Since 1840 many customers have trusted the craftsmen of Royal Coster for their jewelry. Among which royals from all over the world, such as Empress Sisi, King Rama V of Thailand and the Viceroy of China. We work with the highest quality diamonds and our diamond polishers are known for their expertise."
      },
      {
        title: "Countless satisfied customers",
        answer: "At Royal Coster we don't only sell diamonds and diamond jewelry, we create stories of happiness and love. We are proud and grateful to be a part of your love journey."
      }
    ]
  },
  {
    title: "What do <br/>you <span>get?</span>",
    answers: [
      {
        title: "Lifetime Guarantee",
        answer: "All jewels that have been bought with us deserve the best care possible. Is there a problem with your jewel or did it lose its sparkle? You are always welcome to visit us and together we will make sure you’ll leave as a happy customer with a sparkling bright jewel, as it's supposed to!"
      },
      {
        title: "Worldwide Delivery.",
        answer: "From Amsterdam to anywhere in the world! We will do anything to make sure that your beloved jewel will end upon your finger, no matter where you are."
      },
      {
        title: "14 Day Returns Policy.",
        answer: "Are you unsure about your purchase? All our jewels have a 14 day returns policy. This also includes custom made jewelry or jewelry that was personalized."
      },
    ]
  }
]

export default function WhyRoyalCoster() {

  return (
    <div className="why-royal-coster_page">
      <Head>
        <title>Why Royal Coster | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5">
            Why <span>Royal</span> Coster
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">we go Beyond Expectations.</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              The world’s oldest and most trusted diamond factory has a rich and compelling history. Royal Coster Diamonds is around for a long time, dating back all the way to at least 1840. </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start our value section */}
      <div className="our-value-section r-container py-md-5">
        <h1 className="title py-5 my-md-5 blue-text text-center">Our <span>Core</span><br />Values</h1>
        <div className="idea-panel round text-center p-5">
          <img className="mark-image mb-5" src="/img/common/mobile_logo.png" alt="mark-image" />
          <div className="text-panel d-flex justify-content-md-evenly justify-content-between flex-wrap flex-sm-row flex-column text-start">
            <p><span>C</span>raftsmanship</p>
            <p><span>O</span>penness</p>
            <p><span>S</span>upportive</p>
            <p><span>T</span>rustworthy</p>
            <p><span>E</span>xceptional</p>
            <p><span>R</span>oyal</p>
          </div>
        </div>
        <div className="top-pink-box" />
        <div className="bottom-blue-box" />
        <div className="bottom-pink-box" />
      </div>
      {/* End our value section */}

      {/* Start passport section */}
      <div className="passpost-section text-white py-5">
        <div className="r-container py-md-5 d-flex justify-content-between flex-column flex-md-row align-items-md-center">
          <h3 className="title mb-4 mb-md-0">The Royal Coster Passport explains our core values. These three values are:</h3>
          <ul className="ms-md-0 ms-5">
            <li>Flexible</li>
            <li>Family & Connection</li>
            <li>Dedication & Service</li>
          </ul>
        </div>
      </div>
      {/* End passport section */}

      <AnswerPanel data={answersData[0]} />

      <div className="middle-answer-panel">
        <AnswerPanel data={answersData[1]} />
      </div>

      <AnswerPanel data={answersData[2]} />

      {/* Start foundation section */}
      <div className="foundation-section">
        <div className="r-container pt-md-5 pb-5 row">
          <div className="text-panel my-5 pe-md-5 col-md-5 col-lg-3">
            <h3 className="title blue-text mb-5 text-capitalize">foundation of <span>Coster.</span></h3>
            <p className="mb-0">These guiding principles are the foundation of COSTER.Our mission is to go Beyond Expectations.</p>
          </div>
          <div className="book-panel round d-flex justify-content-center align-items-center">BOOK</div>
        </div>
      </div>
      {/* End foundation section */}

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
