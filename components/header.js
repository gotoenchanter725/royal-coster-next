import React, { Component, useEffect, useRef } from "react";
import NumberFormat from "react-number-format";
import { useState } from "react";
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import DropHintModal from "./dropHintModal";
import { connect } from "react-redux";
import Link from "next/link";
import AppointmentModal from "./appointmentModal";
import { setWishList } from "../redux/actions/wishListAction";
import { setCartData } from "../redux/actions/cartDataAction";
import Badge from "@mui/material/Badge";
import {
  RiCustomerService2Fill,
  RiMapPin2Line,
  RiServiceLine,
  RiSearchLine,
  RiShoppingCartLine,
  RiShoppingBag2Line,
  RiUser3Line,
  RiMailSendLine,
  RiHeartLine,
  RiMenu3Line,
  RiPhoneLine,
  RiMessageLine,
  RiMailLine,
  RiCloseFill,
  RiPhoneFill,
} from "react-icons/ri";

let submenus = [
  // {
  //   title: "ENGAGEMENT",
  //   url: "/shop",
  //   imagePanel: {
  //     image: "mega_img-1.png",
  //     title: "Ring Shopping Guide",
  //     url: "#",
  //   },
  //   megaMenu: [
  //     {
  //       title: "Create a Ring",
  //       menu: [
  //         {
  //           name: "Start with Setting",
  //           img: "mega_logo (1).png",
  //           url: "/customRing/chooseSetting",
  //         },
  //         {
  //           name: "Start with a Diamond",
  //           img: "mega_logo (2).png",
  //           url: "/customRing/chooseDiamond",
  //         },
  //         {
  //           name: "Ring Recommender",
  //           img: "mega_logo (3).png",
  //           url: "/ringRecommend",
  //         },
  //         {
  //           name: "Design your own Engagement Ring",
  //           img: "mega_logo (4).png",
  //           url: "#",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Shop by Style",
  //       menu: [
  //         { name: "Halo", img: "mega_logo (5).png", url: "#", tag: "", product_type: "" },
  //         { name: "Solitaire", img: "mega_logo (6).png", url: "#", tag: "", product_type: "" },
  //         { name: "Slidestone", img: "mega_logo (7).png", url: "#", tag: "", product_type: "" },
  //         { name: "Threestone", img: "mega_logo (8).png", url: "#", tag: "", product_type: "" },
  //         { name: "Vintage", img: "mega_logo (9).png", url: "#", tag: "", product_type: "" },
  //       ],
  //     },
  //     {
  //       title: "Shop Popular Shapes",
  //       menu: [
  //         { name: "Round", img: "mega_logo (10).png", url: "#", tag: "", product_type: "" },
  //         { name: "Cushion", img: "mega_logo (11).png", url: "#", tag: "", product_type: "" },
  //         { name: "Princess", img: "mega_logo (12).png", url: "#", tag: "", product_type: "" },
  //         { name: "Oval", img: "mega_logo (13).png", url: "#", tag: "", product_type: "" },
  //         { name: "Emerald", img: "mega_logo (14).png", url: "#", tag: "", product_type: "" },
  //       ],
  //     },
  //     {
  //       title: "Quick Links",
  //       menu: [
  //         { name: "1 Carat Engagement Rings", url: "#", tag: "", product_type: "" },
  //         { name: "1.5 Carat Engagement Rings", url: "#", tag: "", product_type: "" },
  //         { name: "2 Carat Engagement Rings", url: "#", tag: "", product_type: "" },
  //         { name: "3 Carat Engagement Rings", url: "#", tag: "", product_type: "" },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "JEWELRY",
    url: "",
    imagePanel: {
      image: "mega_img-2.png",
      title: "Jewelry trends for 2022",
      url: "/blog/jewelry-trends-for-2022",
    },
    megaMenu: [
      {
        title: "Rings",
        menu: [
          {
            name: "All jewelry",
            url: "/shop",
          },
          {
            name: "Diamond rings",
            url: "/shop",
            tag: "diamond",
            product_type: "rings",
          },
          {
            name: "Engagement rings",
            url: "/shop",
            tag: "engagement",
            product_type: "rings",
          },
          {
            name: "Gemstone rings",
            url: "/shop",
            tag: "precious,colour,stones",
            product_type: "rings",
          },
        ],
      },
      {
        title: "Earrings",
        menu: [
          {
            name: "Diamond earrings",
            url: "/shop",
            tag: "diamond",
            product_type: "earrings",
          },
          {
            name: "Diamond studs",
            url: "/shop",
            tag: "diamond, stud",
            product_type: "earrings",
          },
          {
            name: "Gemstone earrings",
            url: "/shop",
            tag: "precious,color,stones",
            product_type: "earrings",
          },
        ],
      },
      {
        title: "Bracelets",
        menu: [
          {
            name: "Diamond bracelets",
            url: "/shop",
            tag: "diamond",
            product_type: "bracelets",
          },
          {
            name: "Tennis bracelets",
            url: "/shop",
            tag: "tennis",
            product_type: "bracelets",
          },
        ],
      },
      {
        title: "Necklaces",
        menu: [
          {
            name: "Diamond necklaces",
            url: "/shop",
            tag: "diamond",
            product_type: "necklaces",
          },
          {
            name: "Diamond pendants",
            url: "/shop",
            tag: "diamond",
            product_type: "pendants",
          },
          {
            name: "Gemstone necklaces",
            url: "/shop",
            tag: "precious,color,stones",
            product_type: "necklaces",
          },
        ],
      },
    ],
  },
  { title: "COLLECTIONS", url: "/collections" },
  { title: "CUSTOM JEWELRY", url: "/custom-jewelry" },
  { title: "WATCHES", url: "/watch", tag: "", product_type: "" },
  {
    title: "EDUCATION",
    url: "",
    imagePanel: {
      image: "mega_img-3.png",
      title: "Timeline",
      url: "/timeline",
    },
    megaMenu: [
      {
        title: "The diamond Experts",
        menu: [
          {
            name: "A brief history of diamonds",
            url: "/blog/brief-history-of-diamonds",
          },
          {
            name: "About the C4's",
            url: "/blog/the-4-cs-of-diamond-valuation",
          },
          {
            name: "About colored diamonds & gemstone",
            url: "/blog/fancy-colored-diamonds",
          },
          {
            name: "About the sustainability diamonds",
            url: "/blog/how-we-guarantee-our-diamonds-are-untainted",
          },
          {
            name: "About buying diamonds on a budget",
            url: "/blog/how-to-buy-a-diamond-on-a-budget",
          },
          {
            name: "Most popular engagement rings",
            url: "/blog/most-popular-engagement-rings",
          },
        ],
      },
      {
        title: "The history of Royal Coster",
        menu: [
          {
            name: "Our Royal Legacy",
            url: "/blog/our-royal-legacy",
          },
          {
            name: "The Koh I Noor",
            url: "/blog/the-koh-i-noor-more-than-only-our-heritage",
          },
          {
            name: "The story of Sisi",
            url: "/blog/the-story-of-sisi",
          },
          {
            name: "The story of Rama",
            url: "/blog/how-we-created-queen-julianas-diamond-watch",
          },
        ],
      },
      {
        title: "Guides",
        menu: [
          {
            name: "The ultimate wedding ring guide",
            url: "/blog/the-ultimate-guide-on-how-to-choose-your-wedding-rings",
          },
          {
            name: "What to look for when buying diamonds",
            url: "/blog/who-can-i-really-trust",
          },
          {
            name: "Buying an engagement ring ",
            url: "/blog/buying-a-diamond-solitaire-engagement-ring",
          },
          {
            name: "Romantic ways to propose",
            url: "/blog/5-most-romantic-ways-to-propose",
          },
        ],
      },
    ],
  },
  { title: "TOURS & WORKSHOPS", url: "/tour", tag: "", product_type: "" },
  { title: "BLOG", url: "/blog" },
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

