import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";

const faqDeliveryList = {
  title: "FAQ on Delivery, Warranty & Returns",
  items: [
    "How long will my item take to arrive?",
    "How will my item be delivered?",
    "What about VAT and import duties?",
    "Can I receive my item any sooner?",
    "Can I have my item sent to another address?",
    "Can I collect my item from a showroom?",
    "Can I resize my ring?",
    "How do I return my item?"
  ]
}

const faqData = [
  {
    title: "How long will my item take to arrive?",
    items: [
      "At 77 Diamonds, we take time to meticulously craft, set and polish all items by hand in our workshop in Mayfair, following your exact specifications.",
      "Lead time for custom-made items:",
      "- Classic rings and jewellery will take 3 to 4 weeks to be completed. - Diamond - set rings and jewellery(such as halos, trilogies or vintage designs) will take 6 to 7 weeks to be completed.",
      "Customers in India usually receive their item within 5 to 7 working days, but delivery time may vary.You'll receive an exact delivery date once we send out your item.",
      "Need a faster delivery ? You can also opt for our quick- shipping engagement rings, or ready - to - wear jewellery:",
      "- Ready - to - wear rings and jewellery will take 8 to 12 working days to arrive. - Quick - shipping diamonds and engagement ring settings(custom - made) will take 3 to 8 days to be completed, and approximately 5 to 7 working days' delivery."
    ]
  },
  {
    title: "How will my item be delivered?",
    items: [
      "Once your item is ready, we will send it via international FedEx delivery service, fully insured and free of charge. For security reasons, there will be no indication of what the parcel contains. If you ordered your jewellery for a surprise proposal or gift, we assure you the item will be delivered discreetly at your convenience. Your jewellery will be beautifully wrapped and placed in luxurious packaging."
    ]
  },
  {
    title: "What about VAT and import duties?",
    items: [
      "As an overseas customer, you will be charged VAT on your item once it is received by a FedEx shipping agent. Your local VAT rate will apply. Depending on your country of residence, some import duties may also apply. For further details on how much you may be charged, please contact your local customs office or refer to our Tax and Duties Calculator."
    ]
  },
  {
    title: "Can I receive my item any sooner?",
    items: [
      "If you need your item urgently, our team can in some cases speed up the production process. Please contact us and we will be happy to accommodate your request if possible."
    ]
  },
  {
    title: "Can I have my item sent to another address?",
    items: [
      "Yes, we can deliver your item to an alternate address. For security reasons, we will need some additional identification and proof of address if the payment was made by a debit or credit card."
    ]
  },
  {
    title: "Can I collect my item from a showroom?",
    items: [
      "Orders can be collected from our showrooms in Germany, Switzerland and the UK. Please notify our team and we will put your item aside for collection. The person who paid for the order should be the one collecting it, and we will need to confirm your identity before handing over the item."
    ]
  },
  {
    title: "Can I resize my ring?",
    items: [
      "Of course! Getting the most comfortable fit can be difficult, especially when you are planning a surprise proposal. For this reason, we offer a complimentary ring resize within 30 days when you receive your item. Certain items such as full set eternity rings cannot be resized and will therefore need to be exchanged."
    ]
  },
  {
    title: "How do I return my item?",
    items: [
      "Orders can be returned within 30 days for a full refund, including VAT. Please note that engraved rings cannot be returned. For further details, please visit our Terms and Conditions.",
      'Instructions for returning your item will feature on your order confirmation. Our return address is listed as "Seventy Seven London" for insurance purposes. Before sending your item back, please notify our sales team by calling or emailing us at returns@77diamonds.com.'
    ]
  }
]

export default function Warranty() {

  return (
    <div className="warranty_page">
      <Head>
        <title>Warranty | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-capitalize mb-5 blue-text">
            Delivery,<br />Warranty &<br />Returns
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Fully <span>Insured</span></h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              By ordering at Coster Diamonds, you will receive your handcrafted jewellery beautifully wrapped and with all relevant documents, grading reports and <strong>warranties</strong> included. For your peace of mind, we offer a <strong>free</strong> and fully insured delivery service straight to your doorstep.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start text section */}
      <div className="text-section">
        <div className="faq-list-panel py-5">
          <div className="r-container">
            <h3 className="title mt-5">{faqDeliveryList.title}</h3>
            <ul className="blue-text mt-4 mb-5">
              {
                faqDeliveryList.items.map((item, index) =>
                  <li key={index}>
                    <a href={"#question" + index}>{item}</a>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        {
          faqData.map((data, index) =>
            <div id={"question" + index} className={"faq-panel py-5 " + (index % 2 == 0 && "bg-grey")} key={index}>
              <div className="r-container">
                <h3 className="title mt-5 mb-0">{data.title}</h3>
                <div className="answer-panel mb-5">
                  {
                    data.items.map((item, id) =>
                      <p className="mt-5 mb-0" key={id}>{item}</p>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
      {/* End text section */}

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
