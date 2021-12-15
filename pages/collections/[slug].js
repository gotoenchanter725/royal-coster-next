import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import AppointmentModal from "../../components/appointmentModal";
import renderHTML from "react-render-html";
import NumberFormat from "react-number-format";
import WatchItems from "../../components/watchItems";
import Collection from "../../components/collection";
import Instagram from "../../components/instagram";
import {
  RiArrowRightSFill,
  RiMailFill,
  RiPhoneFill,
  RiWhatsappFill,
  RiDvdFill,
} from "react-icons/ri";
import router, { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";

const productTypes = ["all", "rings", "earrings", "necklaces", "bracelets"];
const products = [
  {
    image: "/img/collection/product (1).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (2).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (3).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (4).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (5).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (6).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (7).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (8).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
  {
    image: "/img/collection/product (9).png",
    title: "Rainbow Earrings (1510385)",
    price: "2400",
  },
];

const detailURL = process.env.NEXT_PUBLIC_COLLECTION_DETAIL_URL;
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;

// export async function getStaticPaths() {
//   const paths = { param: 1 };
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// export async function getStaticProps({ param }) {
//   let data = {};
//   console.log(param)
//   return {
//     props: {
//       data
//     }
//   }
// }

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

let localSticky = 1,
  localMainData;

export default function CollectionDetail() {
  const [productType, setProductType] = useState("all");
  const [mainData, setMainData] = useState(localMainData);
  const [tag, setTag] = useState();
  const [sticky, setSticky] = useState(localSticky);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      let formData = new FormData();
      formData.append(
        "handle",
        router.query.slug.replace("collection", "collectie")
      );
      setTag(router.query.slug.replace("collection", "collectie"));
      // Get detail main data
      fetch(detailURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          localMainData = data.collection;
          setMainData(localMainData);
        });
    }
  }, [router.query]);

  const getCollection = () => {
    let formData = new FormData();
    setLoading(true);
    formData.append("position", 'first:50')
    if (productType == "all") {
      formData.append("query", "status:active AND tag:" + tag);
    } else {
      formData.append(
        "query",
        "status:active AND tag:" + tag + " AND product_type:" + productType
      );
    }
    fetch(productURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setProduct([...data.data]);
      });
  };

  useEffect(() => {
    if (tag) {
      setProduct()
      getCollection();
    }
  }, [tag, productType]);

  return (
    <div className="collection-detail_page">
      <Head>
        <title>Collection Detail | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      {mainData ? (
        <div
          className="hero-section"
          style={{
            background:
              "url(" + mainData.image.src.replace(".jpg", "_2048x.jpg") + ")",
          }}
        >
          <div className="r-container">
            <h1 className="title blue-text text-capitalize mb-5">
              {mainData.title}
            </h1>
          </div>
        </div>
      ) : (
        <Skeleton variant="rect" height={400} width="100%" />
      )}

      {/* Start guide section */}
      {mainData && (
        <div className="guide-section">
          <div className="row r-container py-5">
            <div className="col-md-4 col-12 p-0 pe-md-5 pe-5 py-sm-5">
              <h3 className="title text-capitalize">
                Sparkling <span>sapphires</span>
              </h3>
            </div>
            <div className="col-md-8 col-12 p-0 ps-md-5 ps-0 pt-sm-5 pt-4 pb-sm-5">
              <p className="guide-text mb-4">
                {renderHTML(mainData.body_html)}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* End guide section */}

      {/* Start product section */}
      <div className="product-section r-container">
        <div className="product-type-panel d-flex justify-content-center flex-wrap py-5 my-5">
          {productTypes.map((productTypeItem, index) => (
            <button
              className={
                "btn text-capitalize mx-4 btn-type " +
                (productTypeItem == productType && "active")
              }
              key={index}
              onClick={() => setProductType(productTypeItem)}
            >
              {productTypeItem}
            </button>
          ))}
        </div>
        {product ? (
          <div className="product-panel row">
            {product.length ? (
              product.map((item, index) => (
                <Link
                  passHref={true}
                  href={{
                    pathname: "/shop/[slug]",
                    query: {
                      slug: getFilterValue(item.title) + "-" + item.shopifyid,
                    },
                  }}
                  key={index}
                >
                  <a className="product-item col-md-4 col-sm-6 col-12 mb-5">
                    <div className="image-panel round hover-scale mb-3">
                      <img src={item.image} alt="product-image" />
                    </div>
                    <h3 className="title mb-3">{item.title}</h3>
                    <h3 className="price blue-text mb-0">
                      {
                        <NumberFormat
                          value={item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix={"€ "}
                        />
                      }
                    </h3>
                  </a>
                </Link>
              ))
            ) : (
              <h3 className="empty-text text-center mb-5 pb-5">No result</h3>
            )}
          </div>
        ) : (
          <div className="row pb-5">
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
          </div>
        )}
        {loading && (
          <div className="row pb-5">
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
            <div className="col-md-4 col-sm-6 mb-5">
              <Skeleton variant="rect" height={300} />
              <Skeleton variant="text" className="mt-1" height={20} />
              <Skeleton variant="text" height={20} />
            </div>
          </div>
        )}
      </div>
      {/* End product section */}

      {/* Start collection section */}
      <div className="collection-section">
        <Collection />
      </div>
      {/* End collection section */}

      {/* Start instagram section */}
      <Instagram />
      {/* End instagram section */}

      {/* Start Schedule section */}
      <Schedule />
      {/* End Schedule section */}

      {/* Start Footer */}
      <Footer />
      {/* End Footer */}

      <AppointmentModal />
    </div>
  );
}
