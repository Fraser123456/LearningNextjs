import React from "react";

//Components
import AddToCart from "../AddToCart";

//Styles
import styles from "./ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-actions justify-end">
          <AddToCart />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
