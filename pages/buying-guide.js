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

const csData = [
  {
    title: "Carat",
    image: "/img/buying-guide/7cs-image (1).png",
    description: "A diamond's weight is measured in carats; the larger a diamond the more rare."
  },
  {
    title: "Carat",
    image: "/img/buying-guide/7cs-image (2).png",
    description: "The greater a diamond’s clarity, the more brilliant, valuable and rare it is."
  },
  {
    title: "Color",
    image: "/img/buying-guide/7cs-image (3).png",
    description: "A well cut or faceted diamond, scintillates with light, offering the greatest brilliance and value."
  },
  {
    title: "Clarity",
    image: "/img/buying-guide/7cs-image (4).png",
    description: "Diamonds are graded by colour, starting at D and moving through to Z, with D being the most colourless."
  },
  {
    title: "Certification",
    image: "/img/buying-guide/7cs-image (5).png",
    description: "A diamond grading report is a quality certification from an independent gem laboratory."
  },
  {
    title: "Cost",
    image: "/img/buying-guide/7cs-image (6).png",
    description: "It is important to buy a diamond that offers the best features but with a good mix of the first four Cs."
  },
  {
    title: "Contour",
    image: "/img/buying-guide/7cs-image (7).png",
    description: "The shape and dimensions of a diamond play a key role in its appearance in a ring."
  },
]

export default function BuyingGuide() {

  return (
    <div className="buying-guide_page">
      <Head>
        <title>Engagment Buying Guide | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-capitalize mb-5">
            Engagement <br />rings <span>buying <br />guide</span>
          </h1>
        </div>
      </div>

      {/* Start guide section */}
      <div className="guide-section">
        <div className="row r-container py-5">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">The <span>Perfect</span> <br />Ring</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text mb-4">
              Picking out 
              <Link href={{
                pathname: "/shop",
                query: {
                  tags: "engagement",
                  productType: "rings"
                }
              }}>
                <a className="text-decoration-underline mx-2">engagement rings</a>
              </Link>
              is an exciting step of your proposal, and it’s also one that many people find daunting. Yet the perfect ring for your partner is always out there and this guide will help you find it.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start ring size section */}
      <div className="ring-size-section horizontal-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0">
            <img src="/img/buying-guide/style-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">1. Ring style</h3>
            <p className="mb-4 description text-capitalize">The style and setting of the engagement ring’s band is just as important as the stone that will be set on it. The ring should reflect her personal style: you may want to choose something that matches the jewellery she already wears.</p>
            <p className="mb-0 description text-capitalize">It should also suit the shape of her fingers. As a general rule, smaller rings are more appropriate for younger people, while larger rings look best on mature hands. Rings with wide, horizontal stylings are well–suited to long, slender fingers, while shorter fingers call for more vertical designs. An elongated ring can also flatter more generously-proportioned hands.</p>
          </div>
        </div>
      </div>
      {/* End ring size section */}

      {/* Start diamond shape section */}
      <div className="diamond-shap-section grid-section grey-section py-5">
        <div className="r-container row pt-5 my-md-5">
          <h3 className="title blue-text mb-5">2. Diamond shape</h3>
          {
            shapeData.map((shape, index) =>
              <div className="shape-item col-lg-3 col-md-4 col-sm-6 mb-5" key={index}>
                <img width="120" height="120" className="mb-4" src={shape.image} alt="shape-image" />
                <Link href="#"><a className="item-title pt-2 mb-4">{shape.title}</a></Link>
                <p className="item-description text-capitalize mb-4">{shape.description}</p>
              </div>
            )
          }
        </div>
      </div>
      {/* End diamond shape section */}

      {/* Start cs section */}
      <div className="diamond-cs-section grid-section py-5">
        <div className="r-container row pt-5 my-md-5">
          <h3 className="title blue-text mb-5">2. Diamond shape</h3>
          {
            csData.map((item, index) =>
              <div className="cs-item col-lg-3 col-md-4 col-sm-6 mb-5" key={index}>
                <img className="mb-4" src={item.image} alt="cs-image" />
                <h3 className="item-title pt-2 mb-4">{item.title}</h3>
                <p className="item-description text-capitalize mb-4">{item.description}</p>
              </div>
            )
          }
        </div>
      </div>
      {/* End cs section */}

      {/* Start setting section */}
      <div className="setting-section horizontal-section grey-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0 order-md-last">
            <img src="/img/buying-guide/setting-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">4. Shape & Setting</h3>
            <p className="mb-4 description text-capitalize">
              The style and setting of the engagement ring’s band is just as important as the stone that will be set on it. The ring should reflect her personal style: you may want to choose something that matches the jewellery she already wears.
            </p>
            <p className="mb-0 description text-capitalize">
              It should also suit the shape of her fingers. as a general rule, smaller rings are more appropriate for younger people, while larger rings look best on mature hands. Rings with wide, horizontal stylings are well-suited to long, slender fingers, while shorter fingers call for more vertical designs. An elongated ring can also flatter more generously-proportioned hands.
            </p>
          </div>
        </div>
      </div>
      {/* End setting section */}

      {/* Start colour section */}
      <div className="colour-section horizontal-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0">
            <img src="/img/buying-guide/colour-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">5. Colours</h3>
            <p className="mb-4 description text-capitalize">
              An engagement ring is traditionally made from gold, although it doesn’t necessarily need to be gold in colour:
            </p>
            <p className="mb-4 description text-capitalize">
              White gold is just as popular for its understated, elegant appearance. Rose gold is also very attractive and lends the ring a unique look – or for an engagement ring that almost seems to glow from within, consider platinum.
            </p>
            <p className="mb-4 description text-capitalize">
              White (colourless) diamonds are the traditional choice for the stone, but again you should feel free to let your own instincts – and her style – influence the final decision. Pink diamonds, prized for their rarity, make an exceptional choice for a ring with a difference.
            </p>
          </div>
        </div>
      </div>
      {/* End colour section */}

      {/* Start size section */}
      <div className="size-section horizontal-section grey-section py-5">
        <div className="r-container row align-items-center py-5 my-md-5">
          <div className="col-md-6 image-panel px-md-5 mb-5 mb-md-0 order-md-last">
            <img src="/img/buying-guide/size-image.png" alt="style-image" />
          </div>
          <div className="col-md-6 px-md-5">
            <h3 className="title blue-text mb-4">6. Ring size</h3>
            <p className="mb-4 description text-capitalize">
              While it’s easy enough to have a ring adjusted if you don’t get it the right size the first time, it adds a special something if your intended can wear it right after your proposal!
            </p>
            <p className="mb-4 description text-capitalize">
              If you don’t know your partners ring size, contact our sales team and we can send you a free ring sizer in the post so you can check. Alternatively you can take one of her existing rings to a local jewellers to check.
            </p>
            <p className="mb-4 description text-capitalize">
              If this isnt an option, try asking a friend or relative if they know her ring size. And if they don’t know, don’t despair – try (carefully!) measuring the diameter of your partner’s ring finger with a piece of string while she’s asleep.
            </p>
          </div>
        </div>
      </div>
      {/* End size section */}

      {/* Start finally section */}
      <div className="finally-section r-container text-center py-5">
        <div className="text-panel mx-auto py-5 my-md-5">
          <h3 className="title blue-text">And Finally...</h3>
          <p className="description py-5 text-capitalize">There’s a lot to consider when buying an engagement ring – but we hope this guide has helped you to arrive at a decision that you’re both happy with.</p>
          <p className="sub-title mb-0 text-capitalize">All that remains is for us to wish you all the best of luck with your proposal!</p>
        </div>
      </div>
      {/* End finally section */}

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
