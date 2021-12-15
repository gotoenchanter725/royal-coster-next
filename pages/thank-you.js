import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import ReactFlagsSelect from "react-flags-select";
import router, { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

const orderDetailURL = process.env.NEXT_PUBLIC_ORDER_DETAIL_URL;

export default function ThankYou() {
  const [selected, setSelected] = useState("LU");
  const [cartData, setCartData] = useState([]);
  const [currencyCode, setCurrencyCode] = useState();
  const [orderData, setOrderData] = useState();
  const router = useRouter();

  useEffect(() => {
    setCartData(JSON.parse(localStorage.cart).cartData)
    let orderID = router.asPath.split('orderid=')[1];
    let formData = new FormData();
    formData.append('orderid', orderID);
    formData.append('token', localStorage.token);
    
    localStorage.removeItem('cart');
    localStorage.removeItem('shipping');
    localStorage.removeItem('token');
    localStorage.removeItem('customerInfo');
    localStorage.removeItem('discountCode');
    localStorage.removeItem('billing');

    fetch(orderDetailURL, {
      method: 'post',
      body: formData
    }).then(res => res.json())
      .then(data => {
        if (data) {
          setOrderData(data)
          setCurrencyCode(data.currency);
        }
      })
  }, [])

  return (
    <div className="thank-you_page">
      <Head>
        <title>Thank You Page | Royal Coster</title>
      </Head>
      <div className="thank-you_header">
        <div className="top-bar px-5 py-3">
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
      <div className="text-panel text-center r-container mx-auto mt-md-5 mb-5">
        <h1 className="title text-capitalize blue-text my-5">Thank you for your order</h1>
        <p className="description dark-text pb-5">Your recently ordered an from our website. Thank you for your order. Please check your mail. The delivery service will fulfill the order as soon as possible. In the mean time, here you can read the rules of care!</p>
      </div>
      {
        orderData
          ? <div className="list-panel round p-4 mx-auto row justify-content-end">
            <div className="d-flex justify-content-between booking-panel mb-3">
              <p className="m-0">Order Details</p>
            </div>
            {
              orderData.line_items.map((product, index) => {
                return (
                  <div className="experience-panel d-flex justify-content-between align-items-center mt-3 border-bottom" key={index}>
                    <div className="experience-box">
                      <h3 className="blue-text">{product.title}</h3>
                    </div>
                    <div className="text-end">
                      <h3 className="blue-text text-end">
                        {currencyCode && <NumberFormat
                          value={product.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          suffix={" " + currencyCode}
                        />}</h3>
                      <p>x {product.quantity}</p>
                    </div>
                  </div>
                )
              })
            }
            <div className="price-panel col-6 pt-3">
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">Discount</h3>
                <h3> {<NumberFormat
                  value={orderData.total_discounts}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">Shipping</h3>
                <h3> {<NumberFormat
                  value={orderData.total_shipping_price_set.shop_money.amount}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between border-bottom">
                <h3 className="blue-text">Tax</h3>
                <h3> {<NumberFormat
                  value={orderData.total_tax}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
              <div className="total-tax-panel pt-3 d-flex justify-content-between">
                <h3 className="blue-text">Total</h3>
                <h3> {<NumberFormat
                  value={orderData.total_price}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale={true}
                  thousandSeparator={true}
                  suffix={" " + currencyCode}
                />}</h3>
              </div>
            </div>
          </div>
          : <Skeleton variant="rect" className="list-panel-skeleton mx-auto round" width="100%" height={100} />
      }
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
