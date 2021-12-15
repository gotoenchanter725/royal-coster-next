import React, { useState, useRef, useEffect } from "react";
import {
  RiPhoneFill,
  RiCompassDiscoverLine,
  RiArrowRightLine,
} from "react-icons/ri";
import Link from "next/link";

export default function Visit() {
  return (
    <div className="visit-panel my-5 r-container row round">
      <div className="col-lg-6 bg-panel order-lg-last" />
      <div className="col-lg-6 form-panel d-flex flex-column justify-content-between p-5 pe-lg-0 pe-5">
        <div className="text-panel text-white p-md-5 pe-lg-0 pe-5 pt-5 p-0 pe-0">
          <h3 className="title col-sm-9 col-12 mb-4">
            Visit <span>Royal</span> Coster
          </h3>
          <p className="text-capitalize col-sm-9 col-12 mb-0">
            Book an experience and learn about our heritage or visit us to see
            more diamonds & jewelry
          </p>
          <div className="btn-panel d-flex justify-content-between flex-wrap mt-3">
            <Link href="/tour">
              <a className="btn book-btn round-form pink-btn d-flex align-items-center justify-content-between px-5 py-3 mt-4 col-sm-9 col-12">
                <span className="text-uppercase">Book tours & workshops</span>
                <RiArrowRightLine />
              </a>
            </Link>
            <div className="d-flex justify-content-sm-start justify-content-around flex-fill mt-4">
              <Link href="tel:+310203055555">
                <a className="contact-btn ms-3 pink-outline-btn btn round-form px-3 py-3">
                  <RiPhoneFill />
                </a>
              </Link>
              <Link href="/contact#direction">
                <a className="direction-btn ms-3 pink-outline-btn btn round-form px-3 py-3">
                  <RiCompassDiscoverLine />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
