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
import { BsDot } from "react-icons/bs"
import { RiArrowRightSFill, RiMailFill, RiPhoneFill, RiWhatsappFill, RiDvdFill } from "react-icons/ri";

const settingData = [
  {
    title: "Vacature Stagiair(e) Online Marketing & E-Commerce",
    items: [
      "Manufacturing",
      "netherland, Amsterdam",
      "POSTED : August 24, 2020"
    ]
  },
  {
    title: "Vacature Graphic Designer",
    items: [
      "Manufacturing",
      "netherland, Amsterdam",
      "POSTED : August 24, 2020"
    ]
  },
  {
    title: "Job Opening Internship Video & Photography",
    items: [
      "Manufacturing",
      "netherland, Amsterdam",
      "POSTED : August 24, 2020"
    ]
  },
]

export default function Internships() {

  return (
    <div className="internships_page">
      <Head>
        <title>Jobs & Internships | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white col-lg-4 col-md-6 col-sm-8 text-capitalize mb-5">
            Join Our <span>Royal</span> Team
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section py-5">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">A Brilliant Career Ahead</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              At Royal Coster Diamonds, there are many facets to our diamond family. From sales executives to jewellery craftsmen, from technology to design we have many roles that keep the company moving. We are always looking for talented and motivated people to join our family. Don't see a relevant role advertised? Contact us anyway to see if we can find a role for you</p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start hire section */}
      <div className="hire-section r-container pt-5">
        <h3 className="py-md-5 mt-5 title">We’re Hiring!</h3>
        <div className="form-panel d-flex flex-md-row flex-column align-items-md-center round py-2 pe-2 mb-5">
          <input type="text" className="px-5 py-3 mb-md-0 mb-4 form-control keyword-input" placeholder="KEYWORD" />
          <input type="text" className="px-5 py-3 mb-md-0 mb-4 form-control location-input" placeholder="LOCATION" />
          <button className="btn blue-btn round-form px-5 py-3 text-uppercase">search</button>
        </div>
        {
          settingData.map((setting, index) => {
            return (
              <div className="setting-panel d-flex flex-md-row flex-column justify-content-md-between justify-content-center round mb-4 p-5 align-items-md-center" key={index}>
                <div className="text-panel">
                  <h3 className="setting-title text-md-start text-center blue-text mb-4">{setting.title}</h3>
                  <p className="text-uppercase d-flex flex-sm-row flex-column justify-content-md-start justify-content-center align-items-center">
                    {setting.items.map((item, id) =>
                      id ? <span className="d-flex flex-sm-row flex-column align-items-center">< BsDot className="mx-3" />{item}</span> : <span>item</span>
                    )}
                  </p>
                </div>
                <button className="btn btn-apply round-form px-5 py-3 blue-text">APPLY</button>
              </div>
            )
          })
        }
      </div>
      {/* End hire section */}

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
