import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Header from "../../components/header";
import router, { useRouter } from "next/router";
import Footer from "../../components/footer";
import Schedule from "../../components/schedule";
import Collection from "../../components/collection";
import SelectSearch, { fuzzySearch } from "react-select-search-nextjs";
import {
  RiHeartLine,
  RiFilter3Fill,
  RiHeartFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Skeleton } from "@material-ui/lab";
import _ from "lodash";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { setWishList } from "../../redux/actions/wishListAction";
import CheckboxTree from "react-checkbox-tree";
import CheckBox from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

const options = [
  { name: "ALL", value: "ALL" },
  { name: "POPULAR", value: "POPULAR" },
  { name: "PRICE", value: "PRICE" },
];

const filterItems = [
  { img: "image1.png", text: "Solitaire with side" },
  { img: "image2.png", text: "Solitaire" },
  { img: "image3.png", text: "Three stone" },
  { img: "image4.png", text: "Halo/framed" },
  { img: "image5.png", text: "promise" },
  { img: "image6.png", text: "brands-diamonds" },
  { img: "image7.png", text: "bands-metals" },
  { img: "image8.png", text: "fashion" },
  { img: "image9.png", text: "mothers/family" },
];
const productItems = [
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
  {
    img: "product(3).png",
    title: "Brilliant Cut Diamond Engagement Ring",
    categories: ["Diamond", "Engagement", "Rings"],
    cost: "$2500",
    url: "#",
  },
];

const getProductURL = process.env.NEXT_PUBLIC_GET_PRODUCT_URL;
const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL;
const collectionURL =
  "https://costercatalog.com/api/royalcoster/getCustomCollections.php";
const metarialURL =
  "https://costercatalog.com/api/index.php?request=getMaterialsGroupedNew";
const materialColorURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesColor&sync=1";
const cutURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesCut&tn=products_short&sync=1";
const mountingURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesStyle&tn=products_short&sync=1";
const styleURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesCollection&tn=products_short&sync=1";
const brandURL =
  "https://costercatalog.com/api/index.php?request=getBrandsGrouped&tn=products_short&sync=1";
const brightnessURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesClarity&tn=products_short&sync=1";
const stoneURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesType&tn=products_short&sync=1";
const settingURL =
  "https://costercatalog.com/api/index.php?request=generateAttributesSettings";
