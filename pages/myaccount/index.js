import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import {
  RiDashboardFill,
  RiHeartFill,
  RiShoppingCartFill,
  RiUser3Fill,
  RiMapPin2Fill,
  RiCustomerServiceFill,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import Address from "./address";
import Dashboard from "./dashboard";
import Detail from "./detail";
import Purchases from "./purchases";
import NeedHelp from "./needHelp";
import WishList from "./wishList";
import MailList from "../../components/mailList";
import Footer from "../../components/footer";
import { useRouter } from "next/router";
import { connect } from "react-redux";

function MyAccount(props) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [localData, setLocalData] = useState();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("login_user");
    router.push("/");
  };

  useEffect(() => {
    setLocalData(localStorage);
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  if (localData) {
    if (localData.access_token) {
      return (
        <div className="my-account_page d-flex flex-column">
          <Head>
            <title>My Account Dashboard | Royal Coster</title>
          </Head>
          <Header />
          <div className="main-panel row m-0">
            <div className="r-container">
              <div className="welcome-panel round my-5 p-5">
                <h3 className="title mb-4 text-capitalize">
                  <span>Hello </span>
                  {JSON.parse(localData.login_user).firstName}
                </h3>
                <p className="description mb-0 text-capitalize">
                  Here you will find your personal details. If <br />
                  desired, you can also change it here.
                </p>
              </div>
              <div className="tab-panel row m-0 align-items-start mb-5">
                <div
                  className="nav flex-column nav-pills col-md-3 col-12 p-0"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="select-btn btn dashboard-tab d-flex align-items-center active mb-4"
                    id="dashboard-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#dashboard"
                    type="button"
                    role="tab"
                    aria-controls="dashboard"
                    aria-selected="true"
                  >
                    <RiDashboardFill className="me-3" />
                    Dashboard
                  </button>
                  {accessToken && (
                    <button
                      className="select-btn btn wishList-tab d-flex align-items-center mb-4"
                      id="wishList-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#wishList"
                      type="button"
                      role="tab"
                      aria-controls="wishList"
                      aria-selected="false"
                    >
                      <RiHeartFill className="me-3" />
                      My WishList
                    </button>
                  )}
                  <button
                    className="select-btn btn purchases-tab d-flex align-items-center mb-4"
                    id="purchases-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#purchases"
                    type="button"
                    role="tab"
                    aria-controls="purchases"
                    aria-selected="false"
                  >
                    <RiShoppingCartFill className="me-3" />
                    My Purchases
                  </button>
                  <button
                    className="select-btn btn d-flex details-tab align-items-center mb-4"
                    id="details-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#details"
                    type="button"
                    role="tab"
                    aria-controls="details"
                    aria-selected="false"
                  >
                    <RiUser3Fill className="me-3" />
                    My Details
                  </button>
                  <button
                    className="select-btn btn address-tab d-flex align-items-center mb-4"
                    id="address-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#address"
                    type="button"
                    role="tab"
                    aria-controls="address"
                    aria-selected="false"
                  >
                    <RiMapPin2Fill className="me-3" />
                    My Address
                  </button>
                  <button
                    className="select-btn btn needHelp-tab d-flex align-items-center"
                    id="needHelp-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#needHelp"
                    type="button"
                    role="tab"
                    aria-controls="needHelp"
                    aria-selected="false"
                  >
                    <RiCustomerServiceFill className="me-3" />
                    Need help?
                  </button>
                  <button
                    className="btn d-flex align-items-center mt-5 btn-logout"
                    onClick={logout}
                  >
                    <RiLogoutCircleRLine className="me-3" />
                    Logout
                  </button>
                </div>
                <div
                  className="tab-content col-md-9 col-12 p-0 ps-md-5 ps-0 pt-md-0 pt-5"
                  id="v-pills-tabContent"
                >
                  <div
                    className="tab-pane account-tab-panel fade show active"
                    id="dashboard"
                    role="tabpanel"
                    aria-labelledby="dashboard-tab"
                  >
                    <Dashboard />
                  </div>
                  <div
                    className="tab-pane account-tab-panel text-sm-start fade"
                    id="wishList"
                    role="tabpanel"
                    aria-labelledby="wishList-tab"
                  >
                    <WishList />
                  </div>
                  <div
                    className="tab-pane account-tab-panel text-sm-start fade"
                    id="purchases"
                    role="tabpanel"
                    aria-labelledby="purchases-tab"
                  >
                    <Purchases />
                  </div>
                  <div
                    className="tab-pane account-tab-panel text-sm-start fade"
                    id="details"
                    role="tabpanel"
                    aria-labelledby="details-tab"
                  >
                    <Detail />
                  </div>
                  <div
                    className="tab-pane account-tab-panel text-sm-start fade"
                    id="address"
                    role="tabpanel"
                    aria-labelledby="address-tab"
                  >
                    <Address />
                  </div>
                  <div
                    className="tab-pane account-tab-panel text-sm-start fade"
                    id="needHelp"
                    role="tabpanel"
                    aria-labelledby="needHelp-tab"
                  >
                    <NeedHelp />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      );
    } else {
      router.push("/myaccount/login");
      return <></>;
    }
  } else {
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  Api2: state.Api2.value,
});

export default connect(mapStateToProps)(MyAccount);
