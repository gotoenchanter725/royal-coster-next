import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import MyCartList from "../../components/myCartList";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { connect } from "react-redux";
import { creatCheckout } from "../../redux/actions/checkOutAction";

function Shipping(props) {
  const [storage, setStorage] = useState();
  const [freeShippingMethod, setFreeShippingMethod] = useState(true);
  const router = useRouter();

  const goPay = (e) => {
    e.preventDefault()

    // const checkoutID = props.checkOut.checkout.id;
    // const contactInfo = JSON.parse(localStorage.shipping).contact;
    // const shippingAdd = JSON.parse(localStorage.shipping).address;
    // const lineItemsToAdd = [];
    // const shippingAddress = {
    //   address1: shippingAdd.apartment,
    //   address2: shippingAdd.street,
    //   city: shippingAdd.town,
    //   company: null,
    //   country: 'United States',
    //   firstName: contactInfo.firstName,
    //   lastName: contactInfo.surName,
    //   phone: contactInfo.phoneNumber,
    //   province: null,
    //   zip: '40202',
    // };

    router.push("/checkout/payment");
    let shippingData = JSON.parse(localStorage.shipping);
    if (!shippingData.shippingMethod) {
      if (freeShippingMethod == true) {
        shippingData = Object.assign({ shippingMethod: "free" }, shippingData);
        localStorage.setItem("shipping", JSON.stringify(shippingData));
      } else {
        shippingData = Object.assign({ shippingMethod: "none" }, shippingData);
        localStorage.setItem("shipping", JSON.stringify(shippingData));
      }
    } else {
      if (freeShippingMethod == true) {
        shippingData.shippingMethod = "free";
        localStorage.setItem("shipping", JSON.stringify(shippingData));
      } else {
        shippingData.shippingMethod = "none";
        localStorage.setItem("shipping", JSON.stringify(shippingData));
      }
    }

    // JSON.parse(localStorage.cart).cartData.map(cart => {
    //   lineItemsToAdd.push({ variantId: cart.variant.storefrontId, quantity: cart.amount })
    // })

    // props.checkOut.client.checkout.addLineItems(checkoutID, lineItemsToAdd).then((res) => {
    //   console.log(res)
    // })

    // props.checkOut.client.checkout.updateShippingAddress(checkoutID, shippingAddress).then(checkout => {
    //   console.log(shippingAddress)
    //   console.log("then updating shipping add", checkout)
    //   router.push(checkout.webUrl)
    // });
  };

  useEffect(() => {
    if (localStorage.shipping) {
      if (JSON.parse(localStorage.shipping).shippingMethod == "free") {
        setFreeShippingMethod(true);
      } else {
        setFreeShippingMethod(false);
      }
    }
    setStorage(localStorage);
  }, []);

  if (storage) {
    if (!JSON.parse(localStorage.cart).subTotal) {
      router.push("/cart");
      return <div></div>;
    } else if (!localStorage.shipping) {
      router.push("/checkout/information");
      return <div></div>;
    } else {
      const shippingData = JSON.parse(localStorage.shipping);
      return (
        <div className="checkout_page checkout-shipping">
          <Head>
            <title>Checkout Shipping | Royal Coster</title>
          </Head>
          <Header />
          <div className="link-panel py-4">
            <div className="r-container d-flex align-items-center">
              <button
                className="btn back-arrow d-flex me-3 blue-text px-0"
                onClick={() => router.back()}
              >
                <HiOutlineArrowLeft />
              </button>
              <Link passHref={true} href="/cart">
                <a className="mx-2 text-uppercase">Shopping cart</a>
              </Link>
              /
              <Link passHref={true} href="/checkout/information">
                <a className="mx-2 text-uppercase">information</a>
              </Link>
              /
              <span className="title ms-2 text-uppercase blue-text">
                Shipping
              </span>
              /
              <Link passHref={true} href="/checkout/payment">
                <a className="mx-2 text-uppercase">Payment</a>
              </Link>
            </div>
          </div>
          <div className="row main-panel r-container py-5">
            <div className="col-lg-6 col-12 pt-lg-0 pt-sm-5 shipping-panel">
              <div className="shipping-info">
                <div className="title-panel pb-4">
                  <h3>Shipping</h3>
                </div>
                <div className="contact-panel round-panel round-form d-flex justify-content-between py-4 px-5 mt-4 flex-sm-row flex-column">
                  <div className="text-panel d-flex align-items-center">
                    <h3 className="m-0 me-4">Contact</h3>
                    <p className="m-0">{localStorage.customerInfo}</p>
                  </div>
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-primary text-decoration-underline text-end">
                      modify
                    </a>
                  </Link>
                </div>
                <div className="address-panel round-panel round-form d-flex justify-content-between py-4 px-5 mt-4 flex-sm-row flex-column">
                  <div className="text-panel d-flex">
                    <h3 className="m-0 me-4">Send To</h3>
                    <p className="m-0">
                      {shippingData.address.street +
                        ", " +
                        shippingData.address.zipCode +
                        ", " +
                        shippingData.address.town +
                        ", " +
                        shippingData.address.country}
                    </p>
                  </div>
                  <Link passHref={true} href="/checkout/information">
                    <a className="text-primary text-decoration-underline text-end">
                      modify
                    </a>
                  </Link>
                </div>
              </div>
              <div className="shipping-method mt-5 py-sm-5">
                <div className="title-panel py-4">
                  <h3>Shipping method</h3>
                </div>
                <label
                  className="standard-shipping-panel round-form d-flex justify-content-between py-4 px-5 mt-4"
                  htmlFor="checkbox"
                >
                  <div className="text-panel d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      // checked={freeShippingMethod}
                      defaultChecked
                      id="checkbox"
                      onChange={(e) => setFreeShippingMethod(e.target.checked)}
                    />
                    <h3 className="ps-5 m-0 ms-5">Standard</h3>
                  </div>
                  <p className="blue-text mb-0">Free</p>
                </label>
              </div>
              <div className="btn-panel pt-5 d-flex flex-sm-row flex-column">
                <button
                  type="submit"
                  className="btn round-form blue-btn px-5 py-3 next-btn text-uppercase me-sm-4 me-0 mb-sm-0 mb-4"
                  onClick={(e) => goPay(e)}
                >
                  Go to Pay
                </button>
                <button
                  className="btn round-form px-4 py-3 back-btn text-uppercase"
                  onClick={() => router.push("/checkout/information")}
                >
                  Back to info
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-12 ps-lg-5 mb-lg-0 mb-5 order-lg-last order-first">
              <MyCartList />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  } else {
    return <></>;
  }
}

const mapStateToProps = state => ({
  checkOut: state.checkOut
});

const mapDispatchToProps = {
  creatCheckout: creatCheckout
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipping)
