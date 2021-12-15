import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import NumberFormat from "react-number-format";
import AppointmentModal from "../components/appointmentModal";
import renderHTML from "react-render-html";
import Instagram from "../components/instagram";
import WatchItems from "../components/watchItems";
import ReCAPTCHA from "react-google-recaptcha";
import {
  RiArrowRightSFill,
  RiMailFill,
  RiPhoneFill,
  RiWhatsappFill,
  RiDvdFill,
} from "react-icons/ri";

const noteData = [
  "Monday: 9: 00 AM – 5: 00 PM",
  "Tuesday: 9: 00 AM – 5: 00 PM",
  "Wednesday: 9: 00 AM – 5: 00 PM",
  "Thursday: 9: 00 AM – 5: 00 PM",
  "Friday: 9: 00 AM – 5: 00 PM",
  "Saturday: 9: 00 AM – 5: 00 PM",
  "Sunday: 9: 00 AM – 5: 00 PM",
];
const siteKey = "6LcvJusZAAAAABVe3KGyV2ai1rWBYLhFDZaZjMut";

const steps = [
  {
    step: "Step 1.",
    title: "Shop",
    description:
      "When paying for your purchases, you receive a Global Blue Tax Free Form from the sales staff who helped you.",
  },
  {
    step: "Step 2.",
    title: "Stamp",
    description:
      "At the airport or port, go to the Customs desk and present your completed Tax Free Form, passport, receipts and purchases to get a stamp on your form.",
    items: [
      {
        question: "Where to get your stamp?",
        answers: [
          "Note that you can only claim your tax refund at the last European (air)port from your trip back. Example: if you have a direct flight from Amsterdam to the USA, then you need to get your stamp in Amsterdam.",
        ],
      },
      {
        question: "Where to get your stamp with layovers?",
        answers: [
          "For example: If you fly from the Netherlands to the USA, but have a layover in France, you need to claim your stamp in France, not in the Netherlands.",
          "If you have a layover outside the European Union, you still need to get the stamp in Europe. For example: you have a flight from Amsterdam to Australia with a layover in China, you need to get your stamp at the Amsterdam Airport, not in China.",
        ],
      },
    ],
  },
  {
    step: "Step 3.",
    title: "Claim",
    description:
      "Go to the nearby Global Blue desk or office displaying a Global Blue logo. In some cases, this will be a currency exchange. Present your stamped, completed Tax Free Form and your travel passport to receive the refund in cash or to your credit card.",
    items: [
      {
        question: "Tax refund issues",
        answers: [
          "When these three steps are not followed correctly, this may cause a refund to be denied. We understand this can be extremely frustrating. Depending on the case, we may not be able to solve every tax refund issue. However, we highly value and appreciate you as our customer. Therefore, we will try to do our best to help you with your Tax Refund Issue. Please fill the form below and we get back to you shortly.",
        ],
      },
    ],
  },
];

const toursData = [
  {
    title: "Free Guided Diamond Factory Tour",
    description:
      "Our guided diamond factory tour is completely free of charge. We give free guided tours in more than 35 languages. Get your ticket today and discover the magical world of diamonds!",
    image: "/img/tour/tour-6.png",
  },
  {
    title: "Breakfast at Coster",
    description:
      "This year, Royal Coster Diamonds celebrates its 180th anniversary. But there is an extra reason for a party",
    image: "/img/tour/tour-7.png",
  },
  {
    title: "This is Sparkling Holland",
    description:
      "Come in for a Royal Experience at Royal Coster Diamonds and combine it with 'This is Holland'. Discover all the beautiful things the Dutch are so famous for.",
    image: "/img/tour/tour-5.png",
  },
];

