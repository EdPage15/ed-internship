import React, { useEffect, useState } from "react";
import axios from 'axios';
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { useParams } from "react-router-dom";

const Author = () => {
  const [data, setData] = useState([]);
  const { authorId } = useParams();
  const [buttonText, setButtonText] = useState("Follow");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  
  useEffect(() => {
      async function fetchAuthorData() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      setData(data);
      } 
      fetchAuthorData();
      setFollowersCount(data.followers);
  }, [authorId]);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
    setButtonText(buttonText === "Follow" ? "Unfollow" : "Follow");
    if (!isFollowing) {
      setFollowersCount(followersCount + 1);
    }
    else {
      setFollowersCount(data.followers);
    }
  }
  
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={data.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {data.authorName}
                          <span className="profile_username">{data.authorName}</span>
                          <span id="wallet" className="profile_wallet">
                            {data.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followersCount}</div>
                      <button className="btn-main" onClick={handleClick}>
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={data} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
