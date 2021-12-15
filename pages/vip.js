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
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";


const noteData = [
  "Monday: 9: 00 AM – 5: 00 PM",
  "Tuesday: 9: 00 AM – 5: 00 PM",
  "Wednesday: 9: 00 AM – 5: 00 PM",
  "Thursday: 9: 00 AM – 5: 00 PM",
  "Friday: 9: 00 AM – 5: 00 PM",
  "Saturday: 9: 00 AM – 5: 00 PM",
  "Sunday: 9: 00 AM – 5: 00 PM",
]

const cardData = [
  { title: "annual bonus", content: "You will receive an annual <strong>bonus</strong> that can be as much as <strong>10%</strong> on your total purchases at Royal Coster Diamonds. You will receive the bonus at the beginning of the year in the form of a <strong>bonus check.</strong>" },
  { title: "Discount on Purchase", content: "<strong>70%</strong> discount on the purchase of a Coster watch when purchasing a piece of jewelry worth more than <strong>450</strong> euros." },
  { title: "We Clean Jewelry for free", content: "Your jewelry is cleaned once a year for free." },
  { title: "Join Royal-for-a-day Program", content: "You can participate in our exclusive <strong>Royal-For-a-Day</strong> program where you can borrow a very exclusive piece of jewelry once a year." },
  { title: "Discounts & Tickets from partners", content: "Discounts on selected attractions and <strong>tickets</strong> from <strong>partners</strong> of The Diamond Priviledge Club." },
  { title: "Invite to special events", content: "Exclusive <strong>invitations</strong> to special events." },
  { title: "First to know", content: "Be the first to know about all <strong>promotions</strong> including our annual sale." },
]

export default function Vip() {

  return (
    <div className="vip_page">
      <Head>
        <title>VIP | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize mb-5 text-center">
            Our <span>Premium</span><br />rewards program
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">The Diamond Priviledge</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              We like to spoil our loyal customers with attractive extras. That is why The Diamond Priviledge Club was created. As a member of this exclusive club you benefit from attractive benefits.</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start benifit section */}
      <div className="benifit-section r-container pt-5">
        <div className="top-panel py-5">
          <div className="text-panel py-md-5">
            <h3 className="title text-capitalize text-center blue-text mb-4">Benifits of<br />been member</h3>
            <p className="description text-center dark-text mb-5">As a member of The Diamond Priviledge Club you<br className="d-sm-block d-none" />will receive the following perks forever:
            </p>
            <div className="btn-panel text-center">
              <button className="btn btn-join blue-btn text-uppercase px-5 py-3 round-form">join now</button>
            </div>
          </div>
        </div>
        <div className="card-panel row">
          {
            cardData.map((card, index) => {
              return (
                <div className="col-lg-4 col-md-6 mb-4 d-flex" key={index}>
                  <div className="round card-item p-4">
                    <h3 className="title blue-text text-capitalize">{card.title}</h3>
                    <p className="discription dark-text">{renderHTML(card.content)}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* End binifit section */}

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
