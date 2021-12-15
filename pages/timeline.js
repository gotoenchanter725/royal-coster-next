import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../components/header";
import { gsap } from "gsap";
import { Draggable } from "gsap/dist/Draggable";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { TweenMax } from "gsap";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const timeLists = [
  {
    year: 1840,
    image: "timeline-1840.png",
    description: "The diamond polishing factory M.E. Coster was founded by Mr. Moses Elias Coster " +
      "at the Binnen Amstel/Waterlooplein , in Amsterdam."
  }, {
    year: 1848,
    image: "timeline-1848.png",
    description: "After the death of Moses E. Coster, his son Martin Coster took over the position" +
      " of director of Coster. When Moses Elias Coster died, he left a will for his wif" +
      "e and 11 children. Three of them entered into a partnership. Meijer Moses (Marti" +
      "n) Coster was involved most in the company until he moved to Paris."
  }, {
    year: 1850,
    image: "timeline-1850.png",
    description: "The company is managed by diamond cutter Abraham Eliazer Daniëls."
  }, {
    year: 1851,
    image: "timeline-1851.png",
    subImage: "timeline-1851_sub.png",
    description: "Martin Coster moves to Paris, where he sets up a cutting factory as well. In the" +
      " following years he acquires a near-monopoly on diamond cutting in the world’s j" +
      "ewellery capital.."
  }, {
    year: 1852,
    image: "timeline-1852.png",
    description: "The main diamond of the British Crown Jewels, the Koh-I-Noor, needs to be recut." +
      " This diamond is one of the largest and oldest cut diamonds in the world. Coster" +
      " was commisioned to arrange this, so he sends two of his best polishers, J. A. F" +
      "edder and L. B. Voorzanger to England to polish the Koh-I-Noor. They work for 38" +
      " days to transform the 186 carat Koh-I-Noor into a 105 carat oval brilliant."
  }, {
    year: 1854,
    image: "timeline-1854.png",
    description: "Coster was visited by Count Leopold II of Belgium"
  }, {
    year: 1855,
    image: "timeline-1855.png",
    description: "The entire Amsterdam diamond industry wins a medal of honour at the World Exhibi" +
      "tion in Paris. The Star of the South diamond is cut from the 225 carat rough to " +
      "a 125 carat cushion brilliant by Coster in Amsterdam and exhibited in Paris. Dur" +
      "ing the first state visit by a British monarch to France in 400 years, Queen Vic" +
      "toria dazzles Paris with the Koh-I-Noor set in her newly made crown diadem."
  }
];

let yearList = [];

timeLists.map((time, index) => {
  let yearItem = time.year - time.year % 10;
  if (!yearList.find(item => item.year == yearItem)) {
    yearList.push({ year: yearItem, yearList: time.year })
  }
})

SwiperCore.use([Autoplay, Navigation]);

