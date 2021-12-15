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
import { setCartData } from "../../redux/actions/cartDataAction";
import {
  RiSubtractFill,
  RiAddFill,
  RiCustomerService2Fill,
  RiChat1Line,
  RiCloseFill,
  RiArrowRightSFill,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { remove } from "lodash";

const cartItems = [
  {
    title: "Brilliant Cut Diamond Engagement Ring",
    image: "item-1.png",
    style: "Halo style",
    description:
      "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
    price: 2895,
    amount: 1,
  },
  {
    title: "Brilliant Cut Diamond Engagement Ring",
    image: "item-2.png",
    style: "Halo style",
    description:
      "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
    price: 2895,
    amount: 1,
  },
];

function getFilterValue(str) {
  str = str.toLowerCase();
  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    str = str.replace(toReplace[i], "");
  }
  str = str.replace(/\W+/g, "-");
  if (str.charAt(str.length - 1) == "-") {
    str = str.replace(/-+\z/, "");
  }
  if (str.charAt(0) == "-") {
    str = str.replace(/\A-+/, "");
  }
  return str;
}

function MyCart(props) {
  const [items, setItems] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const showProduct = (product) => {
    setMainImage(product);
  };

  const checkOut = (e) => {
    e.preventDefault();
    // const checkoutID = props.checkOut.checkout.id;
    // const lineItemsToAdd = [];

    // JSON.parse(localStorage.cart).cartData.map(cart => {
    //   lineItemsToAdd.push({ variantId: cart.variant.storefrontId, quantity: cart.amount });
    // })

    // props.checkOut.client.checkout.addLineItems(checkoutID, lineItemsToAdd).then((res) => {
    router.push("/checkout/information");
    // })
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
      if (localStorage.cart) setItems(JSON.parse(localStorage.cart).cartData);
    }
  }, []);

  useEffect(() => {
    if (items) {
      let subTotalPrice = 0;
      if(items.length) {
        items.map((item, index) => {
          subTotalPrice += item.price * item.amount;
        })
      } else {
        subTotalPrice = 0;
      }
      setSubTotal(subTotalPrice);
      setTotal(subTotalPrice - vat);
      localStorage.setItem(
        "cart",
        JSON.stringify({ cartData: items, vat: vat, subTotal: subTotal })
      );
    }
  }, [items]);

  return (
    <div className="myCart_page">
      <Head>
        <title>My Cart | Royal Coster</title>
      </Head>
      <Header />
      {/* Start link section */}
      <div className="link-section">
        <div className="r-container py-3 d-flex align-items-center justify-content-between">
          <Link href="/shop">
            <a className="btn back-arrow d-flex align-items-center text-uppercase blue-text px-0">
              <HiOutlineArrowLeft className="me-5" />
              continue shopping
            </a>
          </Link>
          <span className="text-uppercase blue-text">
            <span>{items ? items.length : 0}</span> items in shopping cart
          </span>
        </div>
      </div>
      {/* End link section */}
      {/* Start my cart section */}
      <div className="my-cart-section r-container py-5 mb-md-5">
        <div className="title-panel pb-3">
          <h3 className="title text-capitalize blue-text">My shopping cart</h3>
          <p className="text-uppercase">{items ? items.length : 0} items</p>
        </div>
        <div className="cart-panel">
          {items ? (
            items.map((item, index) => {
              return (
                <div className="cart-info py-5 d-flex flex-column" key={index}>
                  <div className="d-flex align-item-center">
                    <div className="image-panel me-4">
                      <img
                        src={item.image}
                        alt="item-image"
                        className="item-image mb-md-0 mb-4 round"
                        width="200"
                        height="200"
                      />
                      <div className="amount-panel d-md-none ps-lg-5 ps-0">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-2"
                            onClick={() => {
                              if (item.amount > 1) {
                                items[index].amount = item.amount - 1;
                                setItems([...items]);
                              }
                            }}
                          >
                            <RiSubtractFill />
                          </button>
                          <span className="mx-4">{item.amount}</span>
                          <button
                            className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-2"
                            onClick={() => {
                              if (items[index].amunt < item.maxCount) {
                                items[index].amount = item.amount + 1;
                              }
                              setItems([...items]);
                            }}
                          >
                            <RiAddFill />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="info-panel">
                      <div className="info_text-panel row m-0 mb-lg-5">
                        <div className="col-lg-6 col-12 text-panel">
                          <h3 className="blue-text title m-0 text-capitalize">
                            {item.title}
                            <small> ({item.variant.variantTitle})</small>
                          </h3>
                          <p className="cart-style m-0 py-4 text-capitalize">
                            <span className="me-3">{item.product_type}</span>
                          </p>
                          <p className="cart-description m-0 text-capitalize">
                            {renderHTML(item.description.split("<p>")[0])}
                          </p>
                        </div>
                        <div className="col-lg-6 col-12 cost-panel p-0 d-flex justify-content-between flex-sm-row flex-column ps-lg-5 ps-0 pt-lg-0 pt-md-5 pt-3">
                          <div className="mb-sm-0 mb-5 amount-panel ps-lg-5 ps-0 d-md-block d-none">
                            <div className="d-flex justify-content-sm-start justify-content-center align-items-center">
                              <button
                                className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-2"
                                onClick={() => {
                                  if (item.amount > 1) {
                                    items[index].amount = item.amount - 1;
                                    setItems([...items]);
                                  }
                                }}
                              >
                                <RiSubtractFill />
                              </button>
                              <span className="mx-4">{item.amount}</span>
                              <button
                                className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-2"
                                onClick={() => {
                                  if (items[index].amount < item.maxCount) {
                                    items[index].amount = item.amount + 1;
                                  }
                                  setItems([...items]);
                                }}
                              >
                                <RiAddFill />
                              </button>
                            </div>
                          </div>
                          <h3 className="cart-price blue-text">
                            <NumberFormat
                              value={item.price * item.amount}
                              displayType="text"
                              decimalScale={2}
                              fixedDecimalScale={true}
                              thousandSeparator={true}
                              prefix="€ "
                            />
                          </h3>
                        </div>
                      </div>
                      <div className="link-panel  d-md-flex d-none justify-content-between">
                        <Link
                          passHref={true}
                          href={{
                            pathname: "/shop/[slug]",
                            query: {
                              slug:
                                getFilterValue(item.title) +
                                "-" +
                                item.shopifyid,
                            },
                          }}
                        >
                          <a className="btn btn-detail d-flex align-items-center text-uppercase">
                            more details <RiArrowRightSFill />
                          </a>
                        </Link>
                        <button
                          className="btn btn-remove d-flex align-items-center text-uppercase"
                          onClick={() => {
                            items.splice(index, 1);
                            setItems([...items]);
                            props.setCartData([...items]);
                          }}
                        >
                          Remove <RiCloseFill className="ms-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="link-panel  d-md-none d-flex align-items-center">
                    <div className="remove-btn-panel me-4">
                      <button
                        className="btn btn-remove d-flex p-0 align-items-center text-uppercase"
                        onClick={() => {
                          items.splice(index, 1);
                          setItems([...items]);
                        }}
                      >
                        <RiCloseFill className="ms-2" />
                      </button>
                    </div>
                    <Link
                      passHref={true}
                      href={{
                        pathname: "/shop/[slug]",
                        query: {
                          slug:
                            getFilterValue(item.title) + "-" + item.shopifyid,
                        },
                      }}
                    >
                      <a className="btn btn-detail d-flex align-items-center text-uppercase">
                        more details <RiArrowRightSFill />
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="none-text m-0 py-5 text-center">Cart is empty</h3>
          )}
        </div>
      </div>
      {/* End my cart section */}
      {/* Start total section */}
      <div className="total-section row py-5 r-container">
        <div className="col-md-7 col-12 p-0 pe-md-3 pe-0 pb-md-0 pb-5 left-panel">
          <div className="round need-help-panel px-5 mb-5">
            <div className="title-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-5">Need Help?</h3>
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
            <div className="purchase-panel d-flex justify-content-between align-items-center flex-sm-row flex-column py-5">
              <h3 className="text-uppercase m-0 mb-sm-0 mb-5">
                Not ready to purchase online?
              </h3>
              <button
                className="btn btn-schedule text-uppercase blue-text px-4 py-2"
                data-bs-toggle="modal"
                data-bs-target="#appointment"
              >
                Schedule an appointment
              </button>
            </div>
          </div>
          <div className="instruction-panel round px-5 py-5">
            <h3 className="title m-0 pb-5 text-sm-start text-center">
              SPECIAL INSTRUCTIONS FOR US
            </h3>
            <textarea
              className="form-control round p-4"
              placeholder="Write Here..."
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="col-md-5 col-12 summary-panel round order-md-last order-first px-5 py-5 mb-md-0 mb-5">
          <h3 className="title text-uppercase pb-5 blue-text">Summary</h3>
          <div className="price-panel py-4">
            <div className="subtotal-panel d-flex align-items-center justify-content-between pb-3">
              <h3 className="m-0">Subtotal:</h3>
              <p className="m-0">€{subTotal}</p>
            </div>
            <div className="val-panel  d-flex align-items-center justify-content-between">
              <h3 className="m-0">Excluding VAT:</h3>
              <p className="m-0">€{vat}</p>
            </div>
          </div>
          <div className="total-panel pt-4">
            <div className="total-price d-flex justify-content-between pb-4">
              <h3 className="m-0">Total</h3>
              <p className="m-0">€{total}</p>
            </div>
            <div className="round paid-price d-flex justify-content-between p-4 mb-4">
              <h3 className="m-0">To be paid:</h3>
              <p className="m-0">€ {total}</p>
            </div>
            <button
              className="btn blue-btn round p-4 text-uppercase"
              onClick={checkOut}
              disabled={items ? false : true}
            >
              Check OUT
            </button>
          </div>
        </div>
      </div>
      {/* End total section */}
      {/* Start help section */}
      <NeedHelp />
      {/* End help section */}
      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartData: state.cartData.value,
});

const mapDispatchToProps = {
  setCartData: setCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
