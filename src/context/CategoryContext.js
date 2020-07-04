import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const CategoryContext = createContext();

export const CategoryProvider = props => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then(res => setCategories(res.data.categoreies))
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
