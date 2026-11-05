import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AuthorItems = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authorId } = useParams();

  useEffect(() => {
    async function fetchAuthorData() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
    setData(data);
    setIsLoading(false);
    } 
    fetchAuthorData();
  }, [authorId]);
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {data.nftCollection?.map((nft) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    {isLoading ? <Skeleton /> : <img className="lazy" src={data.authorImage} alt="" />}
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to="/item-details">
                    {isLoading ? <Skeleton /> : (
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    )}
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    {isLoading ? <Skeleton /> : <h4>{nft.title}</h4>}
                  </Link>
                  <div className="nft__item_price">{isLoading ? <Skeleton /> : `${nft.price} ETH`}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
