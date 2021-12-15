import Head from "next/head";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import MyCartList from "../../components/myCartList";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { CountryDropdown } from "react-country-region-selector";
import { useEffect, useState } from "react";

export default function Information() {
  const [firstName, setFirstName] = useState();
  const [surName, setSurName] = useState();
  const [email, setEmail] = useState();
  const [street, setStreet] = useState();
  const [apartment, setApartment] = useState();
  const [zipCode, setZipCode] = useState();
  const [town, setTown] = useState();
  const [country, setCountry] = useState('Netherlands');
  const [phoneNumber, setPhoneNumber] = useState();
  const [localStore, setLocalStore] = useState();
  const [errorPhone, setErrorPhone] = useState();
  const router = useRouter();

  useEffect(() => {
    setLocalStore(localStorage);
    if (localStorage.shipping) {
      let personInfo = JSON.parse(localStorage.shipping).contact;
      let address = JSON.parse(localStorage.shipping).address;
      setFirstName(personInfo.firstName);
      setSurName(personInfo.surName);
      setEmail(localStorage.customerInfo);
      setPhoneNumber(personInfo.phoneNumber);
      setStreet(address.street);
      setApartment(address.apartment);
      setCountry(address.country);
      setTown(address.town);
      setZipCode(address.zipCode);
    }
  }, []);

  const nextStep = (e) => {
    if (
      !surName |
      !email |
      !street |
      !zipCode |
      !town |
      !country |
      !phoneNumber
    ) {
    } else {
      e.preventDefault();
      if (typeof phoneNumber !== "undefined") {
        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(phoneNumber)) {
          setErrorPhone("Please enter only number.");
        } else if (phoneNumber.length < 10 || phoneNumber.length > 12) {
          setErrorPhone("Please enter valid phone number.");
        } else {
          setErrorPhone("");
          localStorage.setItem(
            "shipping",
            JSON.stringify({
              contact: {
                firstName: firstName,
                surName: surName,
                phoneNumber: phoneNumber,
              },
              address: {
                street: street,
                apartment: apartment,
                zipCode: zipCode,
                town: town,
                country: country,
              },
            })
          );
          localStorage.setItem('customerInfo', email)
          router.push("/checkout/shipping");
        }
      }
    }
  };

  if (localStore) {
    if (!JSON.parse(localStore.cart).subTotal) {
      router.push("/cart");
      return <></>;
    } else
      return (
        <div className="checkout_page checkout-information">
          <Head>
            <title>Checkout Information | Royal Coster</title>
          </Head>
          <Header/>
          <div className="link-panel py-4">
            <div className="r-container d-flex align-items-center">
              <button
                className="btn back-arrow d-flex me-3 blue-text px-0"
                onClick={() => router.back()}
              >
                <HiOutlineArrowLeft />
              </button>
              <Link passHref={true}  href="/cart">
                <a className="mx-2 text-uppercase">Shopping cart</a>
              </Link>
              /
              <span className="title ms-2 text-uppercase blue-text">
                information
              </span>
              /
              <Link passHref={true}  href="/checkout/shipping">
                <a className="mx-2 text-uppercase">Shipping</a>
              </Link>
              /
              <Link passHref={true}  href="/checkout/payment">
                <a className="mx-2 text-uppercase">Payment</a>
              </Link>
            </div>
          </div>
          <div className="row main-panel r-container py-5">
            <div className="col-lg-6 col-12 form-panel pt-lg-0 pt-sm-5">
              <form className="form-control">
                <div className="contact-panel">
                  <div className="title-panel d-flex justify-content-between py-4">
                    <h3 className="title m-0">Contact</h3>
                    {!localStore?.access_token &&
                      <Link passHref={true}  href="/myaccount/login">
                        <a className="blue-text text-decoration-underline">
                          Sign In
                        </a>
                      </Link> 
                    }
                  </div>
                  <div className="input-panel pt-3">
                    <input
                      type="email"
                      className="form-control px-4 py-3 round-form email-form my-4"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label text-capitalize"
                        htmlFor="flexCheckChecked"
                      >
                        Keep me informed of news and offers
                      </label>
                    </div>
                  </div>
                </div>
                <div className="delivery-panel mt-sm-5 py-4">
                  <div className="title-panel py-4">
                    <h3 className="blue-text m-0">Delivery address</h3>
                  </div>
                  <div className="input-panel pt-3">
                    <div className="name-input row m-0 pt-4">
                      <div className="p-0 pe-md-3 pe-0 col-md-6 ">
                        <input
                          type="text"
                          className="form-control col-12 px-4 py-3 me-2 round-form first-name-form"
                          placeholder="First Name (Optional)"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="p-0 ps-md-3 ps-0 pt-md-0 pt-4 col-md-6">
                        <input
                          type="text"
                          className="form-control col-12 px-4 py-3 round-form surname-name-form"
                          placeholder="Surname"
                          value={surName}
                          onChange={(e) => setSurName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control px-4 py-3 me-2 round-form street-form mt-4"
                      placeholder="Street and  house number"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                    />

                    <input
                      type="text"
                      className="form-control px-4 py-3 me-2 round-form apartment-form mt-4"
                      placeholder="Apartment no. etc... (Optional)"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                    <div className="zipCode-input row m-0 mt-4">
                      <div className="p-0 pe-md-3 pe-0 col-md-6 ">
                        <input
                          type="text"
                          className="form-control px-4 py-3 me-2 round-form zipCode-form"
                          placeholder="Zip Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          required
                        />
                      </div>
                      <div className="p-0 ps-md-3 ps-0 pt-md-0 pt-4 col-md-6">
                        <input
                          type="text"
                          className="form-control px-4 py-3 round-form town-form"
                          placeholder="Town"
                          value={town}
                          onChange={(e) => setTown(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <CountryDropdown
                      className="form-control px-4 py-3 round-form country-form mt-4"
                      value={country}
                      onChange={(e) => setCountry(e)}
                      required
                    />
                    <input
                      className="form-control px-4 py-3 me-2 round-form phone-form mt-4"
                      placeholder="Telephone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">{errorPhone}</div>
                  </div>
                </div>
                <div className="btn-panel pt-5 d-flex flex-sm-row flex-column">
                  <button
                    type="submit"
                    className="btn round-form blue-btn px-5 py-3 next-btn text-uppercase me-sm-4 me-0 mb-sm-0 mb-4"
                    onClick={nextStep}
                  >
                    Next step
                  </button>
                  <button
                    className="btn round-form px-4 py-3 back-btn text-uppercase"
                    onClick={() => router.push("/cart")}
                  >
                    Back to cart
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6 col-12 ps-lg-5 mb-lg-0 mb-5 order-lg-last order-first">
              <MyCartList />
            </div>
          </div>
          <Footer/>
        </div>
      );
  } else {
    return <></>;
  }
}
