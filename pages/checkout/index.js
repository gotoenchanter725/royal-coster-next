import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import NumberFormat from "react-number-format";
import NeedHelp from "../../components/needHelp";
import renderHTML from "react-render-html";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { creatCheckout } from "../../redux/actions/checkOutAction";
import Iframe from 'react-iframe';
import {
  RiSubtractFill,
  RiAddFill,
  RiCustomerService2Fill,
  RiChat1Line,
  RiCloseFill,
  RiArrowRightSFill
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";


function Checkout(props) {
  const router = useRouter();
  const [checkoutURL, setCheckoutURL] = useState();

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
    }
    setCheckoutURL(props.checkOut.checkout.webUrl)
  }, []);

  return (
    <div className="myCart_page">
      <Head>
        <title>Checkout | Royal Coster</title>
      </Head>
      <Header />

      {/* Start link section */}
      <div className="link-section">
        <div className="r-container py-3 d-flex align-items-center justify-content-between">
          <button
            className="btn back-arrow d-flex align-items-center text-uppercase blue-text px-0"
            onClick={() => router.push('/cart')}
          >
            <HiOutlineArrowLeft className="me-5" />
            continue shopping
          </button>
        </div>
      </div>
      {/* End link section */}

      {/* Start checkout panel */}
      <div className="checkout-panel">
        {
          // checkoutURL &&
          // <Iframe url={checkoutURL}
          //   width="100%"
          //   height="auto"
          //   id="myId"
          //   className="myClassname"
          //   display="initial"
          //   position="relative" />
        }
      </div>
      {/* End checkout panel */}

      {/* Start help section */}
      <NeedHelp />
      {/* End help section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div >
  );
}

const mapStateToProps = state => ({
  checkOut: state.checkOut
});

const mapDispatchToProps = {
  creatCheckout: creatCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

