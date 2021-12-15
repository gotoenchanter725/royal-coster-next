import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import Schedule from "../components/schedule";
import AppointmentModal from "../components/appointmentModal";
import Instagram from "../components/instagram";
import Link from "next/link";

const shapeData = [
  {
    title: "Marlin Geo SQ",
    image: "/img/buying-guide/shape-image (1).png",
    description: "Gives more ‘sparkle’ than any other."
  },
  {
    title: "Princess",
    image: "/img/buying-guide/shape-image (2).png",
    description: "This cut is extremely versatile and looks stunning on a variety of rings."
  },
  {
    title: "Cushion",
    image: "/img/buying-guide/shape-image (3).png",
    description: "A squared shape with rounded corners, affording excellent light dispersion."
  },
  {
    title: "Oval",
    image: "/img/buying-guide/shape-image (4).png",
    description: "Oval have an elongated shape which can give the impression of a greater size."
  },
  {
    title: "Pear",
    image: "/img/buying-guide/shape-image (5).png",
    description: "This shape is attractively symmetrical, with a tapered point."
  },
  {
    title: "Emerald",
    image: "/img/buying-guide/shape-image (6).png",
    description: "A glamorous rectangular cut that shows off the clarity of the diamond."
  },
  {
    title: "Heart",
    image: "/img/buying-guide/shape-image (7).png",
    description: "The heart shape is a romantic and stylish choice that stands out."
  },
  {
    title: "Radiant",
    image: "/img/buying-guide/shape-image (8).png",
    description: "Has the most brilliance of all squared shapes."
  },
  {
    title: "Asscher",
    image: "/img/buying-guide/shape-image (9).png",
    description: "This shape is an elegant, Art Deco influenced shape."
  },
  {
    title: "Marquise",
    image: "/img/buying-guide/shape-image (10).png",
    description: "Was first commissioned by King Louis XV and elongates the finger."
  },
]

const guideData = [
  {
    title: "1. The Carat",
    description: [
      "Carat is the term used to determine the weight of the diamond. A carat can be divided into points, where one point is equal to 0.01 carats.",
      "It is important not to confuse carat weight with size, as the cut and shape of a stone can also alter the carat weight."
    ],
    image: "/img/diamond-buying-guide/image (1).png",
    url: "#"
  },
  {
    title: "2. The Colour",
    description: [
      "Diamond colour is graded according to the GIA colour scale, from D to Z. D is rated the most colourless, and therefore the most sought after and costly."
    ],
    image: "/img/diamond-buying-guide/image (2).png",
    url: "#"
  },
  {
    title: "3. The Clarity",
    description: [
      "The size of the impurities and imperfections determine the clarity grading of a diamond. Clarity grades run from Flawless (FL) to Slightly Included 2 (SI2). Try to pick a diamond where there are no inclusions visible upon close inspection with the naked eye (usually VS2 or higher)."
    ],
    image: "/img/diamond-buying-guide/image (3).png",
    url: "#"
  },
  {
    title: "4. The Cut",
    description: [
      "As the only characteristic not influences by nature, the cut if open to mistakes and bad practices. The cut determines the light dispersion of the diamond which has the greatest influence in overall appearance and sparkle."
    ],
    image: "/img/diamond-buying-guide/image (4).png",
    url: "#"
  },
  {
    title: "5. The Certification",
    description: [
      "Also known as a diamond grading report, diamond dossier or a diamond quality document. The report is created by gemmologists who evaluate the characteristics, value and identity of the diamond, which is confirmed within the certificate."
    ],
    image: "/img/diamond-buying-guide/image (5).png",
    url: "#"
  },
  {
    title: "6. The Contour",
    description: [
      "The contour of a diamond is essentially the shape of the diamond. It is also dictated by the ratio, which is the length divided by the width measurement. The bigger the ration, the longer and thinner the diamond shape."
    ],
    subTitle: "Length (1.50) divided by Width (1.0) = Length to width ratio (1.50)",
    image: "/img/diamond-buying-guide/image (5).png",
    url: "#"
  },
  {
    title: "7. The Cost",
    description: [
      "You don’t need to get the highest quality diamond to get something that is of equal beauty. The price will vary depending on the quality of diamonds in the market, the source of the diamond and where it was manufactured.",
      "Remember, you are buying something that is a great vessel of value, which can be passed along for many generations."
    ],
    url: "#"
  },
]


export default function DiamondBuyingGuide() {

  return (
    <div className="diamond-buying-guide_page">
      <Head>
        <title>Diamond Engagment Buying Guide | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-capitalize text-white mb-5">
            Diamond <br /><span>Buying</span> Guide
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">Will guide <br />you</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              When looking at
              <Link href={{
                pathname: "/shop",
                query: {
                  tags: "engagement",
                  productType: "rings"
                }
              }}>
                <a className="text-decoration-underline ms-2">engagement rings</a>
              </Link>
              , to avoid any awkward pauses when you pop the question and to ensure you are buying the right diamond for your future partner our diamond buying guide below will guarantee you have the diamond know how.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start main section */}
      <div className="main-section py-5">
        {
          guideData.map((data, index) =>
            <div className={"r-container guide-panel row py-5 my-md-5 " + (index && "top-border")} key={index}>
              <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
                <h3 className="title text-capitalize">{data.title}</h3>
              </div>
              <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
                {
                  data.description && data.description.map((item, id) =>
                    <p className="description mb-4 text-capitalize" key={id}>{item}</p>
                  )
                }
                {
                  data.subTitle &&
                  <p className="subTitle text-capitalize mb-4">{data.subTitle}</p>
                }
                {
                  data.image &&
                  <div className="image-panel mb-4 pe-5">
                    <img src={data.image} className="guide-image" alt="guide-image" />
                  </div>
                }
                <Link href="#">
                  <a className="round-form btn-learn-more text-uppercase py-3 px-5">
                    Learn More
                  </a>
                </Link>
              </div>
            </div>
          )
        }
      </div>
      {/* End main section */}

      {/* Start instagram section */}
      < Instagram />
      {/* End instagram section */}

      {/* Start Schedule section */}
      < Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      < Footer />
      {/* End Footer */}

      < AppointmentModal />

    </div >
  );
}
