import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const HotCollections = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    responsive: {
      0: {
        items: 1,
      },
      550: {
        items: 2,
      },
      980: {
        items: 3,
      },
      1200: {
        items: 4,
      }
    }
  }
  

  useEffect(() => {
    async function fetchHotCollections () {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
      setData(data)
      setIsLoading(false);
    }
    
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom" data-aos="zoom-in-up">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {data.length > 0 && (
            <OwlCarousel className="owl-theme" loop margin={20} nav lazyLoad={true} {...options}>
              {data.map((nft) => (
                <div className="carousel__item" key={nft.code}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${nft.nftId}`}>
                        {isLoading ? <Skeleton /> : <img src={nft.nftImage} className="lazy img-fluid" alt="" />}
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        {isLoading ? <Skeleton /> : <img className="lazy pp-coll" src={nft.authorImage} alt="" />}
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        {isLoading ? <Skeleton /> : <h4>{nft.title}</h4>}
                      </Link>
                      <span>{isLoading ? <Skeleton /> : `ERC-${nft.code}`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
