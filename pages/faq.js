import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import renderHTML from "react-render-html";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";

const faqData = [
  {
    title: "General Information",
    items: [
      {
        question: "What is Royal Coster Diamonds?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "What are your opening hours?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Where are you located?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Are you focused on dutch visitors or international visitors?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Who is working there?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
    ]
  },
  {
    title: "Visiting Royal Coster Diamonds",
    items: [
      {
        question: "I am a tour leader, guide or work at a tour operator. Where can I find more information?",
        answer: [
          "We have warm contact with other attractions in Amsterdam, like canal cruise companies, museums and many more. We can arrange tickets to these attractions for you. You can find all these on our tour pages at <a href='http://www.royalcoster.com/tours'>www.royalcoster.com/tours.</a>",
          "Alternatively you can always contact our travel consultant for a tailored programm or just some advice. Email us for more information at <a href='mailto:tours@royalcoster.com'>tours@royalcoster.com</a>.",
          "Facebook Twitter LinkedIn"
        ]
      },
      {
        question: "Is there a way to combine my trip to Royal Coster with other activities in Amsterdam?",
        answer: [
           "We have warm contact with other attractions in Amsterdam, like canal cruise companies, museums and many more. We can arrange tickets to these attractions for you. You can find all these on our tour pages at <a href='http://www.royalcoster.com/tours'>www.royalcoster.com/tours.</a>",
          "Alternatively you can always contact our travel consultant for a tailored programm or just some advice. Email us for more information at <a href='mailto:tours@royalcoster.com'>tours@royalcoster.com</a>.",
          "Facebook Twitter LinkedIn"
        ]
      },
      {
        question: "Which tours, experiences and/or workshops do you offer?",
        answer: [
           "We have warm contact with other attractions in Amsterdam, like canal cruise companies, museums and many more. We can arrange tickets to these attractions for you. You can find all these on our tour pages at <a href='http://www.royalcoster.com/tours'>www.royalcoster.com/tours.</a>",
          "Alternatively you can always contact our travel consultant for a tailored programm or just some advice. Email us for more information at <a href='mailto:tours@royalcoster.com'>tours@royalcoster.com</a>.",
          "Facebook Twitter LinkedIn"
        ]
      },
      {
        question: "How can i contact you to book a our or describe my product wishes",
        answer: [
           "We have warm contact with other attractions in Amsterdam, like canal cruise companies, museums and many more. We can arrange tickets to these attractions for you. You can find all these on our tour pages at <a href='http://www.royalcoster.com/tours'>www.royalcoster.com/tours.</a>",
          "Alternatively you can always contact our travel consultant for a tailored programm or just some advice. Email us for more information at <a href='mailto:tours@royalcoster.com'>tours@royalcoster.com</a>.",
          "Facebook Twitter LinkedIn"
        ]
      },
      {
        question: "Do I need an appointment to visit you?",
        answer: [
           "We have warm contact with other attractions in Amsterdam, like canal cruise companies, museums and many more. We can arrange tickets to these attractions for you. You can find all these on our tour pages at <a href='http://www.royalcoster.com/tours'>www.royalcoster.com/tours.</a>",
          "Alternatively you can always contact our travel consultant for a tailored programm or just some advice. Email us for more information at <a href='mailto:tours@royalcoster.com'>tours@royalcoster.com</a>.",
          "Facebook Twitter LinkedIn"
        ]
      },
    ]
  },
  {
    title: "About our diamonds",
    items: [
      {
        question: "Are the diamonds you offer natural or lab grown",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Are your diamonds certified?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "What are the 4 C’s?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
    ]
  },
  {
    title: "Agents Only",
    items: [
      {
        question: "Are the diamonds you offer natural or lab grown",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Are your diamonds certified?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
    ]
  },
  {
    title: "What is Royal Coster Diamonds?",
    items: [
      {
        question: "Are the diamonds you offer natural or lab grown",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
      {
        question: "Are your diamonds certified?",
        answer: ["We are open from 9 AM to 5 PM, seven days a week, including Sundays. If you want to make an appointment outside regular opening hours, please contact us on +31(0)20 305 5555."]
      },
    ]
  },
]

export default function Faq() {

  return (
    <div className="faq_page">
      <Head>
        <title>FAQ | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize mb-5 blue-text">
            Frequently<br />Asked<br />Questions
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">At your <br /><span>service</span></h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              Our diamond <Link href="#"><a className="text-decoration-underline">consultants</a></Link> are standing by to help you find that specific diamond piece you're looking for. They take all your wishes into account, including your budget.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start question section */}
      <div className="question-section r-container py-5">
        <div className="row justify-content-end pt-sm-5 pb-5 ">
          <div className="col-md-8 search-panel d-flex flex-column flex-sm-row p-0">
            <input type="text" className="form-control round-form px-5 py-3 me-3" placeholder="Search our help center" />
            <button className="btn btn-search round-form blue-btn px-5 py-3 mt-4 mt-sm-0">Search</button>
          </div>
        </div>
        {
          faqData.map((data, index) =>
            <div className="row m-0 mb-5 question-panel" key={index}>
              <div className="col-md-4">
                <h3 className="title py-3">{data.title}</h3>
              </div>
              <div className="col-md-8">
                <div className="accordion accordion-flush">
                  {
                    data.items.map((item, id) =>
                      <div className="accordion-item" key={id}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed ps-0 blue-text"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#faq-" + index + "-" + id}
                          >
                            {item.question}
                          </button>
                        </h2>
                        <div
                        id={"faq-" + index + "-" + id}
                          className="accordion-collapse collapse"
                        >
                          <div className="accordion-body py-0">
                            {
                              item.answer.map((ans, key) =>
                                <p className="py-3 mb-0" key={key}>{renderHTML(ans)}</p>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
      {/* End question section */}


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