let localSearchkey = '';

function Header(props) {
  const searchClose = useRef();
  const { page } = props;
  const [selected, setSelected] = useState("LU");
  const [items, setItems] = useState();
  const [localCart, setLocalCart] = useState();
  const [searchKey, setSearchKey] = useState(localSearchkey);
  const [accessToken, setAccessToken] = useState();
  const router = useRouter();

  useEffect(() => {
    if(router.route == '/search') {
      if(router.query.query) {
        setSearchKey(router.query.query)
      } 
    }
  }, [router])

  useEffect(() => {
    const mobileTopbarHeight =
      document.querySelector(".mobile__top-bar").clientHeight;
    const mobileSubBar = document.querySelector(".mobile__sub-bar");
    let scrollHeader = document.querySelector(".scroll-header");
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 270) {
        if (!scrollHeader.classList.contains("visible")) {
          scrollHeader.classList.add("visible");
        }
      } else {
        if (scrollHeader.classList.contains("visible")) {
          scrollHeader.classList.remove("visible");
        }
      }

      if (window.scrollY > mobileTopbarHeight) {
        if (!mobileSubBar.classList.contains("visible"))
          mobileSubBar.classList.add("visible");
      } else {
        if (mobileSubBar.classList.contains("visible"))
          mobileSubBar.classList.remove("visible");
      }
    });
    setLocalCart(localStorage.cart);
    if (localStorage.wishList) {
      props.setWishList(JSON.parse(localStorage.wishList));
    }
    if (localStorage.cart) {
      props.setCartData(JSON.parse(localStorage.cart).cartData);
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== undefined) {
      require("bootstrap/dist/js/bootstrap");

      setTimeout(() => {
        let items = document.querySelectorAll(".dr-none");
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove("dr-none");
        }
      }, 1000);

      let tagetStr =
        router.pathname.indexOf("/", 1) == -1
          ? router.pathname
          : router.pathname.slice(0, router.pathname.indexOf("/", 1));
      let tags;
      if (tagetStr == "/blog" || tagetStr == "/shop") {
        const tag = router.query.tags;
        const productType = router.query.productType;
        const slug = router.query.slug;
        if (tag) {
          tags = submenus.find((post, index) => {
            if (post.url.includes(tagetStr) && post.tag == tag) return true;
            else {
              if (post.megaMenu) {
                if (
                  post.megaMenu.find((sublink, id) => {
                    if (
                      sublink.menu.find((url, key) => {
                        if (url.url.includes(tagetStr) && url.tag == tag)
                          return true;
                      })
                    ) {
                      return true;
                    }
                  })
                )
                  return true;
                else false;
              } else return false;
            }
          });
        } else if (productType) {
          tags = submenus.find((post, index) => {
            if (post.url.includes(tagetStr) && post.product_type == productType)
              return true;
            else {
              if (post.megaMenu) {
                if (
                  post.megaMenu.find((sublink, id) => {
                    if (
                      sublink.menu.find((url, key) => {
                        if (
                          url.url.includes(tagetStr) &&
                          url.product_type == productType
                        )
                          return true;
                      })
                    ) {
                      return true;
                    }
                  })
                )
                  return true;
                else false;
              } else return false;
            }
          });
        } else if (slug) {
          tags = submenus.find((post, index) => {
            if (post.url.includes(tagetStr) && post.url.includes(slug))
              return true;
            else {
              if (post.megaMenu) {
                if (
                  post.megaMenu.find((sublink, id) => {
                    if (
                      sublink.menu.find((url, key) => {
                        if (
                          url.url.includes(tagetStr) &&
                          url.url.includes(slug)
                        )
                          return true;
                      })
                    ) {
                      return true;
                    }
                  })
                )
                  return true;
                else false;
              } else return false;
            }
          });
        } else {
          if (tagetStr == "/blog") {
            tags = {
              title: "blog",
            };
          }
        }
      } else {
        tags = submenus.find((post, index) => {
          if (post.url.includes(tagetStr)) return true;
          else {
            if (post.megaMenu) {
              if (
                post.megaMenu.find((sublink, id) => {
                  if (
                    sublink.menu.find((url, key) => {
                      if (url.url.includes(tagetStr)) return true;
                    })
                  ) {
                    return true;
                  }
                })
              )
                return true;
              else false;
            } else return false;
          }
        });
      }
      let allSubItems = document.querySelectorAll(".sub-item");

      allSubItems.forEach((element) => {
        if (tagetStr != "/")
          if (tags) {
            if (
              String(element.innerText).indexOf(
                String(tags.title).toUpperCase()
              ) == 0
            ) {
              element.classList.add("active");
            }
          }
      });
    }
  }, []);

  const removeItem = (product) => {
    let localProducts = props.wishList;
    let removeProduct = localProducts.find(
      (item) => item.shopifyid == product.shopifyid
    );
    if (removeProduct) {
      localProducts.splice(localProducts.indexOf(removeProduct), 1);
      props.setWishList(localProducts);
      localStorage.setItem("wishList", JSON.stringify(localProducts));
    }
  };

  const handleSearch = (e) => {
    if(e.keyCode == 13) {
      localSearchkey = searchKey;
      const keyword = searchKey;
      searchClose.current.click();
      router.push({
        pathname: '/search',
        query: {
          query: keyword
        }
      })
    }
  }

  return (
    <div id="header" className={page}>
      <div className="desktop-header">
        <div className="scroll-header dr-none px-5">
          <div className="r-container mega-menu d-flex justify-content-md-between justify-content-start align-items-center">
            <div className="d-flex p-0 left-menu flex-1 flex-wrap py-2 ">
              <Link passHref={true} href="/">
                <a className="me-5">
                  <img src="/img/common/mobile_logo.png" alt="logo" />
                </a>
              </Link>
              {submenus.map((submenu, index) => {
                if (submenu.megaMenu)
                  return (
                    <div className="sub-item" key={index}>
                      <Link passHref={true} href={submenu.url}>
                        <a className="btn ps-0 py-0 pe-5 pt-3">
                          <span>{submenu.title}</span>
                          <hr className="mt-2" />
                        </a>
                      </Link>
                      {submenu.megaMenu && (
                        <div className="hover-bar dr-none px-5">
                          <div className="d-flex justify-content-between r-container p-5">
                            {submenu.megaMenu.map((menu, key) => {
                              return (
                                <div
                                  className="mega-menu-body text-start px-5"
                                  key={key}
                                >
                                  <h2 className="text-start mb-4 pb-1">
                                    {menu.title}
                                  </h2>
                                  {menu.menu.map((item, id) => {
                                    return (
                                      <Link
                                        passHref={true}
                                        href={
                                          item.tag
                                            ? {
                                                pathname: item.url,
                                                query: {
                                                  tags: item.tag,
                                                  productType:
                                                    item.product_type,
                                                },
                                              }
                                            : item.url
                                        }
                                        key={id}
                                      >
                                        <a>
                                          {item.img ? (
                                            <div className="link-item mt-4 d-flex align-items-center">
                                              <img
                                                src={"/img/common/" + item.img}
                                                alt="mega-logo"
                                                className="me-3"
                                              />
                                              <span>{item.name}</span>
                                            </div>
                                          ) : (
                                            <div className="link-item mt-4">
                                              {item.name}
                                            </div>
                                          )}
                                        </a>
                                      </Link>
                                    );
                                  })}
                                </div>
                              );
                            })}
                            <div className="image-panel text-start">
                              <img
                                src={"/img/common/" + submenu.imagePanel.image}
                                alt="mega-image"
                                className="round"
                              />
                              <div className="title-panel">
                                <h3 className="my-3">
                                  {submenu.imagePanel.title}
                                </h3>
                                <Link
                                  passHref={true}
                                  href={submenu.imagePanel.url}
                                >
                                  <a>
                                    <p className="link-item">Learn More</p>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                else
                  return (
                    <Link passHref={true} key={index} href={submenu.url}>
                      <a className="pe-5 pt-3 sub-item">
                        {submenu.title}
                        <hr className="mt-2" />
                      </a>
                    </Link>
                  );
              })}
            </div>
             <button
              className="btn me-4 d-flex align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#searchBox"
              aria-controls="searchBox"
            >
              <RiSearchLine />
            </button> 
            {accessToken && (
              <button
                className="btn me-4 d-flex align-items-center"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#wishListBox"
                aria-controls="wishListBox"
              >
                {props.wishList.length > 0 ? (
                  <Badge badgeContent={props.wishList.length} color="primary">
                    <RiHeartLine className="font-icon" />
                  </Badge>
                ) : (
                  <RiHeartLine className="font-icon" />
                )}
              </button>
            )}
            <Link passHref={true} href="/cart">
              <a className="btn cart-link d-flex me-4">
                {props.cartData.length > 0 > 0 ? (
                  <Badge badgeContent={props.cartData.length} color="primary">
                    <RiShoppingBag2Line className="font-icon" />
                  </Badge>
                ) : (
                  <RiShoppingBag2Line className="font-icon" />
                )}
              </a>
            </Link>
            <button
              className="btn right-menu btn-consultation text-uppercase px-5 py-4"
              data-bs-toggle="modal"
              data-bs-target="#appointment"
            >
              Schedule consultation
            </button>
          </div>
        </div>
        <div className="row m-0 px-5 top-bar">
          <div className="r-container d-flex justify-content-between align-items-center">
            <Link passHref={true} href="/why-royal-coster">
              <a>WHY ROYAL COSTER ?</a>
            </Link>

            <button
              className="btn right-menu btn-appointment py-3 px-4 text-uppercase"
              data-bs-toggle="modal"
              data-bs-target="#appointment"
            >
              Schedule consultation
            </button>
          </div>
        </div>
        <div className="row m-0 middle-bar px-5 py-3">
          <div className="r-container d-flex justify-content-between">
            <div className="d-flex left-menu align-items-center">
              <nav>
                <Link passHref={true} href="/contact#direction">
                  <a className="d-flex align-items-center text-uppercase">
                    <RiMapPin2Line />
                    Get directions
                  </a>
                </Link>
              </nav>
              <nav className="ms-5">
                <Link passHref={true} href="/contact">
                  <a className="d-flex align-items-center">
                    <RiCustomerService2Fill />
                    CONTACT US
                  </a>
                </Link>
              </nav>
            </div>
            <div className="d-flex right-menu align-items-center">
              <nav>
                <Link passHref={true} href="#newsLetter">
                  <a className="d-flex align-items-center">
                    <RiMailSendLine />
                    NEWSLETTER
                  </a>
                </Link>
              </nav>
              <nav className="ms-5">
                <Link
                  passHref={true}
                  href={accessToken ? "/myaccount" : "/myaccount/login"}
                >
                  <a className="d-flex align-items-center">
                    <RiUser3Line />
                    {accessToken ? "MY ACCOUNT" : "LOGIN / REGISTER"}
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="row m-0 logo-bar px-5 py-5 align-items-center">
          <div className="r-container d-flex align-items-center p-0">
            <div className="col-4 px-0">
              {/* <ReactFlagsSelect
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
              /> */}
            </div>
            <div className="col-4 px-0 text-center">
              <Link passHref={true} href="/">
                <a>
                  <img
                    src={
                      page != "homepage"
                        ? "/img/common/logo_black.png"
                        : "/img/common/logo_white.png"
                    }
                    className="logo-img"
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
            <div className="col-4 px-0 text-end">
               <button
                className="btn me-4"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#searchBox"
                aria-controls="searchBox"
              >
                <RiSearchLine className="font-icon" />
              </button> 
              {accessToken && (
                <button
                  className="btn me-4"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#wishListBox"
                  aria-controls="wishListBox"
                >
                  {props.wishList.length > 0 ? (
                    <Badge badgeContent={props.wishList.length} color="primary">
                      <RiHeartLine className="font-icon" />
                    </Badge>
                  ) : (
                    <RiHeartLine className="font-icon" />
                  )}
                </button>
              )}
              <Link passHref={true} href="/cart">
                <a className="btn">
                  {props.cartData.length > 0 > 0 ? (
                    <Badge badgeContent={props.cartData.length} color="primary">
                      <RiShoppingBag2Line className="font-icon" />
                    </Badge>
                  ) : (
                    <RiShoppingBag2Line className="font-icon" />
                  )}
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="row m-0 px-5 sub-bar">
          <div className="r-container mega-menu d-flex justify-content-md-between justify-content-start align-items-center">
            <div className="d-flex justify-content-center p-0 left-menu flex-1 flex-wrap py-2 ">
              {submenus.map((submenu, index) => {
                if (submenu.megaMenu) {
                  return (
                    <div className="sub-item" key={index}>
                      <Link passHref={true} href={submenu.url}>
                        <a className="btn ps-0 py-0 pe-5 pt-3">
                          <span>{submenu.title}</span>
                          <hr className="mt-2" />
                        </a>
                      </Link>
                      {submenu.megaMenu && (
                        <div className="hover-bar dr-none px-5">
                          <div className="d-flex justify-content-between r-container p-5">
                            {submenu.megaMenu.map((menu, key) => {
                              return (
                                <div
                                  className="mega-menu-body text-start px-5"
                                  key={key}
                                >
                                  <h2 className="text-start mb-4 pb-2">
                                    {menu.title}
                                  </h2>
                                  {menu.menu.map((item, id) => {
                                    return (
                                      <Link
                                        passHref={true}
                                        href={
                                          item.tag
                                            ? {
                                                pathname: item.url,
                                                query: {
                                                  tags: item.tag,
                                                  productType:
                                                    item.product_type,
                                                },
                                              }
                                            : item.url
                                        }
                                        key={id}
                                      >
                                        <a>
                                          {item.img ? (
                                            <div className="link-item mt-4 d-flex align-items-center">
                                              <img
                                                src={"/img/common/" + item.img}
                                                alt="mega-logo"
                                                className="me-3"
                                              />
                                              <span>{item.name}</span>
                                            </div>
                                          ) : (
                                            <div className="link-item mt-4">
                                              {item.name}
                                            </div>
                                          )}
                                        </a>
                                      </Link>
                                    );
                                  })}
                                </div>
                              );
                            })}
                            <div className="image-panel ps-5 text-start">
                              <img
                                src={"/img/common/" + submenu.imagePanel.image}
                                alt="mega-image"
                                className="round"
                              />
                              <div className="title-panel">
                                <h3 className="my-3">
                                  {submenu.imagePanel.title}
                                </h3>
                                <Link
                                  passHref={true}
                                  href={submenu.imagePanel.url}
                                >
                                  <a>
                                    <p className="mb-0 link-item">Learn More</p>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                } else
                  return (
                    <Link passHref={true} key={index} href={submenu.url}>
                      <a className="pt-3 pe-5 sub-item">
                        <span>{submenu.title}</span>
                        <hr className="mt-2" />
                      </a>
                    </Link>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-header dr-none">
        <div className="mobile__top-bar d-flex justify-content-between align-items-center px-5 py-4 text-white">
          <Link
            passHref={true}
            href={accessToken ? "/myaccount" : "/myaccount/login"}
          >
            <a className="d-flex align-items-center">
              <RiUser3Line className="me-3" />
              {accessToken ? "MY ACCOUNT" : "LOGIN / REGISTER"}
            </a>
          </Link>
          {/* <ReactFlagsSelect
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
          /> */}
        </div>
        <div className="mobile__sub-bar d-flex justify-content-between align-items-center px-5 py-4">
          <Link passHref={true} href="/">
            <a>
              <img
                src="/img/common/mobile_logo.png"
                alt="mobile-logo"
                width="30"
              />
            </a>
          </Link>
          <div className="links-panel d-flex align-items-center">
             <button
              className="btn me-2 d-flex align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#searchBox"
              aria-controls="searchBox"
            >
              <RiSearchLine />
            </button> 
            <Link href="tel:00310203055555">
              <a className="btn me-2 d-flex align-items-center" type="button">
                <RiPhoneFill />
              </a>
            </Link>
            {accessToken && (
              <button
                className="btn me-2 d-flex align-items-center"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#wishListBox"
                aria-controls="wishListBox"
              >
                {props.wishList.length > 0 ? (
                  <Badge badgeContent={props.wishList.length} color="primary">
                    <RiHeartLine className="font-icon" />
                  </Badge>
                ) : (
                  <RiHeartLine className="font-icon" />
                )}
              </button>
            )}
            <Link passHref={true} href="/cart">
              <a className="btn d-flex me-4">
                {props.cartData.length > 0 > 0 ? (
                  <Badge badgeContent={props.cartData.length} color="primary">
                    <RiShoppingBag2Line className="font-icon" />
                  </Badge>
                ) : (
                  <RiShoppingBag2Line className="font-icon" />
                )}
              </a>
            </Link>
            <button
              className="d-flex pe-0 hamburger-btn btn align-items-center"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileBar"
              aria-controls="mobileBar"
            >
              <RiMenu3Line />
            </button>
          </div>
        </div>
      </div>
      <div
        className="offcanvas dr-none offcanvas-end p-3"
        tabIndex="-1"
        id="mobileBar"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h3 id="mobileMenuLabel" className="">
            Menu
          </h3>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body pt-0">
          {submenus.map((submenu, index) => {
            if (submenu.megaMenu) {
              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button submenu collapsed py-4 ps-0"
                      data-bs-target={"#index" + index}
                      data-bs-toggle="collapse"
                    >
                      {submenu.title}
                    </button>
                  </h2>
                  <div
                    id={"index" + index}
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      {submenu.megaMenu.map((menu, key) => {
                        return (
                          <div className="link-group mb-5" key={key}>
                            <h2>{menu.title}</h2>
                            {menu.menu.map((item, id) => {
                              return (
                                <Link
                                  passHref={true}
                                  href={
                                    item.tag
                                      ? {
                                          pathname: item.url,
                                          query: {
                                            tags: item.tag,
                                            productType: item.product_type,
                                          },
                                        }
                                      : item.url
                                  }
                                  key={id}
                                >
                                  <a>
                                    {item.img ? (
                                      <div className="link-item my-5 d-flex align-items-center">
                                        <img
                                          src={"/img/common/" + item.img}
                                          alt="mega-logo"
                                          className="me-3"
                                        />
                                        <span>{item.name}</span>
                                      </div>
                                    ) : (
                                      <div className="link-item my-5">
                                        {item.name}
                                      </div>
                                    )}
                                  </a>
                                </Link>
                              );
                            })}
                          </div>
                        );
                      })}
                      <div className="image-panel text-center">
                        <img
                          src={"/img/common/" + submenu.imagePanel.image}
                          alt="sub_image"
                          className="round"
                        />
                        <div className="sub_title-panel">
                          <h3 className="my-5">{submenu.imagePanel.title}</h3>
                          <Link passHref={true} href={submenu.imagePanel.url}>
                            <a>
                              <p className="link-item">Learn More</p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <Link
                  passHref={true}
                  href={submenu.url}
                  data-bs-dismiss="offcanvas"
                  key={index}
                >
                  <a className="submenu py-4">{submenu.title}</a>
                </Link>
              );
            }
          })}
          <button
            className="btn mobile-schedule-btn text-uppercase round-form px-5 py-3 my-5"
            data-bs-toggle="modal"
            data-bs-target="#appointment"
          >
            Schedule consultation
          </button>

          <div className="contact-panel text-center mt-5">
            <h3>Contact Us</h3>
            <div className="contact-links d-flex justify-content-around mt-5">
              <Link passHref={true} href="#">
                <a>
                  <div className="contact-item d-flex align-items-center justify-content-center">
                    <RiMapPin2Line />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="#">
                <a>
                  <div className="contact-item d-flex align-items-center justify-content-center">
                    <RiMessageLine />
                  </div>
                </a>
              </Link>
              <Link passHref={true} href="mailto:support@costerdiamonds.com">
                <a>
                  <div className="contact-item d-flex align-items-center justify-content-center">
                    <RiMailLine />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas dr-none offcanvas-top justify-content-center"
        tabIndex="-1"
        id="searchBox"
        aria-labelledby="searchBoxLabel"
      >
        <div className="offcanvas-header">
          <input
            className="form-control me-3 p-3"
            id="searchPanel"
            value={searchKey}
            placeholder="Search Royal Coster Diamonds"
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={handleSearch}
          />
          <label htmlFor="">
            <RiSearchLine />
          </label>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={searchClose}
          ></button>
        </div>
      </div>
      <div
        className="offcanvas dr-none offcanvas-end p-3"
        tabIndex="-1"
        id="wishListBox"
        aria-labelledby="wisthListLabel"
      >
        <div className="offcanvas-header">
          <h5 id="wisthListLabel" className="d-flex align-items-center">
            <RiHeartLine className="me-5" />
            WishList
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-4">
          {props.wishList != 0 &&
            props.wishList.map((item, index) => (
              <div
                className="item-panel d-flex justify-content-between"
                key={index}
              >
                <div className="title-panel d-flex">
                  <div className="item-image hover-scale me-3">
                    <img src={item.image} alt="item.image" />
                  </div>
                  <div className="item-title">
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
                      <a className="title">{item.title}</a>
                    </Link>
                    <p className="text-capitalize">
                      {item.product_type && <span>{item.product_type} </span>}
                    </p>
                  </div>
                </div>
                <div className="price-panel d-flex flex-column justify-content-between">
                  <NumberFormat
                    value={item.price}
                    displayType="text"
                    decimalScale={2}
                    className="item-price"
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    prefix="$"
                  />
                  <button
                    className="btn btn-remove d-flex align-items-center text-uppercase"
                    onClick={() => {
                      removeItem(item);
                    }}
                  >
                    Remove <RiCloseFill className="ms-2" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <AppointmentModal />

      {/* Start drop hint modal */}
      <DropHintModal />
      {/* End drop hint modal */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