const CTagURL = process.env.NEXT_PUBLIC_CTAG_URL;
const headers = {
  // "Content-Type": "application/json",
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

const firstFilterItem = [
  {
    title: "price",
    filter: [
      { label: "To €500", value: "to-500" },
      { label: "€1000 - €1499", value: "-1000-1499" },
      { label: "€1500 - €2499", value: "-1500-2499" },
      { label: "€2500 - €4999", value: "-2500-4999" },
      { label: "€5000 - €9999", value: "-5000-9999" },
      { label: "More than €10000", value: "more-than-10000" },
    ],
  },
  {
    title: "collection",
    filter: [
      { label: "Empress Collection", value: "empress-collectie" },
      { label: "Rainbow Collection", value: "rainbow-collectie" },
      { label: "Luna Collection", value: "luna-collectie" },
      { label: "Touch of Glam Collection", value: "touch-of-glam" },
      { label: "Wedding Rings Collection", value: "wedding-rings-collectie" },
      {
        label: "NIKKIE x Royal Coster Diamonds",
        value: "nikkie-x-royal-coster-diamonds",
      },
    ],
  },
  {
    title: "carat",
    filter: [
      { label: "Below 0.5 Carat", value: "below-0.5-carat" },
      { label: "0.5 - 1.0 Carat", value: "0.5-1.0-carat" },
      { label: "1 - 2 Carat", value: "1-2-carat" },
      { label: "2 - 5 Carat", value: "2-5-carat" },
      { label: "More than 5 Carat", value: "more-than-5-carat" },
    ],
  },
];

const productTypeFilterItem = [
  {
    label: "Rings",
    value: "rings",
  },
  {
    label: "Earrings",
    value: "earrings",
  },
  {
    label: "Bracelets",
    value: "bracelets",
  },
  {
    label: "Necklaces",
    value: "necklaces",
  },
];

const withOutCollections = [
  "Accessories",
  "external",
  "Loyalty10",
  'Moederdag "The Sweetest Thing"',
  "Bracelets",
  "In Bloom Collection",
  "The Blaze Royal 201",
];

const backgrounndArr = [
  "engagement-rings",
  "201-rings",
  "precious-rings",
  "diamond-studs",
  "precious-earrings",
  "tennis-bracelets",
  "diamond-pendants",
  "chopard-watches",
  "frederique-constant-watches",
  "hamilton-watches",
  "longines-watches",
  "omega-watches",
  "piage-watches",
  "rado-watches",
  "tag-heuer-watches",
  "titoni-watches",
  "tudor-watches",
];

const checkTreeIcons = {
  check: <CheckBox />,
  uncheck: <CheckBoxOutlineBlankIcon />,
  halfCheck: <CheckBoxOutlinedIcon />,
  expandClose: <AddBoxOutlinedIcon />,
  expandOpen: <IndeterminateCheckBoxOutlinedIcon />,
  expandAll: "",
  collapseAll: "",
  parentClose: "",
  parentOpen: "",
  leaf: "",
};

let productStore = [],
  lastProductStatus,
  cTagData,
  check0 = [],
  check1 = [],
  check2 = [],
  check3 = [],
  check4 = [],
  check5 = [],
  check6 = [],
  check7 = [],
  check8 = [],
  check9 = [],
  check10 = [],
  check11 = [],
  localProductType,
  localTag = [],
  basicStyleData,
  basicMountingData,
  basicBrandData,
  basicStoneData,
  basicBrightnessData,
  basicCutData,
  basicSettingData,
  basicMetarialData,
  basicMaterialColorData,
  basicCollectionData,
  localResultCounter,
  localChecking = false;

function Ring(props) {
  const [result, setResult] = useState(0);
  const [selectValue, setSelectValue] = useState("POPULAR");
  const [selectFilter, setSelectFilter] = useState([]);
  const [productData, setProductData] = useState([]);
  const [lastProduct, setLastProduct] = useState();
  const [leftFilterItems, setLeftFilterItems] = useState(firstFilterItem);
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState();
  const [checked0, setChecked0] = useState([]);
  const [checked1, setChecked1] = useState([]);
  const [checked2, setChecked2] = useState([]);
  const [checked3, setChecked3] = useState([]);
  const [checked4, setChecked4] = useState([]);
  const [checked5, setChecked5] = useState([]);
  const [checked6, setChecked6] = useState([]);
  const [checked7, setChecked7] = useState([]);
  const [checked8, setChecked8] = useState([]);
  const [checked9, setChecked9] = useState([]);
  const [checked10, setChecked10] = useState([]);
  const [checked11, setChecked11] = useState([]);
  const [checkedProductType, setCheckedProductType] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [productType, setProductType] = useState();
  const [tag, setTag] = useState();
  const [cTagLastAdd, setCTagLastAdd] = useState(1);
  const [checking, setChecking] = useState(localChecking);
  const [cTags, setCTags] = useState([]);
  const [cTagMiddleStore, setCTagMiddleStore] = useState([]);
  const [loadMoreStatus, setLoadMoreStatus] = useState(false);
  const [totalCounter, setTotalCounter] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [filterMounted, setFilterMounted] = useState(false);
  const [bgImage, setBgImage] = useState();
  const router = useRouter();

  const [basicStyleFilter, setBasicStyleFilter] = useState();
  const [basicMountingFilter, setBasicMountingFilter] = useState();
  const [basicBrandFilter, setBasicBrandFilter] = useState();
  const [basicStoneFilter, setBasicStoneFilter] = useState();
  const [basicBrightnessFilter, setBasicBrightnessFilter] = useState();
  const [basicCutFilter, setBasicCutFilter] = useState();
  const [basicMetarialFilter, setBasicMetarialFilter] = useState();
  const [basicMaterialColorFilter, setBasicMaterialColorFilter] = useState();
  const [basicSettingFilter, setBasicSettingFilter] = useState();
  const [basicCollectionFilter, setBasicCollectionFilter] = useState();

  const [priceFilter, setPriceFilter] = useState();
  const [collectionFilter, setCollectionFilter] = useState();
  const [styleFilter, setStyleFilter] = useState();
  const [mountingFilter, setMountingFilter] = useState();
  const [brandFilter, setBrandFilter] = useState();
  const [stoneFilter, setStoneFilter] = useState();
  const [brightnessFilter, setBrightnessFilter] = useState();
  const [cutFilter, setCutFilter] = useState();
  const [metarialFilter, setMetarialFilter] = useState();
  const [accessToken, setAccessToken] = useState();
  const [materialColorFilter, setMaterialColorFilter] = useState();
  const [caratFilter, setCaratFilter] = useState();
  const [settingFilter, setSettingFilter] = useState();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [productTypeFilter, setProductTypeFilter] = useState();

  useEffect(() => {
    if (!basicStyleData) {
      // get collection filter data
      fetch(collectionURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((collection) => {
          basicCollectionData = collection.custom_collections;
          setBasicCollectionFilter(basicCollectionData);
        });

      // get style filter data
      fetch(styleURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((style) => {
          basicStyleData = style.Collection.split(",");
          setBasicStyleFilter(basicStyleData);
        });

      // get mounting filter data
      fetch(mountingURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((mounting) => {
          basicMountingData = mounting.Style.split(",");
          setBasicMountingFilter(basicMountingData);
        });

      // get brand filter data
      fetch(brandURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((brands) => {
          basicBrandData = brands;
          setBasicBrandFilter(basicBrandData);
        });

      // get stone filter data
      fetch(stoneURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((stones) => {
          basicStoneData = stones;
          setBasicStoneFilter(basicStoneData);
        });

      // get brightness filter data
      fetch(brightnessURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((brightness) => {
          basicBrightnessData = brightness;
          setBasicBrightnessFilter(basicBrightnessData);
        });

      // get cut filter data
      fetch(cutURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((cut) => {
          basicCutData = cut;
          setBasicCutFilter(basicCutData);
        });

      // get metarial filter data
      fetch(metarialURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((metarial) => {
          metarial = metarial[0].colorDesc;
          basicMetarialData = metarial.split(",");
          setBasicMetarialFilter(basicMetarialData);
        });

      // get materialColor filter data
      fetch(materialColorURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((materialColor) => {
          basicMaterialColorData = materialColor;
          setBasicMaterialColorFilter(basicMaterialColorData);
        });

      // get setting filter data
      fetch(settingURL, {
        method: "get",
      })
        .then((res) => res.json())
        .then((setting) => {
          basicSettingData = setting.Setting.split(",");
          setBasicSettingFilter(basicSettingData);
        });
    } else {
      setBasicStyleFilter(basicStyleData);
      setBasicMountingFilter(basicMountingData);
      setBasicBrandFilter(basicBrandData);
      setBasicStoneFilter(basicStoneData);
      setBasicBrightnessFilter(basicBrightnessData);
      setBasicCutFilter(basicCutData);
      setBasicSettingFilter(basicSettingData);
      setBasicMetarialFilter(basicMetarialData);
      setBasicCollectionFilter(basicCollectionData);
      setBasicMaterialColorFilter(basicMaterialColorData);
      setResult(localResultCounter);
      setStyleFilter();
      setMountingFilter();
      setBrandFilter();
      setStoneFilter();
      setBrightnessFilter();
      setCutFilter();
      setSettingFilter();
      setMetarialFilter();
      setMaterialColorFilter();
      setCTags([]);
    }
    if (localStorage.access_token) {
      setAccessToken(localStorage.access_token);
    }
  }, []);

  useEffect(() => {
    if (router.query) {
      setLoad(false);
      setLoadMoreStatus(false);
      setFilterMounted(false);
      setCTagMiddleStore([]);
      setCTagLastAdd(1);
      setCTags([]);
      setTotalCounter(0);
      setPriceFilter();
      setCollectionFilter();
      setStyleFilter();
      setMountingFilter();
      setChecked1([]);
      setChecked2([]);
      setChecked3([]);
      setChecked4([]);
      setChecked5([]);
      setChecked6([]);
      setChecked7([]);
      setChecked8([]);
      setChecked9([]);
      setChecked10([]);
      setChecked11([]);
      setCheckedProductType([]);
      setBrandFilter();
      setStoneFilter();
      setBrightnessFilter();
      setCutFilter();
      setCaratFilter();
      setMetarialFilter();
      setMaterialColorFilter();
      setProductTypeFilter();
      if (_.size(router.query)) {
        if (router.query.tags || router.query.productType) {
          if (router.query.productType) {
            setProductType(router.query.productType);
            if (router.query.tags) {
              if (
                backgrounndArr.find(
                  (item) =>
                    item ==
                    router.query.tags.split(",")[0] +
                      "-" +
                      router.query.productType
                )
              ) {
                setBgImage(
                  router.query.tags.split(",")[0] +
                    "-" +
                    router.query.productType
                );
              } else {
                setBgImage(router.query.productType);
              }
            } else {
              setBgImage(router.query.productType);
            }
          }
          if (router.query.tags) {
            if (router.query.productType == "watches") {
              setTag(router.query.tags.split(","));
            } else {
              setTag([...router.query.tags.split(","), "jewelry"]);
            }
          } else {
            if (router.query.productType != "watches") {
              setTag(["jewelry"]);
            }
          }
        } else {
          setTag(["jewelry"]);
        }
      } else {
        if (router.asPath == "/shop") {
          setTag(["jewelry"]);
          setProductType();
          setProductTypeFilter(productTypeFilterItem);
        }
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (formData) {
      fetch(productURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setLoad(false);
          if (data.hasNextPage == "Yes") {
            setLastProduct(data.last);
            lastProductStatus = data.last;
          } else {
            setLastProduct(false);
            lastProductStatus = false;
          }
          setProductData(data.data);
          productStore = data.data;
        });
    }
  }, [formData]);

  useEffect(() => {
    if (cTags.length) {
      console.log(cTags);
      if (firstFilterItem[0]) {
        let middleArr = [];
        firstFilterItem[0].filter.map((item, index) => {
          if (cTags.find((ctag) => ctag == item.value)) {
            middleArr.push({ label: item.label, value: item.value });
          }
        });
        setPriceFilter(middleArr);
      }
      // if (firstFilterItem[1]) {
      //   let middleArr = [];
      //   firstFilterItem[1].filter.map((item, index) => {
      //     if (cTags.find((ctag) => ctag == item.value)) {
      //       middleArr.push({ label: item.label, value: item.value });
      //     }
      //   });
      //   setCollectionFilter(middleArr);
      // }
      if (firstFilterItem[2]) {
        let middleArr = [];
        firstFilterItem[2].filter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item.label))) {
            middleArr.push({
              label: item.label,
              value: item.value,
            });
          }
        });
        setCaratFilter(middleArr);
      }
    }
  }, [cTags]);

  useEffect(() => {
    let middleArr = [];
    if (basicCollectionFilter) {
      basicCollectionFilter.map((item) => {
        if (
          !withOutCollections.find((collection) => collection == item.title)
        ) {
          middleArr.push({
            label: item.title.replaceAll("Collectie", "Collection"),
            value: item.handle,
          });
        }
      });
      setCollectionFilter(middleArr);
    }
  }, [basicCollectionFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicStyleFilter) {
        let middleArr = [];
        basicStyleFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicStyleFilter.length - 1) {
            setStyleFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicStyleFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMountingFilter) {
        let middleArr = [];
        basicMountingFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicMountingFilter.length - 1) {
            setMountingFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicMountingFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicBrandFilter) {
        let brands;
        if (productType) {
          brands = basicBrandFilter.find(
            (item) => item.MainGroup.toLowerCase() == productType
          );
        }
        brands
          ? (brands = brands)
          : (brands = basicBrandFilter.find(
              (item) => item.MainGroup.toLowerCase() == "all products"
            ));

        const basicArr = brands ? brands.BrandID.split(",") : [];
        let middleArr = [];
        basicArr.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicArr.length - 1) {
            setBrandFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicBrandFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicStoneFilter) {
        let stoneArr = [];
        let counter = [];
        for (const key in basicStoneFilter) {
          if (Object.hasOwnProperty.call(basicStoneFilter, key)) {
            let middleArr = [];
            counter++;
            const element = basicStoneFilter[key];
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            stoneArr.push(...middleArr);
            if (counter == _.size(basicStoneFilter)) {
              setStoneFilter(stoneArr);
            }
          }
        }
      }
    }
  }, [cTags, basicStoneFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicBrightnessFilter) {
        let brightnessArr = [];
        let counter = [];
        for (const key in basicBrightnessFilter) {
          if (Object.hasOwnProperty.call(basicBrightnessFilter, key)) {
            let middleArr = [];
            const element = basicBrightnessFilter[key];
            counter++;
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            brightnessArr.push(...middleArr);
            if (counter == _.size(basicBrightnessFilter)) {
              setBrightnessFilter(brightnessArr);
            }
          }
        }
      }
    }
  }, [cTags, basicBrightnessFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicCutFilter) {
        let cutArr = [];
        let counter = 0;
        for (const key in basicCutFilter) {
          if (Object.hasOwnProperty.call(basicCutFilter, key)) {
            let middleArr = [];
            const element = basicCutFilter[key];
            counter++;
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            cutArr.push(...middleArr);
            if (counter == _.size(basicCutFilter)) {
              setCutFilter(cutArr);
            }
          }
        }
      }
    }
  }, [cTags, basicMetarialFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMetarialFilter) {
        let middleArr = [];
        basicMetarialFilter.map((item, index) => {
          if (item == "18k Gold") {
            item = "18k";
          } else if (item == "14k Gold") {
            item = "14k";
          }
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({
              label:
                item == "18k" ? "18k Gold" : item == "14k" ? "14k Gold" : item,
              value: getFilterValue(item),
            });
          }
          if (index == basicMetarialFilter.length - 1) {
            setMetarialFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicMetarialFilter]);

  useEffect(() => {
    if (cTags.length) {
      if (basicMaterialColorFilter) {
        let materialColorArr = [];
        let counter = 0;
        for (const key in basicMaterialColorFilter) {
          if (Object.hasOwnProperty.call(basicMaterialColorFilter, key)) {
            let middleArr = [];
            counter++;
            const element = basicMaterialColorFilter[key];
            let itemArr = [];
            if (element.length == 1) {
              if (cTags.find((ctag) => ctag == getFilterValue(element[0]))) {
                middleArr.push({
                  label: element[0],
                  value: getFilterValue(element[0]),
                });
              }
            } else {
              element.map((item, index) => {
                if (cTags.find((ctag) => ctag == getFilterValue(item))) {
                  itemArr.push({ label: item, value: getFilterValue(item) });
                }
                if (index == element.length - 1) {
                  if (itemArr.length) {
                    if (itemArr.length == 1) {
                      middleArr.push({
                        label: itemArr[0].label,
                        value: itemArr[0].value,
                      });
                    } else {
                      middleArr.push({
                        label: key,
                        value: getFilterValue(key) + 1,
                        children: itemArr,
                      });
                    }
                  }
                }
              });
            }
            materialColorArr.push(...middleArr);
            if (counter == _.size(basicMaterialColorFilter)) {
              setMaterialColorFilter(materialColorArr);
            }
          }
        }
      }
    }
  }, [cTags, basicMaterialColorFilter]);

  useEffect(() => {
    props.wishList &&
      localStorage.setItem("wishList", JSON.stringify(props.wishList));
  }, [props.wishList]);

  useEffect(() => {
    if (checkingStatus) {
      if (router.asPath.includes("/shop")) {
        if (checking != localChecking) {
          setCTagLastAdd(1);
        }
        let defaultTags = "";
        let tagArr = [
          checked1,
          checked2,
          checked3,
          checked4,
          checked5,
          checked6,
          checked7,
          checked8,
          checked9,
          checked10,
          checked11,
          checkedProductType,
        ];
        if (tagArr.length) {
          defaultTags = tagArr
            .map((arr, index) =>
              arr.length > 0
                ? " AND (" +
                  arr.map((item, id) =>
                    id == 0 ? "tag:" + item : " OR tag:" + item
                  ) +
                  ")"
                : ""
            )
            .join("")
            .replaceAll(",", "");
        }
        if (tag.length) {
          if (tag[tag.length - 1] == "jewelry") {
            defaultTags =
              defaultTags +
              (
                tag.map((item, index) =>
                  index + 1 < tag.length
                    ? (index == 0 ? " AND (tag:" + item : " OR tag:" + item) +
                      ")"
                    : ""
                ) + " AND tag:jewelry"
              ).replaceAll(",", "");
          } else {
            defaultTags =
              defaultTags +
              (
                tag.map((item, index) =>
                  index == 0 ? " AND (tag:" + item : " OR tag:" + item
                ) + ")"
              ).replaceAll(",", "");
          }
        }
        if (filterMounted) {
          let formData = new FormData();
          if (cTagLastAdd == 1) {
            formData.append("position", "first:50");
          } else {
            formData.append(
              "position",
              "first:50,after:" + '"' + cTagLastAdd + '"'
            );
          }
          if (productType) {
            if (productType == "watches") {
              formData.append(
                "query",
                "status:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags
              );
            } else {
              formData.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags
              );
            }
          } else {
            formData.append("query", "tag:active" + defaultTags);
          }
          fetch(CTagURL, {
            method: "post",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              let middleArr = [];
              if (data.last) {
                let total = totalCounter;
                let tags = [];
                let cTagStore = cTagMiddleStore;
                if (checking != localChecking) {
                  total = 0;
                  cTagStore = [];
                  localChecking = checking;
                }
                setTotalCounter(total + data.productsCount);
                data.tags.map((tag, index) => {
                  if (!tags.find((item) => item == getFilterValue(tag))) {
                    middleArr.push(getFilterValue(tag));
                  }
                  if (index == data.tags.length - 1) {
                    cTagData = [...cTagStore, ...middleArr];
                    setCTagMiddleStore(cTagData);
                    setCTags(cTagData);
                    if (data.hasNextPage == "No") {
                      localResultCounter = total + data.productsCount;
                      setResult(localResultCounter);
                    }
                  }
                });
                if (data.hasNextPage == "Yes") {
                  setCTagLastAdd(data.last);
                }
              }
            });
        } else {
          if (
            JSON.stringify(localTag) == JSON.stringify(tag) &&
            localProductType == productType &&
            cTagData
          ) {
            setCTags(cTagData);
          } else {
            localTag = tag;
            localProductType = productType;
            setResult(0);
            let formData = new FormData();
            if (cTagLastAdd == 1) {
              formData.append("position", "first:50");
            } else {
              formData.append(
                "position",
                "first:50,after:" + '"' + cTagLastAdd + '"'
              );
            }
            if (productType) {
              if (productType == "watches") {
                formData.append(
                  "query",
                  "status:active AND " +
                    (productType == "pendants"
                      ? "(product_type:" +
                        productType +
                        " OR product_type:necklaces)"
                      : "product_type:" + productType) +
                    defaultTags
                );
              } else {
                formData.append(
                  "query",
                  "tag:active AND " +
                    (productType == "pendants"
                      ? "(product_type:" +
                        productType +
                        " OR product_type:necklaces)"
                      : "product_type:" + productType) +
                    defaultTags
                );
              }
            } else {
              if (defaultTags) {
                formData.append("query", "tag:active" + defaultTags);
              } else {
                formData.append("query", "tag:active");
              }
            }
            fetch(CTagURL, {
              method: "post",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                let middleArr = [];
                let tags = cTagMiddleStore;
                data.tags.map((tag, index) => {
                  if (!tags.find((item) => item == getFilterValue(tag))) {
                    middleArr.push(getFilterValue(tag));
                  }
                  if (index == data.tags.length - 1) {
                    setCTagMiddleStore([...cTagMiddleStore, ...middleArr]);
                    cTagData = [...cTagMiddleStore, ...middleArr];
                    setCTags(cTagData);
                  }
                });
                // if (data.hasNextPage == "Yes") {
                //   setTotalCounter(totalCounter + data.productsCount);
                //   let tags = cTagMiddleStore;
                //   data.tags.map((tag, index) => {
                //     if (!tags.find((item) => item == getFilterValue(tag))) {
                //       middleArr.push(getFilterValue(tag));
                //     }
                //     if (index == data.tags.length - 1) {
                //       setCTagMiddleStore([...cTagMiddleStore, ...middleArr]);
                //       cTagData = [...cTagMiddleStore, ...middleArr];
                //       setCTags(cTagData);
                //     }
                //   });
                //   setCTagLastAdd(data.last);
                // } else {
                //   localResultCounter = totalCounter + data.productsCount;
                //   setResult(localResultCounter);
                // }
              });
          }
        }
        setFilterMounted(true);
      }
    }
  }, [cTagLastAdd, productType, checking]);

  useEffect(() => {
    if (cTags.length) {
      if (basicSettingFilter) {
        let middleArr = [];
        basicSettingFilter.map((item, index) => {
          if (cTags.find((ctag) => ctag == getFilterValue(item))) {
            middleArr.push({ label: item, value: getFilterValue(item) });
          }
          if (index == basicSettingFilter.length - 1) {
            setSettingFilter(middleArr);
          }
        });
      }
    }
  }, [cTags, basicSettingFilter]);

  useEffect(() => {
    if (tag) {
      setCheckingStatus(true);
      setChecking(!checking);
      let defaultProductType = checkedProductType.length
        ? (
            checkedProductType.map(
              (item, index) =>
                item &&
                (index == 0
                  ? " AND (product_type:" + item
                  : " OR product_type:" + item)
            ) + ")"
          ).replaceAll(",", "")
        : "";
      let defaultTags = "";
      if (tag.length > 0)
        if (tag[tag.length - 1] == "jewelry") {
          defaultTags = (
            tag.map((item, index) =>
              index + 1 < tag.length
                ? (index == 0 ? " AND (tag:" + item : " OR tag:" + item) + ")"
                : ""
            ) + " AND tag:jewelry"
          ).replaceAll(",", "");
        } else {
          defaultTags = (
            tag.map((item, index) =>
              index == 0 ? " AND (tag:" + item : " OR tag:" + item
            ) + ")"
          ).replaceAll(",", "");
        }

      if (checked0.length || mounted) {
        setLoad(true);
        check0 = checked0;
        check1 = checked1;
        check2 = checked2;
        check3 = checked3;
        check4 = checked4;
        check5 = checked5;
        check6 = checked6;
        check7 = checked7;
        check8 = checked8;
        check9 = checked9;
        check10 = checked10;
        check11 = checked11;

        let query0 =
          checked0.length > 0
            ? (
                checked0.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query1 =
          checked1.length > 0
            ? (
                checked1.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query2 =
          checked2.length > 0
            ? (
                checked2.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query3 =
          checked3.length > 0
            ? (
                checked3.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query4 =
          checked4.length > 0
            ? (
                checked4.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query5 =
          checked5.length > 0
            ? (
                checked5.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query6 =
          checked6.length > 0
            ? (
                checked6.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query7 =
          checked7.length > 0
            ? (
                checked7.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query8 =
          checked8.length > 0
            ? (
                checked8.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query9 =
          checked9.length > 0
            ? (
                checked9.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query10 =
          checked10.length > 0
            ? (
                checked10.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";
        let query11 =
          checked11.length > 0
            ? (
                checked11.map((filter, index) =>
                  index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
                ) + ")"
              ).replaceAll(",", "")
            : "";

        {
          /* if(router.asPath == "/shop") {
              if(!defaultProductType && !query0 &&!query1 && !query2 &&!query3 &&!query4 &&!query5 &&!query6 &&!query7 &&!query8 &&!query9 &&!query10&&!query11) {
                defaultTags = (
              tag.map((item, index) =>
                index == 0 ? " AND (tag:" + item : " OR tag:" + item
              ) + ")"
             ).replaceAll(",", "");
            } else {
              defaultTags = ''
            } 
            }
          */
        }
        let data = new FormData();

        setLoad(true);
        data.append("position", "first:9");
        if (tag.length && router.asPath != "/shop") {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "status:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" +
                defaultProductType +
                defaultTags +
                query0 +
                query1 +
                query2 +
                query3 +
                query4 +
                query5 +
                query6 +
                query7 +
                query8 +
                query9 +
                query10 +
                query11
            );
          }
        } else {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "status:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags +
                  query0 +
                  query1 +
                  query2 +
                  query3 +
                  query4 +
                  query5 +
                  query6 +
                  query7 +
                  query8 +
                  query9 +
                  query10 +
                  query11
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" +
                query0 +
                defaultProductType +
                defaultTags +
                query1 +
                query2 +
                query3 +
                query4 +
                query5 +
                query6 +
                query7 +
                query8 +
                query9 +
                query10 +
                query11
            );
          }
        }
        setFormData(data);
      } else {
        // if (productStore.length) {
        //   // setProductData(productStore);
        //   // setLastProduct(lastProductStatus);
        //   if (localStorage.wishList) {
        //     props.setWishList(JSON.parse(localStorage.wishList));
        //   }
        // } else {
        setLoad(true);
        let data = new FormData();
        data.append("position", "first:9");
        if (tag.length) {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "status:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags +
                  defaultProductType
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultTags +
                  defaultProductType
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" + defaultTags + defaultProductType
            );
          }
        } else {
          if (productType) {
            if (productType == "watches") {
              data.append(
                "query",
                "status:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags
              );
            } else {
              data.append(
                "query",
                "tag:active AND " +
                  (productType == "pendants"
                    ? "(product_type:" +
                      productType +
                      " OR product_type:necklaces)"
                    : "product_type:" + productType) +
                  defaultProductType +
                  defaultTags
              );
            }
          } else {
            data.append(
              "query",
              "tag:active" + defaultProductType + defaultTags
            );
          }
        }
        setFormData(data);
        // }
      }
      setMounted(true);
    }
  }, [
    checked0,
    checked1,
    checked2,
    checked3,
    checked4,
    checked5,
    checked6,
    checked7,
    checked8,
    checked9,
    checked10,
    checked11,
    checkedProductType,
    tag,
  ]);

  const setFavor = (event, product) => {
    let target = event.target.closest(".favor-icon");
    if (target.classList.contains("favor")) {
      target.classList.remove("favor");
      let localProducts = props.wishList;
      let removeProduct = localProducts.find(
        (item) => item.shopifyid == product.shopifyid
      );
      if (removeProduct) {
        localProducts.splice(localProducts.indexOf(removeProduct), 1);
        props.setWishList(localProducts);
      }
    } else {
      target.classList.add("favor");
      let formData = new FormData();
      formData.append("shopifyid", product.shopifyid);
      fetch(getProductURL, {
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (localStorage.wishList) {
            props.setWishList([
              ...props.wishList,
              {
                ...product,
                amount: 1,
                product_type: productType,
                description: data.body_html,
              },
            ]);
          } else {
            localStorage.setItem(
              "wishList",
              JSON.stringify([
                {
                  ...product,
                  amount: 1,
                  product_type: productType,
                  description: data.body_html,
                },
              ])
            );
            props.setWishList([
              {
                ...product,
                amount: 1,
                product_type: productType,
                description: data.body_html,
              },
            ]);
          }
        });
    }
  };

  const filterHandle = (event, index) => {
    let target = event.target.closest(".filter-item");
    if (target.classList.contains("active")) {
      let removeItem = selectFilter.indexOf(filterItems[index].text);
      if (!removeItem) {
        selectFilter.splice(removeItem, 1);
        setSelectFilter([...selectFilter]);
      } else {
        selectFilter.splice(-1, 1);
      }
      target.classList.remove("active");
    } else {
      target.classList.add("active");
      setSelectFilter([...selectFilter, filterItems[index].text]);
    }
  };

  const loadMore = () => {
    setLoadMoreStatus(true);
    let formData = new FormData();
    let defaultProductType =
      checkedProductType.length > 0
        ? (
            checkedProductType.map(
              (item, index) =>
                item &&
                (index == 0
                  ? " AND (product_type:" + item
                  : " OR product_type:" + item)
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let defaultTags = (
      tag[tag.length - 1] == "jewelry"
        ? tag.map((item, index) =>
            index + 1 < tag.length
              ? index == 0
                ? " AND (tag:" + item
                : " OR tag:" + item
              : ""
          ) +
          ")" +
          " AND tag:jewelry"
        : tag.map((item, index) =>
            index == 0 ? " AND (tag:" + item : " OR tag:" + item
          ) + ")"
    ).replaceAll(",", "");
    let query0 =
      checked0.length > 0
        ? (
            checked0.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query1 =
      checked1.length > 0
        ? (
            checked1.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query2 =
      checked2.length > 0
        ? (
            checked2.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query3 =
      checked3.length > 0
        ? (
            checked3.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query4 =
      checked4.length > 0
        ? (
            checked4.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query5 =
      checked5.length > 0
        ? (
            checked5.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query6 =
      checked6.length > 0
        ? (
            checked6.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query7 =
      checked7.length > 0
        ? (
            checked7.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query8 =
      checked8.length > 0
        ? (
            checked8.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query9 =
      checked9.length > 0
        ? (
            checked9.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query10 =
      checked10.length > 0
        ? (
            checked10.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";
    let query11 =
      checked11.length > 0
        ? (
            checked11.map((filter, index) =>
              index == 0 ? " AND (tag:" + filter : " OR tag:" + filter
            ) + ")"
          ).replaceAll(",", "")
        : "";

    {
      /* if(router.asPath == "/shop") {
      if(!defaultProductType && !query0 &&!query1 && !query2 &&!query3 &&!query4 &&!query5 &&!query6 &&!query7 &&!query8 &&!query9 &&!query10 &&!query11) {
        defaultTags = (
      tag.map((item, index) =>
        index == 0 ? " AND (tag:" + item : " OR tag:" + item
      ) + ")"
    ).replaceAll(",", "");
      } else {
        defaultTags = ''
      } 
    } */
    }
    formData.append("position", `first:9, after:"${lastProduct}"`);
    if (tag.length) {
      if (productType) {
        if (productType == "watches") {
          formData.append(
            "query",
            "status:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultTags +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        } else {
          formData.append(
            "query",
            "tag:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultTags +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        }
      } else {
        formData.append(
          "query",
          "tag:active" +
            defaultTags +
            defaultProductType +
            query0 +
            query1 +
            query2 +
            query3 +
            query4 +
            query5 +
            query6 +
            query7 +
            query8 +
            query9 +
            query10 +
            query11
        );
      }
    } else {
      if (productType) {
        if (productType == "watches") {
          formData.append(
            "query",
            "status:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        } else {
          formData.append(
            "query",
            "tag:active AND " +
              (productType == "pendants"
                ? "(product_type:" + productType + " OR product_type:necklaces)"
                : "product_type:" + productType) +
              defaultProductType +
              query0 +
              query1 +
              query2 +
              query3 +
              query4 +
              query5 +
              query6 +
              query7 +
              query8 +
              query9 +
              query10 +
              query11
          );
        }
      } else {
        formData.append(
          "query",
          "tag:active" +
            defaultProductType +
            query0 +
            query1 +
            query2 +
            query3 +
            query4 +
            query5 +
            query6 +
            query7 +
            query8 +
            query9 +
            query10 +
            query11
        );
      }
    }
    fetch(productURL, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        data.hasNextPage == "Yes"
          ? setLastProduct(data.last)
          : setLastProduct(false);
        setProductData([...productData, ...data.data]);
        setLoadMoreStatus(false);
      });
  };

  const handleMenuBtn = (e) => {
    e.target
      .closest(".offcanvas-body")
      .querySelectorAll("button")
      .forEach((element) => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      });
    e.target.closest("button").classList.add("active");
  };

  return (
    <div className="ring_page">
      <Head>
        <title>{productType ? productType : "Products"} | Royal Coster</title>
      </Head>
      <Header />
      {/* Start hero section */}
      <div
        className="hero-section"
        style={
          bgImage && {
            backgroundImage: "url(/img/ring/hero_bg/" + bgImage + ".jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        }
      >
        <div className="r-container">
          <h1 className="title text-white text-capitalize">
            {productType ? productType : "Products"}
          </h1>
        </div>
      </div>
      {/* End Hero section */}

      {/* Start product section */}
      <div className="product-section r-container py-4">
        <div className="top-bar row align-items-center m-0 py-3">
          <div className="title-panel col-md-6 col-12 p-0 pb-md-0 pb-3">
            {tag && (
              <h2 className="text-capitalize">
                {productType
                  ? tag.length > 0
                    ? tag[0] + " " + productType
                    : "" + productType
                  : "Products"}
              </h2>
            )}
            {/* {result > 0 && <p className="text-uppercase">{result} results</p>} */}
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end flex-sm-row flex-column p-0 pt-3 pt-md-0">
            <button
              className="btn d-sm-none d-flex btn-filter round-form justify-content-between align-items-center px-4 py-3 mb-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterMenu"
              aria-controls="filterMenu"
            >
              <div className="text-uppercase d-flex align-items-center">
                <RiFilter3Fill className="me-3" />
                Filter
              </div>
              <RiArrowRightSLine />
            </button>
            <div className="search-box round-form d-flex align-items-center py-2">
              <label htmlFor="selectSearch" className="px-4">
                SORT BY :{" "}
              </label>
              <SelectSearch
                id="selectSearch"
                options={options}
                value={selectValue}
                onChange={(value) => {
                  setSelectValue(value);
                }}
                filterOptions={fuzzySearch}
                emptyMessage="Not found"
                search
              />
            </div>
          </div>
        </div>
        {/* <div className="top-filter-bar d-sm-flex d-none justify-content-between align-items-center flex-wrap py-4">
          {filterItems.map((item, index) => {
            return (
              <button
                className="btn filter-item round-form mt-3"
                key={index}
                onClick={(event) => filterHandle(event, index)}
              >
                <div className="image-panel text-center">
                  <img src={"/img/ring/" + item.img} alt="filter-image" />
                </div>
                <h3 className="blue-text text-uppercase">{item.text}</h3>
              </button>
            );
          })}
        </div> */}
        <div className="main-panel d-flex justify-content-end m-0 py-5 flex-wrap">
          {cTags && cTags.length > 0 && (
            <div className="col-lg-3 col-md-4 col-sm-5 col-12 d-sm-block d-none p-0 pe-sm-4 pe-0 mb-sm-0 mb-5 left-filter-bar">
              {productTypeFilter && productTypeFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#productType"
                      data-bs-toggle="collapse"
                    >
                      Product Type
                    </button>
                  </h2>
                  <div id="productType" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={productTypeFilter}
                        checked={checkedProductType}
                        expanded={expanded}
                        onCheck={(checkValue) =>
                          setCheckedProductType(checkValue)
                        }
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {collectionFilter && collectionFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#collectionTree"
                      data-bs-toggle="collapse"
                    >
                      collection
                    </button>
                  </h2>
                  <div
                    id="collectionTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={collectionFilter}
                        checked={checked1}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked1(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {stoneFilter && stoneFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#stoneTree"
                      data-bs-toggle="collapse"
                    >
                      stone
                    </button>
                  </h2>
                  <div id="stoneTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={stoneFilter}
                        checked={checked5}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked5(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {caratFilter && caratFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#caratTree"
                      data-bs-toggle="collapse"
                    >
                      carat
                    </button>
                  </h2>
                  <div id="caratTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={caratFilter}
                        checked={checked1}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked1(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {materialColorFilter && materialColorFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#materialColorTree"
                      data-bs-toggle="collapse"
                    >
                      color
                    </button>
                  </h2>
                  <div
                    id="materialColorTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={materialColorFilter}
                        checked={checked9}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked9(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {brightnessFilter && brightnessFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#brightnessTree"
                      data-bs-toggle="collapse"
                    >
                      clarity
                    </button>
                  </h2>
                  <div
                    id="brightnessTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={brightnessFilter}
                        checked={checked6}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked6(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {cutFilter && cutFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#cutTree"
                      data-bs-toggle="collapse"
                    >
                      cut
                    </button>
                  </h2>
                  <div id="cutTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={cutFilter}
                        checked={checked7}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked7(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {metarialFilter && metarialFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#metarialTree"
                      data-bs-toggle="collapse"
                    >
                      material
                    </button>
                  </h2>
                  <div
                    id="metarialTree"
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={metarialFilter}
                        checked={checked8}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked8(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {priceFilter && priceFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#priceTree"
                      data-bs-toggle="collapse"
                    >
                      price
                    </button>
                  </h2>
                  <div id="priceTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={priceFilter}
                        checked={checked0}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked0(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {styleFilter && styleFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#styleTree"
                      data-bs-toggle="collapse"
                    >
                      style
                    </button>
                  </h2>
                  <div id="styleTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={styleFilter}
                        checked={checked2}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked2(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {brandFilter && brandFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#brandTree"
                      data-bs-toggle="collapse"
                    >
                      brand
                    </button>
                  </h2>
                  <div id="brandTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={brandFilter}
                        checked={checked4}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked4(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {settingFilter && settingFilter.length > 0 && (
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                      data-bs-target="#settingTree"
                      data-bs-toggle="collapse"
                    >
                      setting
                    </button>
                  </h2>
                  <div id="settingTree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <CheckboxTree
                        nodes={settingFilter}
                        checked={checked11}
                        expanded={expanded}
                        onCheck={(checkValue) => setChecked11(checkValue)}
                        onExpand={(expandValue) => setExpanded(expandValue)}
                        icons={checkTreeIcons}
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* {mountingFilter && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#mountingTree"
                    data-bs-toggle="collapse"
                  >
                    mounting
                  </button>
                </h2>
                <div id="mountingTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={mountingFilter}
                      checked={checked3}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked3(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )} */}
            </div>
          )}
          {/* {false ? ( */}
          {!load && productData && productData.length > 0 ? (
            <div className="col-lg-9 col-md-8 col-sm-7 col-12 p-0 product-panel m-0">
              <div className="row m-0">
                {productData.map((item, index) => {
                  return (
                    <div
                      className="product-item col-lg-4 col-md-6 col-sm-12 mb-4"
                      key={index}
                    >
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
                        <a>
                          <div className="product-image hover-scale d-flex justify-content-center align-items-center round">
                            <img src={item.image} alt="product-image" />
                          </div>
                          <h3 className="text-uppercase blue-text my-4 m-0">
                            {item.title}
                          </h3>
                          <p className="pb-4 text-uppercase m-0">
                            {productType && (
                              <span className="me-2">{productType}</span>
                            )}
                          </p>
                          {+item.Fullprice > +item.price ? (
                            <div className="d-flex price-panel">
                              <h4 className="blue-text me-3">
                                <NumberFormat
                                  value={item.price}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h4>
                              <h4 className="full-price text-decoration-line-through">
                                <NumberFormat
                                  value={item.Fullprice}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h4>
                            </div>
                          ) : (
                            <div className="price-panel">
                              <h4 className="blue-text me-3">
                                <NumberFormat
                                  value={item.price}
                                  displayType="text"
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  thousandSeparator={true}
                                  prefix="€ "
                                />
                              </h4>
                            </div>
                          )}
                        </a>
                      </Link>
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
                    </div>
                  );
                })}
              </div>
              {loadMoreStatus && (
                <div className="mt-4 row m-0">
                  <div className="col-lg-4 col-md-6 col-12">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                    <Skeleton
                      animation="wave"
                      variant="rect"
                      width="100%"
                      height={300}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width={100}
                      height={20}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      width="100%"
                      height={40}
                    />
                  </div>
                </div>
              )}
              {lastProduct && (
                <button
                  className="btn load-more-btn text-uppercase py-3 px-5 mt-3 round-form"
                  onClick={loadMore}
                >
                  Load More
                </button>
              )}
            </div>
          ) : !load ? (
            <h3 className="none-text text-center flex-fill p-0">No product</h3>
          ) : (
            <div className="col-lg-9 col-md-8 col-sm-7 col-12 p-0 row m-0">
              <div className="col-lg-4 col-md-6 col-12">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-12 d-lg-block d-none">
                <Skeleton
                  animation="wave"
                  variant="rect"
                  width="100%"
                  height={300}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={100}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End product section */}
      {/* Start Collection section */}
      <div className="collection-section">
        <Collection />
        <div className="shadow-pink" />
        <div className="shadow-blue" />
      </div>
      {/* End Collection section */}
      {/* Start Schedule section */}
      <Schedule />
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="filterMenu"
        aria-labelledby="filterMenuLabel"
      >
        <div className="offcanvas-header py-4 p-0">
          <div className="r-container d-flex justify-content-between align-items-center">
            <h3 id="filterMenuLabel" className="text-uppercase mb-0 py-2">
              Filter
            </h3>
            <button
              type="button"
              className="btn btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div className="offcanvas-body r-container pt-2 p-0">
          <div className="r-container row pt-4">
            {productTypeFilter && productTypeFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#productType"
                    data-bs-toggle="collapse"
                  >
                    ProductType
                  </button>
                </h2>
                <div id="productType" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={productTypeFilter}
                      checked={checkedProductType}
                      expanded={expanded}
                      onCheck={(checkValue) =>
                        setCheckedProductType(checkValue)
                      }
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {collectionFilter && collectionFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#collectionTree"
                    data-bs-toggle="collapse"
                  >
                    collection
                  </button>
                </h2>
                <div
                  id="collectionTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={collectionFilter}
                      checked={checked1}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked1(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {stoneFilter && stoneFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#stoneTree"
                    data-bs-toggle="collapse"
                  >
                    stone
                  </button>
                </h2>
                <div id="stoneTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={stoneFilter}
                      checked={checked5}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked5(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {caratFilter && caratFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#caratTree"
                    data-bs-toggle="collapse"
                  >
                    carat
                  </button>
                </h2>
                <div id="caratTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={caratFilter}
                      checked={checked1}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked1(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {materialColorFilter && materialColorFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#materialColorTree"
                    data-bs-toggle="collapse"
                  >
                    color
                  </button>
                </h2>
                <div
                  id="materialColorTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={materialColorFilter}
                      checked={checked9}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked9(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {brightnessFilter && brightnessFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#brightnessTree"
                    data-bs-toggle="collapse"
                  >
                    clarity
                  </button>
                </h2>
                <div
                  id="brightnessTree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={brightnessFilter}
                      checked={checked6}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked6(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {cutFilter && cutFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#cutTree"
                    data-bs-toggle="collapse"
                  >
                    cut
                  </button>
                </h2>
                <div id="cutTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={cutFilter}
                      checked={checked7}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked7(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {metarialFilter && metarialFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#metarialTree"
                    data-bs-toggle="collapse"
                  >
                    material
                  </button>
                </h2>
                <div id="metarialTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={metarialFilter}
                      checked={checked8}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked8(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {priceFilter && priceFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#priceTree"
                    data-bs-toggle="collapse"
                  >
                    price
                  </button>
                </h2>
                <div id="priceTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={priceFilter}
                      checked={checked0}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked0(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {styleFilter && styleFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#styleTree"
                    data-bs-toggle="collapse"
                  >
                    style
                  </button>
                </h2>
                <div id="styleTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={styleFilter}
                      checked={checked2}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked2(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
            {brandFilter && brandFilter.length > 0 && (
              <div className="accordion-item mb-3">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button blue-text collapsed text-uppercase py-3 ps-4"
                    data-bs-target="#brandTree"
                    data-bs-toggle="collapse"
                  >
                    brand
                  </button>
                </h2>
                <div id="brandTree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <CheckboxTree
                      nodes={brandFilter}
                      checked={checked4}
                      expanded={expanded}
                      onCheck={(checkValue) => setChecked4(checkValue)}
                      onExpand={(expandValue) => setExpanded(expandValue)}
                      icons={checkTreeIcons}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End Schedule section */}
      {/* Start Footer */}
      <Footer />
      {/* End Footer */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  wishList: state.wishList.value,
});

const mapDispatchToProps = {
  setWishList: setWishList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ring);
