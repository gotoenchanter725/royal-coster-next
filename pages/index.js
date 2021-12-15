import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";
import renderHTML from "react-render-html";
import Schedule from "../components/schedule";
import Collection from "../components/collection";
import Help from "../components/help";
import Instagram from "../components/instagram";

const url = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/pages/225800";
const heroGradientStyle =
  "linear-gradient(180deg, #01215c 0%, rgba(1, 33, 92, 0) 50%),";
let localData;

export async function getStaticProps() {
  let data = {};
  if (localData) {
    data = localData;
  } else {
    const res = await fetch(url, {
      method: "get",
    });
    data = await res.json();
    localData = data;
  }
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [windowWidth, setWindowWidth] = useState();
  const heroData = data.acf.landing.slider[0];
  const productData = data.acf.product_row;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <div className="homepage">
      <Head>
        <title>Home | Royal Coster</title>
      </Head>

      <Header page="homepage" />
      {/* Start hero section */}
      <div
        className="hero"
        style={{
          backgroundImage:
            heroData?.mobile.image && windowWidth && windowWidth < 576
              ? heroGradientStyle + "url(" + heroData.mobile.image.url + ")"
              : heroData &&
                heroGradientStyle + "url(" + heroData.image.url + ")",
        }}
      >
        {heroData.mobile.video && (
          <video
            autoPlay="autoplay"
            loop="loop"
            muted
            defaultmuted="defaultmuted"
            playsInline
            onContextMenu={() => false}
            vvsd
            preload="auto"
            className="d-block d-sm-none bg_video"
          >
            <source src={heroData.mobile.video.url} type="video/mp4" />
          </video>
        )}
        {heroData && (
          <div className="r-container d-none d-sm-flex flex-column">
            <div className="text-panel col-lg-6 col-md-8 col-sm-10 col-12">
              <h1 className="text-capitalize text-left">
                {heroData.title && renderHTML(heroData.title)}
              </h1>
              <p className="mt-4 mb-5 pt-2">
                {heroData.sub_title && renderHTML(heroData.sub_title)}
              </p>
            </div>
            <div className="btn-panel">
              {heroData.button && (
                <Link href={heroData.button.url}>
                  <a className="btn rainbow-btn dark-btn round-form px-5 py-3 me-3 mt-5">
                    {heroData.button.title}
                  </a>
                </Link>
              )}
              {heroData.button2 && (
                <Link href={heroData.button2.url}>
                  <a className="btn blue-outline-btn shop-now-btn round-form px-5 py-3 mt-5">
                    {heroData.button2.title}
                  </a>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      {/* End Hero section */}

      {/* Start Categories section */}
      <div className="categories d-none d-md-flex row m-0">
        {productData?.map((item, index) => {
          return (
            <div className="col-lg-3 col-sm-6 col-12 p-0 mb-4" key={index}>
              <Link passHref={true} href={item.product_row_url}>
                <a>
                  <div className="category-item round">
                    <img src={item.product_row_img.url} alt="category" />
                    <div className="hover-title p-4">
                      {item.product_row_img_title}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      {/* End Categories section */}

      {/* Start Collection section */}
      <div className="collection-section">
        <Collection />
      </div>
      {/* End Collection section */}

      {/* Start Help section */}
      <Help />
      {/* End Help section */}

      {/* Start Instagram section */}
      <Instagram />
      {/* End Instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
