import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import renderHTML from "react-render-html";
import ReactFlagsSelect from "react-flags-select";

export default function ThankYouContact() {
  const [selected, setSelected] = useState("LU");

  return (
    <div className="thank-you_page  thank-you_page-contact d-flex flex-column justify-content-between pb-5">
      <Head>
        <title>Thank You | Royal Coster</title>
      </Head>
      <div className="thank-you_header">
        <div className="top-bar px-5 py-3 mb-5">
          <div className="r-container d-flex justify-content-between align-items-center">
            <Link passHref={true} href="#">
              <a>WHY ROYAL COSTER ?</a>
            </Link>
            <ReactFlagsSelect
              showSelectedLabel={false}
              showSecondarySelectedLabel={false}
              showOptionLabel={false}
              showSecondaryOptionLabel={false}
              selectedSize={14}
              optionsSize={14}
              fullWidth={false}
              selected={selected}
              onSelect={(code) => setSelected(code)}
              placeholder=" "
              className="flag-select pb-0"
            />
          </div>
        </div >
        <div className="logo-bar text-center py-5">
          <Link href="/">
            <a>
              <img src="/img/common/thank-you_logo.png" alt="logo-img" />
            </a>
          </Link>
        </div>
      </div >
      <div className="text-panel text-center r-container mx-auto ">
        <h1 className="title text-capitalize blue-text my-5">Thank you for Contacting Us!</h1>
        <p className="description dark-text pb-5">We have received your message. We’ll reach you out immediately!</p>
      </div>
      <div className="btn-panel d-flex py-5 mb-5  justify-content-center">
        <Link href="/">
          <a className="btn blue-btn px-5 py-3 btn-home text-uppercase me-4 round-form">
            back to home
          </a>
        </Link>
        <button className="btn btn-subscribe text-uppercase round-form px-5 py-3">
          Subscribe
        </button>
      </div>
      <div className="top-pink-panel" />
      <div className="bottom-blue-panel" />
      <div className="bottom-pink-panel" />
    </div>
  );
}
