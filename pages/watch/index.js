import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import WatchDetails from "../../components/watchDetails";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

const vendors = [
  { vendor: "chopard", image: "chopard.png" },
  { vendor: "piaget", image: "piaget.png" },
  { vendor: "tudor", image: "tudor.png" },
  { vendor: "longines", image: "longines.png" },
  { vendor: "frederique-constant", image: "frederique.png" },
  { vendor: "tag-heuer", image: "tag_heuer.png" },
  { vendor: "titoni", image: "titoni.png" },
  { vendor: "hamilton", image: "hamilton.png" },
  { vendor: "omega", image: "omega.png" },
];

const silderData = [
  { tags:"chopard", productType:"watches", image: "chopard.png" },
  { tags:"tudor", productType:"watches", image: "tudor.png" },
  { tags: "piaget", productType:"watches", image: "piaget.png" },
  { tags: "longines", productType:"watches", image: "longines.png" },
  { tags: "frederique-constant", productType:"watches", image: "frederique.png" },
  { tags: "tag-heuer", productType:"watches", image: "tag_heuer.png" },
  { tags: "titoni", productType:"watches", image: "titoni.png" },
  { tags: "hamilton", productType:"watches", image: "hamilton.png" },
  { tags: "omega", productType:"watches", image: "omega.png" },
];

const basicData = [
  {
    title: "Montblanc Diamond Watches",
    description:
      "Superior craftsmanship in a range from grand complications to refined three-hand watches. These are the Montblanc Luxury Watches.",
    btnText: "Show Montblanc watches",
    coverImage: "watch-cover-1.png",
    itemTitle: "Montblanc Watches",
  },
  {
    title: "Frederique Constant Diamond Watches",
    description:
      "Design, Innovation, Passion and Quality. Those are the core values of the brand Frederique Constant.",
    btnText: "SHOW FREDERIQUE CONSTANT WATCHES",
    coverImage: "watch-cover-2.png",
    itemTitle: "Frederique Constant Diamond Watches",
  },
];

const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;

export default function Watch() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [watchData, setWatchData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    if (vendors.length && vendors.length > dataLength) {
      let formData = new FormData();
      formData.append("position", "first:10");
      formData.append(
        "query",
        "status:active AND product_type:watches AND tag:" +
          vendors[dataLength].vendor
      );
      fetch(productURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          watchData.push({
            ...basicData[dataLength % 2],
            title: vendors[dataLength].vendor,
            data: data.data,
          });
          setWatchData([...watchData]);
          setDataLength(dataLength + 1);
          setLoading((dataLength % 2) + 1);
        });
    } else {
      setLoading();
    }
  }, [dataLength]);

  return (
    <div className="watch_page">
      <Head>
        <title>Watch | Royal Coster</title>
      </Head>
      <Header page="homepage" />
      {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <p className="text-capitalize">Haute horlogerie</p>
          <h1 className="title text-white text-capitalize">
            Royal Coster
            <br />
            <span>Watches</span>
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section  py-5">
        <div className="row r-container py-sm-5 py-3">
          <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
            <h3 className="title text-capitalize">The finest watch brands</h3>
          </div>
          <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
            <p className="guide-text">
              At Royal Coster Watches we sell high-end Swiss watches. In the
              heart of our 4 monumental villa’s it is a beacon of Haute
              Horlogerie with 3 of our rooms dedicated to watches from the best
              Swiss manufactures.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}

      {/* Start logo section */}
      <div className="logo-panel r-container row justify-content-between flex-wrap pb-3 mt-5">
        <Swiper
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            996: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 4,
            },
            590: {
              slidesPerView: 3.5,
            },
            480: {
              slidesPerView: 2.8,
            },
            360: {
              slidesPerView: 2.4,
            },
            280: {
              slidesPerView: 2,
            },
            1: {
              slidesPerView: 1,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            // Delay execution for the refs to be defined
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;

              // Re-init navigation
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {silderData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link
                    passHref={true}
                    href={
                      {
                        pathname: "/shop",
                        query: {
                          tags: item.tags,
                          productType:
                            item.productType,
                        },
                      }
                    }
                  >
                    <a
                      className="px-4 py-2 btn-vendor round-form d-flex align-items-center"
                    >
                      <img src={"/img/watch/logo/" + item.image} alt="logo-image" />
                    </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* End logo section */}

      {/* Start watch detail section */}
      <WatchDetails watchData={watchData} loading={loading} />
      {/* End watch detail section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}
