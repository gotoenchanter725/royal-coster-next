import React, { Component } from "react";
import { useState } from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiPinterestFill,
  RiYoutubeFill,
} from "react-icons/ri";

export default function Footer() {
  let paymentLogo = [
    { img: "Frame.png", url: "#" },
    { img: "Frame-1.png", url: "#" },
    { img: "Frame-2.png", url: "#" },
    { img: "Frame-3.png", url: "#" },
    { img: "Frame-4.png", url: "#" },
    { img: "Frame-5.png", url: "#" },
    { img: "Frame-6.png", url: "#" },
    { img: "Frame-7.png", url: "#" },
    { img: "Frame-8.png", url: "#" },
    { img: "Frame-9.png", url: "#" },
    { img: "Frame-11.png", url: "#" },
    { img: "Frame-12.png", url: "#" },
  ];
  let midFooterList = [
    {
      title: "Shop Online",
      url: [
        {
          link: "Engagement Rings",
          url: "/shop",
          tags: "engagement",
          product_type: "rings",
        },
        {
          link: "Wedding & Anniversaries",
          url: "/collections/anniversary",
        },
        { link: "Empress Collection", url: "/collections/empress-collectie" },
        { link: "Bespoke Jewelry", url: "/custom-jewelry" },
        {
          link: "Consult with an expert",
          url: "/contact ",
        },
      ],
    },
    {
      title: "About Royal Coster",
      url: [
        { link: "Our Story", url: "/our-story" },
        { link: "Why Royal Coster", url: "/why-royal-coster" },
        { link: "Corporate Responsibility", url: "/responsibility" },
        { link: "Press", url: "/news" },
        {
          link: "Jobs & internships",
          url: "/blog?tags=jobs",
        },
      ],
    },
    {
      title: "Customer Services",
      url: [
        { link: "Contact Us", url: "/contact" },
        { link: "Faq’s", url: "/faq" },
        {
          link: "Upgrade Service",
          url: "/blog/engagement-ring-wedding-ring-growing-brilliant",
        },
        { link: "Global blue refunds", url: "/tax-refund" },
      ],
    },
    {
      title: "Diamond Guides",
      url: [
        { link: "Engagement ring buying guide", url: "/buying-guide" },
        { link: "Diamond buying guide", url: "/diamond-buying-guide" },
        {
          link: "WHAt to look in a diamond",
          url: "/blog/diamond-knowledge",
        },
        {
          link: "Trends in diamond jewelry",
          url: "/blog/jewelry-trends-for-2022",
        },
        { link: "Proposal ideas", url: "/blog/proposal-ideas" },
        {
          link: "Our Royal Legacy",
          url: "/inside-coster/our-royal-legacy",
        },
        // {
        //   link: "Crftsmanship Knowledge",
        //   url: "/blog/crftsmanship-knowledge ",
        // },
      ],
    },
  ];
  return (
    <div className="footer pt-5" id="footer">
      {/* <div className="mail-list-panel">
        <div className="r-container row py-5 my-5">
          <div className="col-md-6">
            <h3 className="title text-uppercase mb-4">
              Join{" "}
              <span>
                Our <br />
                mailing
              </span>{" "}
              list
            </h3>
            <p className="description mb-5">
              Sign up for diamond, inspiration, and <br />
              special Products, tours and news. We <br />
              won't spam your inbox.
            </p>
            <div className="px-0 social-links d-flex justify-content-lg-start justify-content-center">
              <Link passHref={true} href="#">
                <a className="me-4">
                  <div>
                    <RiFacebookCircleFill />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="#">
                <a className="me-4">
                  <div>
                    <RiInstagramFill />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="#">
                <a className="me-4">
                  <div>
                    <RiLinkedinFill />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="#">
                <a className="me-4">
                  <div>
                    <RiPinterestFill />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="#">
                <a className="me-4">
                  <div>
                    <RiYoutubeFill />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-md-6 pt-md-0 pt-5 d-flex">

          </div>
        </div>
      </div> */}
      <div className="main-footer r-container d-md-block d-none">
        {/* <div className="footer-top row p-0 m-0 py-5">
          
          <div className="col-lg-6 col-12 py-lg-5 py-0 px-0 text-lg-end payment-links text-center">
            {paymentLogo.map((item, index) => {
              return (
                <Link passHref={true} key={index} href={item.url}>
                  <a className={index == 0 ? "ms-0" : "ms-4"}>
                    <img
                      src={"/img/common/" + item.img}
                      alt="payment-getway"
                      width="38"
                      className="my-4"
                    />
                  </a>
                </Link>
              );
            })}
          </div>
        </div> */}
        <div className="footer-middle row p-0 m-0 pt-5">
          {midFooterList.map((items, index) => {
            return (
              <div
                className="col-lg-3 col-md-6 col-12 text-md-start text-center m-0 mb-5"
                key={index}
              >
                <h3 className="mb-5">{items.title}</h3>
                {items.url.map((item, key) => {
                  return (
                    <Link
                      passHref={true}
                      href={
                        item.tags
                          ? {
                              pathname: item.url,
                              query: {
                                tags: item.tags,
                                productType: item.product_type,
                              },
                            }
                          : item.url
                      }
                      key={key}
                    >
                      <a className="row m-0 mb-3 text-uppercase">{item.link}</a>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mobile-footer r-container d-md-none d-block">
        <div className="mobile-footer-logo text-center">
          <img src="/img/common/logo_black.png" alt="footer-logo" />
          <p className="mobile-footer__title my-5">
            The oldest diamond polishing factory in the world. Home of the Royal
            201.
          </p>
        </div>
        {/* <div className="mobile-social-link d-flex justify-content-center pb-5">
          <Link passHref={true} href="#">
            <a>
              <div className="social-link me-4">
                <RiFacebookCircleFill />
              </div>
            </a>
          </Link>{" "}
          <Link passHref={true} href="#">
            <a>
              <div className="social-link me-4">
                <RiInstagramFill />
              </div>
            </a>
          </Link>{" "}
          <Link passHref={true} href="#">
            <a>
              <div className="social-link me-4">
                <RiLinkedinFill />
              </div>
            </a>
          </Link>{" "}
          <Link passHref={true} href="#">
            <a>
              <div className="social-link me-4">
                <RiPinterestFill />
              </div>
            </a>
          </Link>{" "}
          <Link passHref={true} href="#">
            <a>
              <div className="social-link">
                <RiYoutubeFill />
              </div>
            </a>
          </Link>
        </div> */}
        <div className="accordion" id="links-panel">
          {midFooterList.map((item, index) => {
            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed py-5 ps-0"
                    data-bs-toggle="collapse"
                    data-bs-target={"#footerIndex" + index}
                  >
                    {item.title}
                  </button>
                </h2>
                <div
                  className="accordion-collapse collapse"
                  id={"footerIndex" + index}
                >
                  <div className="accordion-body">
                    {item.url.map((link, key) => {
                      return (
                        <Link passHref={true} href={link.url} key={key}>
                          <a>
                            <div className="link-item mb-5 text-uppercase">
                              {link.link}
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed py-5 ps-0"
                data-bs-toggle="collapse"
                data-bs-target="#footerPrivacy"
              >
                Privacy
              </button>
            </h2>
            <div className="accordion-collapse collapse" id="footerPrivacy">
              <div className="accordion-body">
                <Link passHref={true} href="#">
                  <a>
                    <div className="link-item mb-5 text-uppercase">
                      Privacy Policy
                    </div>
                  </a>
                </Link>
                <Link passHref={true} href="#">
                  <a>
                    <div className="link-item mb-5 text-uppercase">Cookies</div>
                  </a>
                </Link>
                <Link passHref={true} href="#">
                  <a>
                    <div className="link-item mb-5 text-uppercase">Terms</div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 py-4 px-0 text-center">
          {paymentLogo.map((item, index) => {
            return (
              <Link passHref={true} key={index} href={item.url}>
                <a className={index == 0 ? "ms-0" : "ms-4"}>
                  <img
                    src={"/img/common/" + item.img}
                    alt="payment-getway"
                    width="38"
                    className="my-2"
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="footer-bottom r-container py-3">
        <div className="row m-auto align-items-center p-0">
          <div className="col-md-5 text-md-start text-center px-0 text-uppercase">
            <div className="mb-3 text-decoration-underline">
              <Link passHref={true} href="#">
                <a className="text-uppercase">Privacy Policy</a>
              </Link>
              <Link passHref={true} href="#">
                <a className="text-uppercase ms-5">Cookies</a>
              </Link>
              <Link passHref={true} href="#">
                <a className="text-uppercase ms-5">Terms</a>
              </Link>
            </div>
            © 2020 Royal Coster Diamonds - All rights reserved
          </div>
          <div className="col-md-7 d-md-block d-none px-0 mt-md-0 mt-3 text-md-end text-center">
            {paymentLogo.map((item, index) => {
              return (
                <Link passHref={true} key={index} href={item.url}>
                  <a className={index == 0 ? "ms-0" : "ms-4"}>
                    <img
                      src={"/img/common/" + item.img}
                      alt="payment-getway"
                      width="38"
                      className="my-4"
                    />
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
