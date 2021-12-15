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
import { RiMailFill, RiPhoneFill, RiWhatsappFill, RiMessengerFill } from "react-icons/ri";


const noteData = [
  "Monday: 9: 00 AM – 5: 00 PM",
  "Tuesday: 9: 00 AM – 5: 00 PM",
  "Wednesday: 9: 00 AM – 5: 00 PM",
  "Thursday: 9: 00 AM – 5: 00 PM",
  "Friday: 9: 00 AM – 5: 00 PM",
  "Saturday: 9: 00 AM – 5: 00 PM",
  "Sunday: 9: 00 AM – 5: 00 PM",
]

export default function ContactUs() {

  return (
    <div className="contactus_page">
      <Head>
        <title>Contact Us | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <p className="text-capitalize mb-0">180 years of experience at your service</p>
          <h1 className="title text-white text-capitalize mb-5">
            Contact a diamond<br />consultant
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Get in touch</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              Couldn’t find what you were looking for? Tell us your wishes as detailed as possible and a diamond consultant will get in touch with you shortly.
            </p>
            <p className="guide-text mb-4">
              For questions about gifting and jewelry, contact a sales professional. For engagement guidance, contact a diamond consultant.
            </p>
            <p className="guide-text mb-0">
              You can also fill out the form below and we will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start ask section */}
      <div className="ask-section">
        <div className="r-container ask-main-panel round row p-md-5 p-4">
          <form className="col-md-6 p-md-4 mt-md-0 mt-5 p-0">
            <h3 className="title mb-5">Ask Us Anything</h3>
            <input type="text" className="form-control p-4 mb-4 round-form" id="exampleFormControlInput1" placeholder="Your Name*" />
            <input type="email" className="form-control p-4 mb-4 round-form" id="exampleFormControlInput1" placeholder="Email Address*" />
            <input type="email" className="form-control p-4 mb-4 round-form" id="exampleFormControlInput1" placeholder="Phone Number*" />
            <textarea className="form-control p-4 mb-4 round-form" id="exampleFormControlTextarea1" placeholder="Message" rows="3"></textarea>
            <button className='btn blue-btn round-form px-4 py-2 text-uppercase'>submit</button>
          </form>
          <div className="col-md-6 ps-md-4 p-0 mt-0 order-md-last order-first">
            <div className="link-panel p-md-5 p-3 round d-flex justify-content-between">
              <Link href="mailto:support@costerdiamonds.com">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiMailFill />
                  </div>
                </a>
              </Link>
              <Link href="tel:0203055555">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiPhoneFill />
                  </div>
                </a>
              </Link>
              <Link href="https://www.facebook.com/RoyalCosterDiamonds">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiMessengerFill />
                  </div>
                </a>
              </Link>
              <Link href="https://wa.me/31629705658">
                <a>
                  <div className="rounded-circle d-flex justify-content-center align-items-center">
                    <RiWhatsappFill />
                  </div>
                </a>
              </Link>
            </div>
            <div className="note-panel round mt-4 py-5 px-md-5 px-4">
              <h3 className="title text-uppercase mb-5">open now</h3>
              {
                noteData.map((note, index) => {
                  return (
                    <p key={index} className={"m-0 " + (index != 0 && "mt-4")}>{note}</p>
                  )
                })
              }
              <div id="direction" />
            </div>
          </div>
        </div>
      </div>
      {/* End ask section */}
      <div className="map-section r-container round p-5 mt-5">
        <h3 className="title mt-md-5 mb-5 blue-text">Direction</h3>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5967266461016!2d4.880994015994667!3d52.35959905585618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609ef0246f37f%3A0x3cc8701575536c70!2sRoyal%20Coster%20Diamonds!5e0!3m2!1sen!2sru!4v1632814327214!5m2!1sen!2sru" width="100%" height="450" className="p-0 round mb-md-5" allowFullScreen="" loading="lazy"></iframe>
      </div>

      {/* Start banner section */}
      <div className="banner-section r-container round row mt-5 mb-4">
        <div className="text-panel col-lg-6 col-12 p-0 p-md-5 p-sm-3">
          <h3 className="title text-capitalize px-5 pt-5 mb-5">Our Diamond<br /><span>Consultants</span></h3>
          <div className="description mb-5 px-5">
            <p>Our Diamond Consultants are highly trained and experienced experts in the field of diamonds, diamond jewelry, fashion and trends.</p>
            <p>Schedule a call with a Diamond Consultant to help you choose an engagement ring, wedding bands or that unique anniversary gift.</p>
          </div>
          <button className="btn pink-btn round-form ms-5 mb-5 text-uppercase py-3 px-5"
            data-bs-toggle="modal"
            data-bs-target="#appointment">BOOK APPOINTMENT</button>
        </div>
        <div className="bg-panel col-lg-6 col-12 order-first order-lg-last"></div>
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
