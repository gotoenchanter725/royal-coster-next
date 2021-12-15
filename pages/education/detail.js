import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Instagram from "../../components/instagram";
import { HiOutlineArrowLeft } from "react-icons/hi";

const educationData = [
  { image: '/img/education/about (1).png', title: "Loose Diamonds" },
  { image: '/img/education/about (2).png', title: "Engagement Rings" },
  { image: '/img/education/about (3).png', title: "Natural Gemstones" },
  { image: '/img/education/about (4).png', title: "Wedding Rings" },
  { image: '/img/education/about (5).png', title: "Fine Jewelry" },
  { image: '/img/education/about (6).png', title: "Watches" },
]

const typeBtns = [
  { name: "RING TYPES", value: "ring-types" },
  { name: "SETTING TYPES", value: "setting-types" },
  { name: "RING SIZING", value: "ring-sizing" },
  { name: "METALS", value: "metals" },
  { name: "BUDGET", value: "budget" },
  { name: "CHOOSE PERFECT RING", value: "choose-perfect-ring" },
  { name: "MANUFACTURING", value: "manufacturing" },
]

const detailData = [
  {
    image: "/img/education/detailitem-1.png",
    title: "Ring Types",
    description: "One of the most important steps in buying an engagement ring is determining your ring type. Royal Coster Diamodns offers a variety of engagement ring styles from classic solitaires to modern tension rings."
  },
  {
    image: "/img/education/detailitem-2.png",
    title: "Solitaire Engagement Rings",
    description: "A solitaire ring setting features a single stone, typically a diamond with a plain mounting (usually four or six prongs). Solitaires are one of the most popular engagement ring settings. Their appeal is in their elegance, simplicity, and timelessness. Solitaire engagement rings come in a variety of sizes and styles. Some have narrower bands which have the effect of making a smaller diamond appear larger, and compliment small fingers. Others have thicker bands which allow for more options in the way the diamond is set. Many solitaire rings have ring guards (or rings wraps) which frame the center diamond, making it appear more prominent."
  },
  {
    image: "/img/education/detailitem-3.png",
    title: "Pavé Engagement Rings",
    description: "A pavé engagement ring is encrusted with very small diamonds all along the band to give the appearance of a solid diamond surface. Because pave-set diamonds use only tiny beads or prongs to hold them in place, very little of the metal band shows through and the diamonds appear to be free-standing. Pave settings can either go around the whole band (full pave) or stop halfway around it (half pave). Micro pave rings are even more delicate and intricate than regular pave settings. The individual stones are so small that they appear to blend together and create extraordinary fire. Typically, round brilliant or princess cut diamonds are used as center stones in pave engagement rings. Most center stones are prong-set, basket-set or bezel-set."
  },
  {
    image: "/img/education/detailitem-4.png",
    title: "Channel Set Engagement Rings",
    description: "Channel set engagement rings feature side diamonds that are embedded into the channel groove of the ring. A thin strip of metal secures the diamonds in place—no prongs are used. The diamonds are flush with the band and as a result, channel set rings are sturdier than other designs and less likely to snag on clothing. Channel settings are available in gold and platinum, with a variety of diamond shapes and cuts. When it comes to picking the right channel stones for your channel ring, princess cut is a popular choice, as its square edges ensure no gaps between the stones."
  },
  {
    image: "/img/education/detailitem-5.png",
    title: "Sidestone Engagement Rings",
    description: "Sidestone engagement ring settings provide a perfect complement to a center stone and typically consist of a center diamond flanked by two or more smaller-sized side diamonds. Because sidestones add size and brilliance to the center diamond, they make the overall appearance of the engagement ring more impressive and radiant. When it comes to selecting a center diamond for an engagement ring with side stones, round brilliant or princess cut diamonds are typically chosen, although most diamond shapes can be used."
  },
  {
    image: "/img/education/detailitem-6.png",
    title: "Three-Stone Engagement Rings",
    description: "Three stone engagement rings consist of a center diamond flanked by two side diamonds, which accentuate the size and brilliance of the center diamond.The center stone is usually set higher to complement the side stones and add depth to the ring. Round or princess cut diamonds are the most popular choices for center stones. Most center stones are prong-set, basket-set or bezel-set, as these settings effectively distinguish the center diamond from the setting."
  },
]

export default function EducationDetail() {
  const [type, setType] = useState('ring-types');

  useEffect(() => {
    if (type) {
      console.log(type)
    }
  }, [type])

  return (
    <div className="education-detail_page">
      <Head>
        <title>Education Detail | Royal Coster</title>
      </Head>
      <Header />
      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel r-container py-3 d-sm-flex d-none align-items-center text-uppercase">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <Link passHref={true} href="/#">
            <a className="mx-2">EDUCATION</a>
          </Link>
          /
          <Link passHref={true} href="#">
            <a className="mx-2">Engagement Rings</a>
          </Link>
          -
          <span className="title ms-2 text-uppercase blue-text">
            Ring Types
          </span>
        </div>
        <div className="link-panel r-container py-3 mb-md-5 mb-0 d-sm-none d-flex align-items-center text-uppercase">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          ...
          <Link passHref={true} href="#">
            <a className="mx-2">Engagement Rings</a>
          </Link>
          -
          <span className="title ms-2 text-uppercase blue-text">
            Ring Types
          </span>
        </div>
      </div>
      {/* End state section */}

      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container row py-5">
          <div className="col-md-6 pt-5 pb-md-5 pe-md-5 mb-md-0 mb-5">
            <div className="round banner-image hover-scale me-md-5">
              <img src="/img/education/detail-banner.png" alt="detail-banner-image" />
            </div>
          </div>
          <div className="col-md-6 ps-md-5 text-panel d-flex justify-content-center flex-column">
            <h3 className="title blue-text ms-md-5">Engagement Rings</h3>
            <p className="description ms-md-5">One of the most important steps in buying an engagement ring is determining your ring type. Royal Coster Diamodns offers a variety of engagement ring styles from classic solitaires to modern tension rings.</p>
          </div>
        </div>
      </div>
      {/* End hero section */}
      {/* Start detail-section */}
      <div className="detail-section r-container py-5">
        <div className="btn-panel d-flex flex-wrap justify-content-between">
          {
            typeBtns.map((item, index) => {
              return (
                <button className={"btn btn-type px-0 py-2 " + (type == item.value && 'active')} key={index} onClick={() => setType(item.value)}>
                  {item.name}
                </button>
              )
            })
          }
        </div>
        <div className="detail-panel pt-5">
          {
            detailData.map((detail, index) => {
              return (
                <div className="detail-item row mb-5 m-0" key={index}>
                  <div className="col-md-5 mb-md-0 mb-5 p-0">
                    <div className="image-panel round hover-scale p-0">
                      <img src={detail.image} alt="detail-image" />
                    </div>
                  </div>
                  <div className="col-md-7 text-panel p-0 ps-md-5">
                    <h3 className="detail-title blue-text mb-4">
                      {detail.title}
                    </h3>
                    <p className="description">{detail.description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* End detail-section */}
      {/* Start Instagram section */}
      <Instagram />
      {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

    </div >
  );
}
