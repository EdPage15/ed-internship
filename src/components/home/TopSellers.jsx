import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TopSellers = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTopSellers () {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`)
      setData(data)
      setIsLoading(false)
      
    }
    fetchTopSellers();
  }, []);

  console.log(data.authorID);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {data.map((seller) => (
                <li key={seller.id} data-aos="zoom-in">
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      {isLoading ? <Skeleton /> : (
                        <img
                          className="lazy pp-author"
                          src={seller.authorImage}
                          alt=""
                        />
                      )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>
                      {isLoading ? <Skeleton /> : seller.authorName}
                    </Link>
                    <span>{isLoading ? <Skeleton /> : `${seller.price} ETH`}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
