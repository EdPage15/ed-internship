import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Countdown from "./CountdownTimer";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewItems = () => {
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
    async function fetchNewItems () {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setData(data)
      setIsLoading(false);
    }
    fetchNewItems();
  }, []);

  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container" data-aos="zoom-in-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
            {isLoading ? (<Skeleton />) : (
              <OwlCarousel className="owl-theme" loop margin={20} nav lazyLoad={true} {...options}>
                {data.map((nft) => (
                  <div className="nft__item" key={nft.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.expiryDate && (
                      <div>
                        <div className="de_countdown">
                          <Countdown expiryDate={nft.expiryDate} />
                        </div>
                      </div>
                    )}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="https://mail.google.com/">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${nft.nftId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${nft.nftId}`}>
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{nft.likes}</span>
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

export default NewItems;
