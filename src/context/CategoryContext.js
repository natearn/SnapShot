import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const CategoryContext = createContext();

export const CategoryProvider = props => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: use a schema validator library
  const parseCategories = res => {
    const { categories } = res.data;
    if (categories instanceof Array) {
      return categories;
    } else {
      throw Error("Response categories is not an Array");
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then(parseCategories)
      .then(setCategories)
      .catch(err => console.error("Error: GET /categories", err))
      .finally(() => setLoading(false))
  },[]);
  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