export default function TaxRefund() {
  const handleSubmit = (e) => {
    e.preventDefault();
    var recapchaValue = grecaptcha.getResponse();
  };

  return (
    <div className="tax-refund_page">
      <Head>
        <title>Global Blue Tax Refund | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize mb-5">
            Tax Refund <br />
            Issues
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">
              difficulty in <span>refund?</span>
            </h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb0-4">
              For customers from outside the European Union, we offer a tax
              refund on their purchases. When you make a purchase, our diamond
              consultants or sales staff give you a detailed explanation on how
              to claim your tax refund. To claim your tax deduction, please make
              sure to do the 3 following steps on the right (desktop) or below
              (mobile).
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start form section */}
      <div className="form-section r-container py-5">
        <div className="row m-0 py-sm-5">
          <div className="col-md-4 p-0 pe-5">
            <h3 className="title blue-text">
              If you still experienced difficulties, please fill in the contact
              form.
            </h3>
          </div>
          <div className="col-md-8 p-0">
            <form name="contactForm" onSubmit={handleSubmit}>
              <div className="form-panel d-flex">
                <input
                  type="text"
                  name="name"
                  className="form-control round-form me-4 py-3 px-4"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control round-form  py-3 px-4"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="form-panel d-flex mt-4">
                <input
                  type="text"
                  name="country"
                  className="form-control round-form  py-3 px-4 me-4"
                  placeholder="Your country"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control round-form  py-3 px-4"
                  placeholder="Your phone number"
                  required
                />
              </div>
              <input
                type="text"
                name="tax"
                className="form-control round-form  py-3 px-4 mt-4"
                placeholder="Tax Free Form Number (DOC ID: 16 or 20 digits found under barcode on form)"
                required
              />
              <input
                type="text"
                name="date"
                className="form-control round-form  py-3 px-4 mt-4"
                placeholder="Date of purchase ( DD/MM/YY )"
              />
              <textarea
                name="message"
                className="form-control round-form  py-3 px-4 mt-4"
                rows="3"
                placeholder="Please tell us as detailed as possible what the issue is and how it occurred. We will get back to you shortly."
                required
              />
              <div className="form-group mt-4">
                <input
                  type="file"
                  name="file"
                  id="uploadFile"
                  className="form-control-file col-12"
                  required
                />
              </div>
              <ReCAPTCHA
                sitekey={siteKey}
                className="mt-4 d-flex justify-content-center"
              />
              <button className="btn blue-btn round-form text-uppercase py-3 mt-4">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* End form section */}

      {/* Start refund step section */}
      <div className="refund-step-section py-5">
        <div className="r-container">
          <div className="step-title py-5">
            <h3 className="title text-center blue-text mb-0">
              Tax <span>Refund</span>
              <br />
              Steps
            </h3>
          </div>
          <div className="step-panel py-5 row">
            {steps.map((step, index) => (
              <div className="col-md-4 mb-md-0 mb-5" key={index}>
                <h3 className="step text-uppercase mb-4">{step.step}</h3>
                <h3 className="title blue-text mb-4">{step.title}</h3>
                <p className="description text-capitalize">
                  {step.description}
                </p>
                {step.items &&
                  step.items.map((item, id) => (
                    <div className="question-panel" key={id}>
                      <h3 className="question mt-4">{item.question}</h3>
                      {item.answers.map((answer, key) => (
                        <p
                          className="answer text-capitalize mb-0 mt-4"
                          key={key}
                        >
                          {answer}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Start refund step section */}

      {/* Start booking section */}
      <div className="booking-section r-container py-md-5">
        <div className="booking-panel round row my-5">
          <div className="col-md-6">
            <div className="booking-list-panel py-4 px-md-5 px-4 round">
              <div className="title-panel d-flex justify-content-between align-items-center flex-lg-row flex-md-column flex-sm-row flex-column mb-5">
                <h3 className="title text-capitalize">Opening hours</h3>
                <div className="status py-2 px-4">CLOSED NOW</div>
              </div>
              <ul className="booking-list mb-0">
                {noteData.map((note, index) => (
                  <li className="mb-4" key={index}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6 mt-md-0 mt-5">
            <div className="direction-panel round py-4 px-md-5 px-4 d-flex flex-column">
              <div className="title-panel d-flex justify-content-between align-items-center flex-lg-row flex-md-column flex-sm-row flex-column mb-5">
                <h3 className="title text-capitalize">Direction</h3>
                <div className="status py-2 px-4">GET DIRECTION</div>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5967266461016!2d4.880994015994667!3d52.35959905585618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609ef0246f37f%3A0x3cc8701575536c70!2sRoyal%20Coster%20Diamonds!5e0!3m2!1sen!2sru!4v1632814327214!5m2!1sen!2sru"
                width="100%"
                className="p-0 round flex-fill google-map"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* End booking section */}

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
    </div>
  );
}
