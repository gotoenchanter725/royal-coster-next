import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Customer from "../../components/customer";
import ProductDetail from "../../components/productDetail";
import NeedHelp from "../../components/needHelp";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import renderHTML from "react-render-html";
import { setWishList } from "../../redux/actions/wishListAction";
import { setCartData } from "../../redux/actions/cartDataAction";
import { connect } from "react-redux";
import "swiper/css";
import {
  RiHeartFill,
  RiShareLine,
  RiErrorWarningLine,
  RiChat1Line,
  RiCustomerService2Fill,
  RiSubtractFill,
  RiAddFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Skeleton } from "@material-ui/lab";
import { SnackbarProvider, useSnackbar } from "notistack";

SwiperCore.use([Autoplay, Navigation]);

const products = {
  id: 1,
  images: ["product-1.png", "product-2.png", "product-3.png"],
  title: "Brilliant Cut Diamond Engagement Ring",
  style: "Halo style",
  description:
    "Exude grace with this round Aphrodite band, set with round, brilliant diamonds and halo to lend eternal style.",
  price: 645,
};
// const products = ["product-1.png", "product-2.png", "product-3.png"];
const sizeList = [
  { size: 5 },
  { size: 6 },
  { size: 7 },
  { size: 8 },
  { size: 9 },
];
const meterials = [
  { meterial: "material-1.png" },
  { meterial: "material-2.png" },
  { meterial: "material-3.png" },
  { meterial: "material-4.png" },
];

const customerSlider = [
  {
    name: "Ayesha",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-1.png",
    description:
      "Finding jewelry that just finishes your outfit.. Isn't that a great feeling? 😍 At Royal Coster Diamonds we have an extensive collection of (diamond) jewelry. If you'd rather choose the diamond and setting yourself, that's also possible.",
  },
  {
    name: "costerdiamondsofficial",
    location: "Amsterdam, Netherlands",
    coverImage: "customer_cover-2.png",
    customerImage: "customer-2.png",
    description:
      "This 2 carat Royal 201 diamond ring is a must for everyone 😍 Tag the person who you think should have this ring!⁠",
  },
];
const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;

