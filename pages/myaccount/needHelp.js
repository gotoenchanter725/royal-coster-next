import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RiChat1Line, RiCustomerService2Fill } from "react-icons/ri";

export default function NeedHelp() {
  return (
    <div className="needHelp_panel">
      <h3 className="title">Need Help?</h3>
      <p className="mb-4 description">
        Do you have a question about your account? Contact us here
      </p>
      <div className="row">
        <div className="col-md-9">
          <div className="help-panel">
            <div className="top-panel d-flex justify-content-between">
              <p className="text-uppercase m-0">Need help?</p>
              <div className="link-panel d-flex">
                <Link passHref={true} href="/contact">
                  <a className="text-uppercase me-4 d-flex align-items-center blue-text">
                    <RiCustomerService2Fill className="me-2" />
                    contact
                  </a>
                </Link>
                <Link passHref={true} href="#">
                  <a className="text-uppercase d-flex align-items-center blue-text">
                    <RiChat1Line className="me-2" />
                    chat
                  </a>
                </Link>
              </div>
            </div>
            <div className="bottom-panel d-flex justify-content-between align-items-center">
              <p className="text-uppercase m-0">
                Not ready to purchase online?
              </p>
              <button
                className="btn pink-btn btn-online text-uppercase"
                data-bs-toggle="modal"
                data-bs-target="#appointment"
              >
                Schedule an appointment
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 mt-md-0 mt-4">
          <div className="left-panel d-flex flex-column">
            <Link href="#">
              <a className="text-uppercase">faq</a>
            </Link>
            <Link href="#">
              <a className="text-uppercase">ORder & PAyment</a>
            </Link>
            <Link href="#">
              <a className="text-uppercase">NEWSLETtER</a>
            </Link>
            <Link href="#">
              <a className="text-uppercase">VIP Member</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
