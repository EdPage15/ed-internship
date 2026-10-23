import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Countdown from "../home/CountdownTimer";

const ExploreItems = () => {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [APIValue, setAPIValue] = useState(""); 
  
  useEffect(() => {
    async function fetchExploreItems() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${APIValue}`);
      setData(data);
      setVisibleCount(8); // Reset visible count when APIValue changes
    }
    fetchExploreItems();
  }, [APIValue]);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setAPIValue(e.target.value)}>
          <option value="" >Default</option>
          <option value="price_low_to_high"> Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {data.slice(0, visibleCount).map((nft) => (
        <div
          key={nft.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${nft.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={nft.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {nft.expiryDate && (
              <div className="de_countdown">
                <Countdown expiryDate={nft.expiryDate} />
              </div>
            )}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${nft.nftId}`}>
                <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${nft.nftId}`}>
                <h4>{nft.title}</h4>
              </Link>
              <div className="nft__item_price">{nft.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{nft.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => setVisibleCount(visibleCount => visibleCount + 4)}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
