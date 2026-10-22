import React, { useEffect, useState } from "react";
import axios from 'axios';

const AuthorDataFetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchAuthorData() {
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=73855012`)
        setData(data);
        } 
        fetchAuthorData();
    }, []);
    console.log(data);
    return { data };
}

export default AuthorDataFetch;