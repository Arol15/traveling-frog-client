import React, { useState, useEffect } from "react";
import CollectionCard from "./CollectionCard";
import config from "../../config";
import "./Collections.css";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    const res = await fetch(`${config.baseUrl}/collections`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    (async () => {
      const collections = await getCollections();
      setCollections(collections);
    })();
  }, []);

  // console.log(collections)
  return (
    <div className="collections-container">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
};

export default Collections;