export default function TimeLine() {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const swiperRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth >= 576) {

      gsap.registerPlugin(Draggable, TweenMax, ScrollTrigger);

      var masthead = document.querySelector('.time-list-section')

      var mastheadWidth = 0;
      function getMastheadWidth() {
        mastheadWidth = masthead.scrollWidth;
      }
      getMastheadWidth();
      // ScrollTrigger.addEventListener('refreshInit', getMastheadWidth);    

      function updateProxy() {
        let viewportArr = [];
        const timelineHeight = document.querySelector('.pin-spacer')?.offsetTop;
        yearList.map((year, index) => {
          const scrollStep = document.querySelector('.time-' + year.year)?.offsetLeft;
          viewportArr.push({ year: year.year, scrollHeight: (scrollStep + timelineHeight) });
        })

        const currentPos = viewportArr.sort((a, b) => b.year - a.year).find(n => (n.scrollHeight - window.innerWidth / 2) < window.scrollY);

        if (currentPos) {
          let target = document.querySelector('#year-' + currentPos.year);
          if (!target.classList.contains('active')) {
            document.querySelector('.btn-timelist-item.active').classList.remove('active');
            target.classList.add('active')
          }
        }
        const targetTag = document.querySelector(".time-list-bar");
        if (targetTag)
          if (window.scrollY >= (timelineHeight - 70)) {
            if (!targetTag.classList.contains('show')) {
              targetTag.classList.add('show');
            }
          } else {
            if (targetTag.classList.contains('show')) {
              targetTag.classList.remove('show');
            }
          }
        // move the handler to the corresponding ratio according to the page's scroll position.
        if (mastheadScrollTrigger) {
          gsap.set(proxy, { x: -mastheadScrollTrigger.scroll(), overwrite: 'auto' });
        }
      }

      var mastheadScrollTrigger = ScrollTrigger.create({
        id: 'time-list-section',
        animation: gsap.to('.time-list-section', {
          x: function () {
            return -(mastheadWidth - window.innerWidth);
          },
          ease: 'none',
        }),
        trigger: '.time-list-section',
        end: function () {
          return mastheadWidth;
        },
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      });

      var proxy = document.createElement('div');
      // var draggable = Draggable.create(proxy, {
      //   trigger: '.time-list-section',
      //   type: 'x',
      //   inertia: true,
      //   throwProps: true,
      //   onThrowUpdate: function () {
      //     mastheadScrollTrigger.scroll(-this.x);
      //   },
      //   onDrag: function () {
      //     mastheadScrollTrigger.scroll(-this.x);
      //   }
      // })[0];

      window.addEventListener('scroll', updateProxy);
    } else {
      const timelineHeight = document.querySelector('.time-list-section').offsetTop;
      const timeListBarHeight = document.querySelector('.moblie-time-list-bar').clientHeight;
      const headerHeight = document.querySelector('#header .mobile__sub-bar').clientHeight;
      const totalHeight = timelineHeight - timeListBarHeight - headerHeight;
      let viewportArr = [];
      yearList.map((year, index) => {
        const scrollStep = document.querySelector('.time-' + year.year).offsetTop;
        viewportArr.push({ year: year.year, scrollHeight: (scrollStep + totalHeight) });
      })
      document.addEventListener('wheel', () => {
        const currentPos = viewportArr.sort((a, b) => b.year - a.year).find(n => n.scrollHeight < window.scrollY);
        if (currentPos) {
          const target = document.querySelector(".mobile-time-" + currentPos.year);
          swiperRef.current.swiper?.slideTo(target.id)
        }
      })
      swiperRef.current.swiper.on('activeIndexChange', (e) => {
        let element = document.querySelector(".moblie-time-list-item-" + e.realIndex);
        const timelineHeight = document.querySelector('.time-list-section').offsetTop;
        const timeListBarHeight = document.querySelector('.moblie-time-list-bar').clientHeight;
        const headerHeight = document.querySelector('#header .mobile__sub-bar').clientHeight;
        const totalHeight = timelineHeight - timeListBarHeight - headerHeight;
        let target = document.querySelector('.timeline-box.' + element.getAttribute('target'));
        let nextTarget = document.querySelector('.timeline-box.time-' + (+element.getAttribute('target').split('-')[1] + 10))
        swiperRef.current.swiper.slideTo(element.id)
        if (nextTarget && window.scrollY > (totalHeight + target.offsetTop) && window.scrollY < (totalHeight + nextTarget.offsetTop)) {
          return
        }
        window.scrollTo(0, totalHeight + target.offsetTop)
      })
    }
  }, []);

  const handleScroll = (year) => {
    const bodyHeight = document.body.clientHeight;
    const timelineHeight = document.querySelector('.pin-spacer').offsetTop;
    const startPoint = bodyHeight - timelineHeight;
    const scrollStep = document.querySelector('.time-' + year).offsetLeft;
    scrollTo(0, timelineHeight + scrollStep)
  }

  const handleSlider = (e) => {
    const timelineHeight = document.querySelector('.time-list-section').offsetTop;
    const timeListBarHeight = document.querySelector('.moblie-time-list-bar').clientHeight;
    const headerHeight = document.querySelector('#header .mobile__sub-bar').clientHeight;
    const totalHeight = timelineHeight - timeListBarHeight - headerHeight;
    let target = document.querySelector('.timeline-box.' + e.target.getAttribute('target'));
    let nextTarget = document.querySelector('.timeline-box.time-' + (+e.target.getAttribute('target').split('-')[1] + 10))
    swiperRef.current.swiper.slideTo(e.target.id)
    if (nextTarget && window.scrollY > (totalHeight + target.offsetTop) && window.scrollY < (totalHeight + nextTarget.offsetTop)) {
      return
    }
    window.scrollTo(0, totalHeight + target.offsetTop)
  }

  return (
    <div className="timeline_page">
      <Head>
        <title>Timeline | Royal Coster</title>
      </Head>
      <Header page="homepage" /> {/* Start hero section */}
      <div className="hero-section">
        <div className="r-container">
          <h1 className="title text-white text-capitalize">
            Historical Timeline.
            <br />
            Since
            <span>1840</span>
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start guide section */}
      <div className="guide-section pt-md-5">
        <div className="row r-container pt-5 pb-sm-0 pb-5">
          <div className="col-lg-4 col-md-5 col-12 p-0 pe-md-5 pe-5 py-md-5">
            <h3 className="title text-capitalize">
              180 years of craftsmanship.
            </h3>
          </div>
          <div className="col-lg-8 col-md-7 col-12 p-0 ps-md-5 ps-0 pt-5">
            <p className="guide-text">
              Not long after our establishment in 1840, Queen Victoria of England reached out
              to Coster for a very special assignment. Without realizing it at that time, this
              assignment would mark the start of an impressive legacy.
            </p>
          </div>
        </div>
      </div>
      {/* End guide section */}
      {/* Start time list section */}
      <div className="time-list-bar text-center d-sm-block d-none">
        {
          yearList.map((year, index) => {
            return (
              <button id={"year-" + year.year} className={"btn btn-timelist-item mb-1 p-0 " + (index == 0 ? 'active' : '')} key={index} onClick={() => handleScroll(year.year)}>{year.year}</button>
            )
          })
        }
      </div>
      <div className="time-list-section">
        <div className="moblie-time-list-bar d-block d-sm-none pt-3 pb-4">
          <Swiper
            ref={swiperRef}
            centeredSlides={true}
            slidesPerView={5}
            spaceBetween={20}
            className="mySwiper"
          >
            {
              yearList.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <button className={"btn time-item mobile-time-" + item.year + " moblie-time-list-item-" + index} id={index} target={"time-" + item.year} onClick={handleSlider}>
                      {item.year}
                    </button>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="bottom-line d-flex justify-content-center align-items-center">
            <div className="line-dot"></div>
          </div>
        </div>
        {timeLists && timeLists.map((item, index) => {
          return (
            <div
              key={index}
              className={"timeline-box ps-sm-5 py-5 " + "time-" + (item.year - item.year % 10) + (index % 2 ? " horizontal-layout" : "")}>
              <div className="main-box justify-content-end row p-5">
                <div className="col-sm-11 history-box p-0">
                  <div className="row m-0">
                    <img
                      src={"/img/timeline/" + item.image}
                      className={index % 2
                        ? "col-sm-5 round time-line-image p-0"
                        : "round horizontal time-line-image p-0"}
                      alt="timeline-image" />
                    <div
                      className={index % 2
                        ? "col-sm-7 text-box p-0 ps-sm-5 d-flex flex-sm-column flex-row"
                        : "col-12 text-box p-0 d-flex mt-sm-5"}>
                      {
                        item.subImage && index % 2 &&
                        <img src={"/img/timeline/" + item.subImage} className="col-12 d-sm-block d-none sub-image round-form mb-5" />
                      }
                      <p className="m-0 pt-sm-0 pt-4 ps-sm-0 ps-3">{item.description}</p>
                      <h2
                        className={index % 2
                          ? (item.subImage ? "m-0 order-sm-last order-first pt-4 pt-sm-5" : "pt-sm-5 pt-4 m-0 mt-sm-5 order-sm-last order-first")
                          : "order-first pt-sm-5 pt-4 m-0 pe-sm-5 me-sm-5"}>
                        {item.year}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* End time list section */}
    </div >
  );
}
