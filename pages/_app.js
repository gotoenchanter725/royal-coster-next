import { useState, useEffect } from "react";
import GlobalContext from "../utils/global-context";
import { Provider } from "react-redux";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Modal, Button } from "react-bootstrap"
import { RiCloseFill } from "react-icons/ri"
config.autoAddCss = false;
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

import "../styles/components/header.scss";
import "../styles/components/collection.scss";
import "../styles/components/mailList.scss";
import "../styles/components/visit.scss";
import "../styles/components/footer.scss";
import "../styles/components/needHelp.scss";
import "../styles/components/range.scss";
import "../styles/components/selectSearch.css";
import "../styles/components/productDetail.scss";
import "../styles/components/customer.scss";
import "../styles/components/help.scss";
import "../styles/components/instagram.scss";
import "../styles/components/craftingIdea.scss";
import "../styles/components/dropHintModal.scss";
import "../styles/components/appointmentModal.scss";
import "../styles/components/enquiryModal.scss";
import "../styles/components/myCartList.scss";
import "../styles/components/aboutSlider.scss";
import "../styles/components/watchDetails.scss";
import "../styles/components/watchItems.scss";
import "../styles/components/answerPanel.scss";

import "../styles/pages/homepage.scss";
import "../styles/pages/contactus.scss";
import "../styles/pages/blog/blog.scss";
import "../styles/pages/blog/brief.scss";
import "../styles/pages/jewelry.scss";
import "../styles/pages/ring.scss";
import "../styles/pages/search.scss";
import "../styles/pages/vip.scss";
import "../styles/pages/myCart/myCart.scss";
import "../styles/pages/myCart/checkout.scss";
import "../styles/pages/bespoke.scss";
import "../styles/pages/ringRecommend.scss";
import "../styles/pages/product/index.scss";
import "../styles/pages/collection/index.scss";
import "../styles/pages/collection/detail.scss";
import "../styles/pages/our-experts.scss";
import "../styles/pages/buying-guide.scss";
import "../styles/pages/diamond-buying-guide.scss";
import "../styles/pages/warranty.scss";
import "../styles/pages/tax-refund.scss";
import "../styles/pages/faq.scss";
import "../styles/pages/news.scss";
import "../styles/pages/timeline.scss";
import "../styles/pages/about.scss";
import "../styles/pages/thank-you.scss";
import "../styles/pages/internships.scss";
import "../styles/pages/responsibility.scss";
import "../styles/pages/myaccount/index.scss"
import "../styles/pages/myaccount/login.scss"
import "../styles/pages/myaccount/wishList.scss"
import "../styles/pages/myaccount/details.scss"
import "../styles/pages/myaccount/address.scss"
import "../styles/pages/myaccount/needHelp.scss"
import "../styles/pages/myaccount/purchases.scss"
import "../styles/pages/myaccount/dashboard.scss"
import "../styles/pages/why-royal-coster.scss";
import "../styles/pages/watch/index.scss";
import "../styles/pages/watch/brand.scss";
import "../styles/pages/education/index.scss";
import "../styles/pages/education/detail.scss";
import "../styles/pages/visit/index.scss";
import "../styles/pages/visit/detail.scss";
import "../styles/pages/customRing/chooseSetting.scss";
import "../styles/pages/customRing/confirmSetting.scss";
import "../styles/pages/customRing/chooseDiamond.scss";
import "../styles/pages/customRing/confirmDiamond.scss";
import "../styles/pages/customRing/confirmRing.scss";

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (localStorage && !localStorage.visited) {
      setTimeout(() => {
        setShow(true)
        localStorage.setItem('visited', true);
      }, 2000)
    }
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Provider store={store}>
      {/* Start discount modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="discount-modal"
        dialogClassName="modal-90w mx-auto"
        aria-labelledby="contained-modal-title-vcenter"
        keyboard={false}
        size="lg"
        centered
        scrollable
      >
        <Modal.Body className="p-0">
          <div className="row m-0">
            <img src="/img/common/discount-modal_img.png" className="modal-image col-sm-6 p-0" alt="modal-image" />
            <div className="col-sm-6 left-panel d-flex flex-column justify-content-between p-5">
              <div className="text-panel mb-4">
                <h3 className="blue-text title text-capitalize">Save <span>20%</span> on all <span>jewelries</span> on your next <span>order</span></h3>
                <p className="m-0">Subscribe to our website’s mailing list and get a special gifts and more, just for you!</p>
              </div>
              <div className="form-panel d-flex round-form">
                <input type="text" className="form-control px-5 py-3" placeholder="Type Your Email" />
                <button className="btn">JOIN NOW</button>
              </div>
            </div>
          </div>
          <button className="btn close-btn d-flex p-0 justify-content-center align-items-center" onClick={handleClose}><RiCloseFill /></button>
        </Modal.Body>
      </Modal>
      {/* End discount modal */}
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  )
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