function ProductRing(props) {
  const [size, setSize] = useState(0);
  const [favorItem, setFavorItem] = useState();
  const [itemAmount, setItemAmount] = useState(1);
  const [itemPrice, setItemPrice] = useState();
  const [mainImage, setMainImage] = useState();
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();
  const [productData, setProductData] = useState();
  const [optionValue, setOptionValue] = useState();
  const [sizeList, setSizeList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");
      if (localStorage.wishList) {
        props.setWishList(JSON.parse(localStorage.wishList));
      }
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  useEffect(() => {
    props.wishList &&
      localStorage.setItem("wishList", JSON.stringify(props.wishList));
  }, [props.wishList]);

  const addCart = (e) => {
    e.preventDefault();
    let cartAmount = 0;
    let currentSize = size ? size : sizeList[0];
    let formData = new FormData();
    const graphql = `{productVariant(id: "gid://shopify/ProductVariant/${optionValue.variantId}") {id title storefrontId}}`;
    formData.append("graphql", btoa(graphql));
    fetch(graphqlURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        let cartItem = {
          shopifyid: productData.id,
          size: currentSize,
          maxCount: productData.available,
          description: productData.body_html,
          title: productData.title,
          price: productData.variants[0].price,
          variant: {
            ...optionValue,
            storefrontId: data.data.productVariant.storefrontId,
          },
          image: productData.image.src.replace(".jpg", "_100x.jpg"),
          amount: itemAmount,
          product_type: "Rings",
        };
        let selectedAmount = itemAmount;

        if (localStorage.cart) {
          let cartData = JSON.parse(localStorage.cart).cartData;
          cartData.map((product) => {
            if (product.shopifyid == productData.id) {
              cartAmount += product.amount;
            }
          });

          let setItem = cartData.find(
            (item, index) => item.shopifyid == cartItem.shopifyid
          );
          let available = productData.available - cartAmount;

          if (!available) {
            const variant = "warning";
            enqueueSnackbar("Stock is not enough.", { variant });
            return;
          }

          if (selectedAmount > available) {
            setItemAmount(available);
            selectedAmount = available;
          }

          if (setItem) {
            const variantItem = cartData.find(
              (item) => item.variant.variantId == cartItem.variant.variantId
            );
            if (variantItem) {
              variantItem.amount += selectedAmount;
              localStorage.setItem(
                "cart",
                JSON.stringify({ cartData: cartData })
              );
              props.setWishList(cartData);
            } else {
              localStorage.setItem(
                "cart",
                JSON.stringify({ cartData: [...cartData, cartItem] })
              );
              props.setWishList([...cartData, cartItem]);
            }
          } else {
            localStorage.setItem(
              "cart",
              JSON.stringify({
                cartData: [
                  ...cartData,
                  {
                    ...cartItem,
                    amount: selectedAmount,
                  },
                ],
              })
            );
          }
        } else {
          if (!productData.available) { 
            const variant = "warning";
            enqueueSnackbar("Stock is not enough.", { variant });
            return;
          }

          if (selectedAmount > productData.available) {
            selectedAmount = productData.available;
            setItemAmount(productData.available);
          }

          localStorage.setItem(
            "cart",
            JSON.stringify({
              cartData: [
                {
                  ...cartItem,
                  amount: selectedAmount,
                },
              ],
            })
          );
        }
        router.push("/cart");
      });
  };

  const selectFavor = () => {
    if (favorItem) {
      setFavorItem();
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == productData.id
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      setFavorItem("favor");
      let productItem = {
        shopifyid: productData.id,
        title: productData.title,
        price: productData.variants[0].price,
        variantID: productData.variants[0].id,
        image: productData.image.src.replace(".jpg", "_100x.jpg"),
        amount: itemAmount,
        product_type: "Rings",
        descripion: productData.body_html,
      };
      if (localStorage.wishList) {
        props.setWishList([...props.wishList, productItem]);
      } else {
        localStorage.setItem("wishList", JSON.stringify([productItem]));
        props.setWishList([productItem]);
      }
    }
  };

  useEffect(() => {
    if (router.query.slug) {
      let shopifyid = router.query.slug.split("-");
      let formData = new FormData();
      formData.append("shopifyid", shopifyid[shopifyid.length - 1]);
      fetch(getProductURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
          setMainImage(data.image.src.replace(".jpg", "_500x.jpg"));
          setItemPrice(data.variants[0].price);
          setOptionValue({
            variantTitle: data.variants[0].title,
            variantId: data.variants[0].id,
          });
          data.tags.split(",").map((item) => {
            if (item >= 45 && item <= 65) setSizeList([...sizeList, item]);
          });
          if (
            localStorage.wishList &&
            JSON.parse(localStorage.wishList).find(
              (item) => item.shopifyid == data.id
            )
          ) {
            setFavorItem("favor");
          }
        });
    }
  }, [router.query]);

  return (
    <div className="productRing_page" id="productPage">
      <Head>
        <title>ProductRing | Royal Coster</title>
      </Head>
      <Header />

      {/* Start state section */}
      <div className="state-section">
        <div className="link-panel  r-container py-3 d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={() => router.back()}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          {productData && (
            <>
              /
              <Link
                passHref={true}
                href="/shop"
              >
                <a className="mx-2 text-uppercase">
                  shop
                </a>
              </Link>
              /
            </>
          )}
          <span className="title ms-2 text-uppercase blue-text">
            {productData && productData.title}
          </span>
        </div>
      </div>
      {/* End state section */}

      {/* Start confirm section */}
      {productData ? (
        <div className="confirm-section py-5 mb-5 row r-container">
          <div className="show-product col-md-6 col-12 p-0 pt-5 pe-5">
            <div className="row m-0">
              <div className="tile-product col-2 p-0 pe-3">
                {productData.images.length > 0 &&
                  productData.images.map((item, index) => {
                    return (
                      <button
                        className="btn btn-show-product mb-3 p-0 round-form"
                        key={index}
                        onClick={() =>
                          setMainImage(item.src.replace(".jpg", "_500x.jpg"))
                        }
                      >
                        <img
                          src={item.src.replace(".jpg", "_50x.jpg")}
                          alt="product-image"
                        />
                      </button>
                    );
                  })}
              </div>
              <div className="main-product col-10 p-0">
                <div className="image-panel round mb-4">
                  <div className="image-box">
                    {mainImage && <img src={mainImage} alt="main-image" />}
                  </div>
                </div>
                <div className="btn-panel d-flex align-items-center justify-content-between">
                  <button className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center">
                    <RiShareLine className="me-2" />
                    share
                  </button>
                  <button
                    className="btn px-4 py-2 blue-text btn-share text-uppercase round-form d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#dropHint"
                  >
                    drop a hint
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="show-setting col-md-6 col-12 p-0 pt-5 ps-5">
            <div className="title-panel">
              <h3 className="type pb-4 m-0">
                {renderHTML(productData.vendor)}
              </h3>
              <h3 className="title text-capitalize pb-4 m-0">
                {renderHTML(productData.title)}
              </h3>
              <p className="description pb-4 m-0">
                {productData.body_html && renderHTML(productData.body_html.split("<p>")[0])}
              </p>
            </div>
            <div className="confirm-panel">
              {productData.options.length > 0 &&
                productData.options.map((option, key) => {
                  return (
                    <div className="material-setting-panel py-4" key={key}>
                      <label
                        htmlFor="selectKarat"
                        className="d-flex align-items-center pb-4 text-uppercase"
                      >
                        {option.name} :
                        {optionValue ? optionValue[0] : option.values[0]}
                        <RiErrorWarningLine className="ms-2" />
                      </label>
                      <div className="material-box d-flex flex-wrap">
                        {option.values.length > 0 &&
                          option.values.map((value, index) => {
                            return (
                              <button
                                className={
                                  "btn btn-material px-4 py-2 round-form mt-3 text-uppercase me-3 " +
                                  (!optionValue && index == 0
                                    ? "active"
                                    : optionValue &&
                                      optionValue.variantTitle == value
                                    ? "active"
                                    : "")
                                }
                                key={index}
                                onClick={() =>
                                  setOptionValue({
                                    variantTitle: value,
                                    variantId: productData.variants.find(
                                      (variant) => variant.title == value
                                    ).id,
                                  })
                                }
                              >{
                                console.log(value)
                              }
                                {value == "Default Title" ? productData.title : value}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              {sizeList.length > 0 && (
                <div className="selector-panel row m-0 py-4">
                  <div className="select-karat col-lg-6 col-md-12 col-sm-6 col-12 p-0 pe-lg-3 pe-md-0 pe-sm-3 pe-0">
                    <div className="d-flex justify-content-between pb-4 align-items-center">
                      <h3
                        htmlFor="selectKarat"
                        className="d-flex align-items-center m-0 text-uppercase"
                      >
                        Ring Size
                        <RiErrorWarningLine className="ms-2" />
                      </h3>
                      <button
                        className="btn text-uppercase btn-find-size py-1"
                        onClick={() => setSize(0)}
                      >
                        find my size
                      </button>
                    </div>
                    <div className="select-box">
                      <select
                        className="form-select blue-text ps-4 round-form py-3"
                        aria-label="Default select example"
                        value={size}
                        onChange={(event) => setSize(event.target.value)}
                      >
                        {sizeList > 0 &&
                          sizeList.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  {/* <div className="select-size col-lg-6 col-md-12 col-sm-6 col-12 p-0 ps-lg-3 ps-md-0 ps-lg-3 ps-0">
                  <label
                    htmlFor="selectKarat"
                    className="d-flex align-items-center pb-4 text-uppercase"
                  >
                    Free Inscription
                    <RiErrorWarningLine className="ms-2" />
                  </label>
                  <button className="btn btn-add-engraving  d-flex justify-content-between align-items-center text-uppercase round-form p-3">
                    add engraving
                    <RiArrowRightSLine />
                  </button>
                </div> */}
                </div>
              )}

              <div className="cost-panel d-flex justify-content-between align-items-center py-4">
                <div className="price-panel">
                  <h4 className="text-uppercase">total</h4>
                  <h3 className="blue-text">
                    <NumberFormat
                      value={itemPrice * itemAmount}
                      displayType="text"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      thousandSeparator={true}
                      prefix="€ "
                    />
                  </h3>
                </div>
                <div className="amount-panel d-flex align-items-center">
                  <button
                    className="btn btn-decrease round-form blue-text d-flex align-items-center justify-content-center p-4"
                    onClick={() =>
                      itemAmount > 1 && setItemAmount(itemAmount - 1)
                    }
                  >
                    <RiSubtractFill />
                  </button>
                  <span className="mx-4">{itemAmount}</span>
                  <button
                    className="btn btn-increase round-form blue-text d-flex align-items-center justify-content-center p-4"
                    onClick={() =>
                      itemAmount < productData.available &&
                      setItemAmount(itemAmount + 1)
                    }
                  >
                    <RiAddFill />
                  </button>
                </div>
              </div>
              <div className="confirm-box d-flex flex-wrap justify-content-between align-items-start m-0 py-4">
                {accessToken && (
                  <button
                    className={
                      "btn favor-btn round-form d-flex align-items-center justify-content-center p-4 me-3 " +
                      favorItem
                    }
                    onClick={() => selectFavor()}
                  >
                    <RiHeartFill />
                  </button>
                )}
                <div className="setting-btn-panel d-flex flex-column flex-1 text-end">
                  <button
                    className="btn blue-btn text-uppercase round-form px-5 py-3 mb-4"
                    onClick={addCart}
                  >
                    add to cart
                  </button>
                  <p className="m-0">Price includes VAT</p>
                </div>
              </div>
              <div className="help-panel d-flex justify-content-between py-4">
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
              <div className="schedule-panel d-flex align-items-center justify-content-between flex-wrap py-4">
                <p className="m-0 text-uppercase">
                  Not ready to purchase online?
                </p>
                <button
                  className="btn btn-schedule text-uppercase blue-text my-3 px-5 py-2"
                  data-bs-toggle="modal"
                  data-bs-target="#appointment"
                >
                  Schedule an appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row r-container mb-5">
          <div className="col-md-6 col-12 p-0 pt-5 pe-5">
            <div className="row m-0">
              <div className="tile-product d-sm-block d-none col-2 p-0 pe-3">
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width="100%"
                  className="mt-4"
                  height={50}
                  animation="wave"
                />
              </div>
              <div className="main-product col-sm-10 col-12 p-0">
                <Skeleton
                  variant="rect"
                  width="100%"
                  height={300}
                  animation="wave"
                />
              </div>
              <div className="tile-product d-sm-none d-flex col-12 p-0 pt-4">
                <Skeleton
                  variant="rect"
                  width={50}
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width={50}
                  className="ms-4"
                  height={50}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  width={50}
                  className="ms-4"
                  height={50}
                  animation="wave"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 p-0 pt-5 ps-5">
            <Skeleton
              variant="text"
              width="100%"
              height={45}
              className="mb-4"
            />
            <Skeleton
              variant="text"
              width="100%"
              height={45}
              className="mb-4"
            />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
            <Skeleton variant="text" height={35} width="100%" />
          </div>
        </div>
      )}
      {/* End confirm section */}

      {/* Start product detail section */}
      {productData ? (
        <ProductDetail
          informations={productData.specifications}
          productID={productData.variants[0].sku}
          productDescription={productData.body_html}
        />
      ) : (
        <div className="r-container pt-5">
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
          <Skeleton variant="text" width="100%" height={40}></Skeleton>
        </div>
      )}
      {/* End product detail section */}

      {/* Start customer section */}
      <Customer customerSlider={customerSlider} />
      {/* End customer section */}

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
  wishList: state.wishList.value,
  cartData: state.cartData.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
  setCartData: setCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRing);
