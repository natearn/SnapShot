import React from 'react';
import { NavLink } from 'react-router-dom';
import CategoryContext from '../context/CategoryContext';

const Navigation = () => {
  const { categories } = useContext(CategoryContext);
  return (
    <nav className="main-nav">
      <ul>
        {catgories.map(category => (
          <li key={category}>
            <NavLink to=`/${category}`>
              {category}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
