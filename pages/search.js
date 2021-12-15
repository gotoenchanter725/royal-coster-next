import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/header";
import NumberFormat from "react-number-format";
import Skeleton from "@mui/material/Skeleton";

const searchApi = process.env.NEXT_PUBLIC_SEARCH_URL

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

export default function Search() {
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState();
  const [productResult, setProductResult] = useState();
  const [educationResult, setEducationResult] = useState();
  const [articleResult, setArticleResult] = useState();
  const [showResult, setShowResult] = useState();
  const [selectBtn, setSelectBtn] = useState('product')
  const router = useRouter();

  useEffect(() => {
    if(router.query.query) {
      const keyword = router.query.query;
      const formData = new FormData();

      setSelectBtn('product')

      formData.append('page', page);
      formData.append('query', keyword);

      fetch(searchApi, {
        method: 'post',
        body: formData
      }).then(res => res.json())
      .then(data => {
        setSearchData(data);
      })
    }
  }, [router.query]);

  useEffect(() => {
    if(searchData) {
      const productItems = searchData.searchResults.filter(item => item.object_type == 'product');
      const educationItems = searchData.searchResults.filter(item => item.object_type == 'education');
      const articleItems = searchData.searchResults.filter(item => item.object_type == 'article');
      if(productItems.length) {
        setSelectBtn('product')
        setShowResult(productItems)
      } else if (educationItems.length) {
        setSelectBtn('education');
        setShowResult(educationItems)
      } else {
        setSelectBtn('article')
        setShowResult(articleItems)
      }
      setProductResult(productItems);
      setEducationResult(educationItems);
      setArticleResult(articleItems);
    }
  }, [searchData])

  return (
    <div className="search_page">
      <Head>
        <title>Search | Royal Coster</title>
      </Head>
      <Header />
      <div className="r-container">
        <div className="title-panel">
          <h3 className="title">
            Search for <span className="text-capitalize">{searchData && ('" ' + searchData.searchTerms + ' "')}</span>
          </h3>
          {/*<p className="result">{searchData?.paginateItems} Results</p>*/}
        </div>
        <div className="result-panel">
          <div className="btn-panel d-flex justify-content-between align-items-sm-center align-items-end flex-sm-row flex-column">
            <div className="left-panel w-sm-auto w-100 d-flex align-items-center justify-content-sm-start justify-content-between">
              {productResult && productResult.length > 0 && 
                <button className={"btn select-btn p-0 " + (selectBtn == "product" && "active")} 
                onClick={() => {
                  setSelectBtn('product');
                  setShowResult(productResult)}
                }
                >
                  Products
                  {/* {" (" + productResult.length + ")"}*/}
                </button>
              }
              {educationResult && educationResult.length > 0 &&
                <button className={"btn select-btn p-0 " + (selectBtn == "education" && "active")} 
                  onClick={() => {
                    setSelectBtn('education');
                    setShowResult(educationResult);
                  }}
                >
                  Education
                  {/*{" (" + educationResult.length + ")"}*/}
                </button>
              }
              {articleResult && articleResult.length > 0 &&          
                <button className={"btn select-btn p-0 " + (selectBtn == "article" && "active")} 
                  onClick={() => {
                    setSelectBtn('article');
                    setShowResult(articleResult);
                  }}
                >
                  Articles
                  {/*{" (" + articleResult.length + ")"}*/}
                </button>
              }
            </div>
           {/* <button className="btn p-0 mt-sm-0 mt-4">
              View All{
                (searchData?.paginateItems && (
                    " ( " + (
                    searchData?.paginateItems < 1000 
                    ? searchData?.paginateItems
                    : ("+" + ((searchData?.paginateItems - searchData?.paginateItems % 1000) / 1000) + "k"))
                    + " )" 
                  )
                )
              }
            </button>*/}
          </div>
          <div className="result_item-panel row">
          {
            showResult 
            ?(showResult.length > 0
              ? showResult.map((item, index) => 
                <div className="col-md-3 col-sm-6 result-item mb-4" key={index}>
                  <Link href={
                    item.object_type == 'product'
                    ?{
                      pathname: "/shop/[slug]",
                      query: {
                        slug:
                          item.item.handle + "-" + item.item.id,
                      },
                    }
                    :{
                      pathname: "/blog/[slug]",
                      query: {
                        slug: item.item.handle
                      }
                    }
                  }>
                    <div className="image-panel hover-scale round-form">
                      <img src={
                        item.object_type == "product"
                        ? item.item.media[0].src
                        : item.item.image.src
                      } alt="result-image"/>
                    </div>
                  </Link>
                  <p>{item.item.title}</p>
                  <h3>  
                    { item.object_type == "product" 
                      ? <NumberFormat
                          value={item.item.price}
                          displayType="text"
                          decimalScale={2}
                          fixedDecimalScale={true}
                          thousandSeparator={true}
                          prefix="€ "
                        />
                      : item.item.author  
                    }  
                    
                  </h3>
                </div>
              )
              : <h3 className="no-result text-center py-5">No Result</h3>
            )
            : <>
              <div className="col-md-3 col-sm-6">
                <div className="loading-panel">
                  <Skeleton variant="rect" width="100%" height="100%"/>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="loading-panel">
                  <Skeleton variant="rect" width="100%" height="100%"/>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 d-sm-block d-none">
                <div className="loading-panel">
                  <Skeleton variant="rect" width="100%" height="100%"/>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 d-sm-block d-none">
                <div className="loading-panel">
                  <Skeleton variant="rect" width="100%" height="100%"/>
                </div>
              </div>
            </>
            }
          </div>
        </div>
        {/*<div className="category-panel">
          <div className="top-panel d-flex align-items-center justify-content-between">
            <h3 className="title m-0">Categories</h3>
            <button className="btn p-0">View All</button>
          </div>
          <div className="btn-panel d-flex align-items-center flex-wrap">
            <button className="btn text-capitalize p-0">anniversary rings</button>
            <button className="btn text-capitalize p-0">engagement rings</button>
            <button className="btn text-capitalize p-0">fashion rings</button>
          </div>
        </div>
        <div className="collection-panel">
          <div className="top-panel d-flex align-items-center justify-content-between">
            <h3 className="title m-0">Collections</h3>
            <button className="btn p-0">View All</button>
          </div>
          <div className="btn-panel d-flex align-items-center flex-wrap">
            <button className="btn text-capitalize p-0">201 Collection</button>
            <button className="btn text-capitalize p-0">Rainbow Collection</button>
            <button className="btn text-capitalize p-0">Empress Collections</button>
            <button className="btn text-capitalize p-0">Empress Collections</button>
            <button className="btn text-capitalize p-0">Empress Collections</button>
          </div>
        </div>*/}
      </div>
    </div>
  );
}
