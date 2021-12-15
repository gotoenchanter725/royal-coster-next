import React, { useState, useRef, useEffect } from "react";
import {
  RiShoppingBag2Line,
  RiUser3Line,
  RiMapPinLine,
  RiCustomerService2Line,
} from "react-icons/ri";

const handleCheckOut = (target) => {
  document.querySelector(".select-btn.active").classList.remove("active");
  document.querySelector("." + target + "-tab").classList.add("active");
  document.querySelector(".account-tab-panel.show.active").classList.remove('active', 'show');
  document.querySelector("#" + target).classList.add('active', 'show');
};

export default function Dashboard() {
  return (
    <div className="dashboard-panel row m-0">
      <h3 className="title px-0">Dashboard</h3>
      <div className="personal-data-box col-sm-6 p-0 pe-sm-3 py-sm-3 pt-3">
        <button
          className="btn checkout-btn d-flex flex-column p-4 mb-4"
          target="details"
          onClick={() => handleCheckOut("details")}
        >
          <div className="shape-panel d-flex">
            <div className="circle-pink" />
            <RiUser3Line className="icon" />
          </div>
          <h3 className="btn-title mt-5 mb-4">Personal Data</h3>
          <p className="mb-0 text-start">
            View or change your personal information.
          </p>
        </button>
      </div>
      <div className="address-box col-sm-6 p-0 ps-sm-3 py-sm-3 pt-3">
        <button
          className="btn checkout-btn d-flex flex-column p-4 mb-4"
          target="address"
          onClick={() => handleCheckOut("address")}
        >
          <div className="shape-panel d-flex">
            <div className="circle-pink" />
            <RiMapPinLine className="icon" />
          </div>
          <h3 className="btn-title mt-5 mb-4">Address</h3>
          <p className="mb-0 text-start">
            View or change your delivery addresses.{" "}
          </p>
        </button>
      </div>
      <div className="orders-box col-sm-6 p-0 pe-sm-3 pt-sm-3 pt-3">
        <button
          className="btn checkout-btn d-flex flex-column p-4 mb-4"
          target="purchases"
          onClick={() => handleCheckOut("purchases")}
        >
          <div className="shape-panel d-flex">
            <div className="circle-pink" />
            <RiShoppingBag2Line className="icon" />
          </div>
          <h3 className="btn-title mt-5 mb-4">Orders</h3>
          <p className="mb-0 text-start">
            View the status of a current order or view your order history.
          </p>
        </button>
      </div>
      <div className="need-help-box col-sm-6 p-0 ps-sm-3 pt-sm-3 pt-3">
        <button
          className="btn checkout-btn d-flex flex-column p-4"
          target="needHelp"
          onClick={() => handleCheckOut("needHelp")}
        >
          <div className="shape-panel d-flex">
            <div className="circle-pink" />
            <RiCustomerService2Line className="icon" />
          </div>
          <h3 className="btn-title mt-5 mb-4">Need help?</h3>
          <p className="mb-0 text-start">Please contact us</p>
        </button>
      </div>
    </div>
  );
}
