import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import renderHTML from "react-render-html";
import Link from "next/link";
import Head from "next/head";
import router, { useRouter } from "next/router";
import Header from "../../components/header";
import Footer from "../../components/footer";
import NumberFormat from "react-number-format";
import Schedule from "../../components/schedule";
import Skeleton from "@mui/material/Skeleton";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect } from "react-redux";
import { setWishList } from "../../redux/actions/wishListAction";

var dateFormat = require("dateformat");
import {
  RiFacebookCircleFill,
  RiTwitterFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiWhatsappFill,
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiWhatsappLine,
  RiHeartFill,
  RiHeartLine,
} from "react-icons/ri";
import "swiper/css";

SwiperCore.use([Autoplay, Navigation]);

const ReadingProgress = ({ target }) => {
  const [accessToken, setAccessToken] = useState();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector("#header");
    const aboutSection = document.querySelector(".about-section");
    const restHeight = aboutSection.clientHeight + header.clientHeight;
    const scrollListener = () => {
      if (!target.current) {
        return;
      }
      const element = target.current;
      const totalHeight = element.clientHeight - window.innerHeight;
      const windowScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (windowScrollTop - restHeight <= 0) {
        return setReadingProgress(0);
      }

      if (windowScrollTop - restHeight > totalHeight) {
        return setReadingProgress(100);
      }

      setReadingProgress(((windowScrollTop - restHeight) / totalHeight) * 100);
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return (
    <div
      className={`reading-progress-bar`}
      style={{ width: `${readingProgress}%` }}
    />
  );
};

const blogURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/inside-coster";
const authorURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/users";
const tagsURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/tags";
const categoryURL = process.env.NEXT_PUBLIC_WORDPRESS_URL + "/wp-json/wp/v2/categories";
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const headers = {
  "Content-Type": "application/json",
};

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

const products1 = [
  {
    img: "product-1.png",
    type: "Bracelets",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
  {
    img: "product-2.png",
    type: "Rings",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
  {
    img: "product-3.png",
    type: "Rings",
    id: "Sku: 1342343",
    title: "The Rose Cut Diamond",
    cost: "$1.200",
  },
];

function Brief(props) {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [time, setTime] = useState();
  const [authorData, setAuthorData] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState("Rings");
  const [coverBg, setCoverBg] = useState();
  const [content, setContent] = useState();
  const [dateTime, setDateTime] = useState();
  const [facebookLink, setFacebookLink] = useState();
  const [linkdinLink, setLinkdinLink] = useState();
  const [twitterLink, setTwitterLink] = useState();
  const [products, setProducts] = useState();
  const [metaTitle, setMetaTitle] = useState("Brief");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaImage, setMetaImage] = useState("");
  const target = React.createRef();
  const [tagProps, setTagProps] = useState();
  const router = useRouter();

  const setFavor = (event, product) => {
    let target = event.target.closest(".favor-icon");
    if (target.classList.contains("favor")) {
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == product.shopifyid
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      if (localStorage.wishList) {
        props.setWishList([
          ...props.wishList,
          { ...product, amount: 1, product_type: tags },
        ]);
      } else {
        localStorage.setItem(
          "wishList",
          JSON.stringify([{ ...product, amount: 1, product_type: tags }])
        );
        props.setWishList([{ ...product, amount: 1, product_type: tags }]);
      }
    }
  };

  useEffect(() => {
    if (content) {
      const text = document.querySelector(".article-panel").innerText;
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      setTime(time);
    }
  }, [content]);

  useEffect(() => {
    if (router.query.slug) {
      const currentURL = document.location.href;
      setFacebookLink("https://www.facebook.com/sharer.php?u=" + currentURL);
      setLinkdinLink(
        "https://www.linkedin.com/shareArticle?mini=true&url=" + currentURL
      );
      setTwitterLink("https://twitter.com/share?url=" + currentURL);

      console.log(router.query.slug);
      // Get blog data by slug
      fetch(blogURL + "?slug=" + router.query.slug, {
        method: "get",
        headers,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            data = data[0];
            setMetaTitle(data.title.rendered);
            setMetaDescription(data.acf.content.intro);
            setMetaImage(data.acf.featured_image.url);
            setDateTime(dateFormat(data.date, "mmmm d, yyyy"));
            setTitle(data.title.rendered);
            setContent(data.acf.content.main_content);
            setCoverBg(data.acf.featured_image.url);

            // Get tags of blog
            fetch(tagsURL + "?post=" + data.id, {
              method: "get",
            })
              .then((res) => res.json())
              .then((tags) => {
                if (tags.length) {
                  setTagProps(tags);
                  let formData = new FormData();
                  let getProductQuery =
                    tags.length > 0
                      ? (
                          tags.map((tag, index) =>
                            index == 0
                              ? " AND (tag:" + tag.slug
                              : " OR tag:" + tag.slug
                          ) + ")"
                        ).replaceAll(",", "")
                      : "";
                  formData.append("position", "first: 10");
                  formData.append("query", "status:active" + getProductQuery);
                  fetch(productURL, {
                    method: "post",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((product) => {
                      setProducts(product.data);
                    });
                }
              });

            // Get author data by author ID of blog
            fetch(authorURL + "/" + data.author, {
              method: "get",
              headers,
            })
              .then((res) => res.json())
              .then((author) => {
                console.log(author);
                setAuthorData({
                  name: author.name,
                  avatar: author.avatar["48"],
                  description: author.description,
                });
              });
          }
        });
    }
  }, [router.query]);

  return (
    <div className="brief_page">
      <Head>
        <title>{metaTitle} | Royal Coster</title>
        {/* Google */}
        <meta itemProp="name" content={metaTitle} />
        <meta itemProp="description" content={metaDescription} />
        <meta itemProp="image" content={metaImage} />
      </Head>
      {/*Header */}
      <Header />
      {/* <div className="progress-bar"></div> */}
      {/* Start about section */}
      <div className="about-section pt-md-5 pt-0 mb-5x">
        <div className="link-panel r-container px-5 py-3 mb-md-5 mb-0 round-form d-flex align-items-center">
          <button
            className="btn back-arrow d-flex me-3 blue-text px-0"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <HiOutlineArrowLeft />
          </button>
          <Link passHref={true} href="/">
            <a className="mx-2">HOME</a>
          </Link>
          /
          <span className="title ms-2 text-uppercase blue-text">
            Inside coster
          </span>
          /
          <span className="title ms-2 text-uppercase blue-text">
            {router.query && router.query.slug}
          </span>
        </div>
        <div className="r-container">
          <h1 className="py-5 product-title blue-text text-capitalize">
            {title ? (
              renderHTML(title)
            ) : (
              <Skeleton variant="text" animation="wave" />
            )}
          </h1>
          <div className="about-panel row m-0 pb-5">
            <div className="col-md-9 col-12 p-0 image-panel pe-md-5 pe-0 ">
              {coverBg ? (
                <img src={coverBg} className="round" alt="about-image" />
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={400}
                />
              )}
            </div>
            <div className="col-md-3 col-12 p-0 text-panel mb-5 ps-md-5 ps-0 pt-md-0 pt-5 d-flex flex-column justify-content-between">
              <div className="reporter-info">
                {authorData ? (
                  <img
                    src={authorData.avatar}
                    className="reporter-avatar rounded-circle"
                    alt="reporterAvatar"
                    width="50"
                    height="50"
                  />
                ) : (
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    animation="wave"
                  />
                )}
                <h3 className="reporter-name py-4">
                  {authorData ? (
                    renderHTML(authorData.name)
                  ) : (
                    <Skeleton variant="text" animation="wave" />
                  )}
                </h3>
                <p className="reporter-description text-capitalize">
                  {authorData ? (
                    renderHTML(authorData.description)
                  ) : (
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={200}
                      animation="wave"
                    />
                  )}
                </p>
                <p className="reporter-date pt-4">
                  <span className="text-uppercase me-2">
                    {dateTime && dateTime}
                  </span>
                  ·<span className="ms-2">{time ? time : 0}</span> min read
                </p>
              </div>
              <div className="share-panel">
                <h3 className="blue-text text-uppercase mb-4">Share article</h3>
                <hr className="line" />
                <div className="links-panel mt-4 d-flex justify-content-between">
                  {facebookLink && (
                    <Link passHref={true} href={facebookLink}>
                      <a>
                        <RiFacebookCircleFill />
                      </a>
                    </Link>
                  )}
                  {twitterLink && (
                    <Link passHref={true} href={twitterLink}>
                      <a>
                        <RiTwitterFill />
                      </a>
                    </Link>
                  )}
                  <Link passHref={true} href="#">
                    <a>
                      <RiInstagramFill />
                    </a>
                  </Link>
                  {linkdinLink && (
                    <Link passHref={true} href={linkdinLink}>
                      <a>
                        <RiLinkedinFill />
                      </a>
                    </Link>
                  )}
                  <Link passHref={true} href="#">
                    <a>
                      <RiWhatsappFill />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End about section */}
      {/* Start article section */}
      <ReadingProgress target={target} />
      <div ref={target} className="article-section pb-5  r-container">
        {content && (
          <div className="link-panel-cover d-md-block d-none">
            <div className="link-panel">
              {facebookLink && (
                <Link passHref={true} href={facebookLink}>
                  <a>
                    <div className="link-item d-flex align-items-center justify-content-center mb-3">
                      <RiFacebookLine />
                    </div>
                  </a>
                </Link>
              )}
              {twitterLink && (
                <Link passHref={true} href={twitterLink}>
                  <a>
                    <div className="link-item d-flex align-items-center justify-content-center mb-3">
                      <RiTwitterLine />
                    </div>
                  </a>
                </Link>
              )}
              <Link passHref={true} href="#">
                <a>
                  <div className="link-item d-flex align-items-center justify-content-center mb-3">
                    <RiInstagramLine />
                  </div>
                </a>
              </Link>
              {linkdinLink && (
                <Link passHref={true} href={linkdinLink}>
                  <a>
                    <div className="link-item d-flex align-items-center justify-content-center mb-3">
                      <RiLinkedinLine />
                    </div>
                  </a>
                </Link>
              )}
              <Link passHref={true} href="#">
                <a>
                  <div className="link-item d-flex align-items-center justify-content-center">
                    <RiWhatsappLine />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        )}
        <div className="article-panel py-5">
          {content && renderHTML(content)}
        </div>
      </div>
      {/* End article section */}
      {/* Start select product section */}
      {products && (
        <div className="select-product-section py-5 r-container">
          <div className="title-panel row m-0 my-5">
            <div className="col-md-6 col-12 p-0">
              <h3 className="text-capitalize blue-text">Liked the article?</h3>
              <h2 className="text-capitalize blue-text">
                You'll love the products
              </h2>
            </div>
            <div className="col-6 p-0 justify-content-end d-md-flex d-none align-items-end">
              {tagProps && (
                <Link
                  passHref={true}
                  href={{
                    pathname: "/shop",
                    query: {
                      tags: tagProps.map((tag, index) => tag.slug).join(),
                    },
                  }}
                >
                  <a>VIEW ALL</a>
                </Link>
              )}
            </div>
          </div>
          <div className="product-panel row m-0">
            <Swiper
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              className="mySwiper"
              breakpoints={{
                1100: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                590: {
                  slidesPerView: 1.4,
                },
                350: {
                  slidesPerView: 1.4,
                },
                1: {
                  slidesPerView: 1,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => {
                // Delay execution for the refs to be defined
                setTimeout(() => {
                  // Override prevEl & nextEl now that refs are defined
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;

                  // Re-init navigation
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                });
              }}
            >
              {products.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="product-image round">
                      <img src={item.image} alt="product-image" />
                    </div>
                    <div className="product-info py-4">
                      {/* <div className="product-id">
                      <span className="me-2">{item.type}</span>|
                      <span className="ms-2">{item.id}</span>
                    </div> */}
                      <h3 className="product-title my-4 blue-text">
                        {item.title}
                      </h3>
                      <p className="product-cost blue-text">
                        <NumberFormat
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />
                      </p>
                    </div>
                    {accessToken && (
                      <button
                        className={
                          "btn favor-icon " +
                          `${
                            props.wishList &&
                            props.wishList.find(
                              (product) => product.shopifyid == item.shopifyid
                            )
                              ? "favor"
                              : ""
                          }`
                        }
                        onClick={(e) => setFavor(e, item)}
                      >
                        <RiHeartLine className="unfavor" />
                        <RiHeartFill className="favor" />
                      </button>
                    )}
                    <div className="btn-panel">
                      {/* <button className="btn btn-cart pink-btn px-md-5 px-3 py-3 me-3 round-form">
                      ADD TO CART
                    </button> */}
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
                        <a className="btn btn-more-info px-md-5 px-3 py-3 blue-text round-form">
                          MORE INFO
                        </a>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="btn-bottom-panel d-md-none d-block mt-5">
              <button ref={navigationPrevRef} className="btn px-0 me-5">
                <img src="/img/common/leftArrow_black.png" alt="rightArrow" />
              </button>
              <button ref={navigationNextRef} className="btn px-0">
                <img src="/img/common/rightArrow_black.png" alt="rightArrow" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End select product section */}
      {/* Schedule section */}
      <Schedule />
      {/* Footer */}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Brief);
