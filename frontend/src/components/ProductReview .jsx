import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductReview = ({ reviews }) => {
  return (
    <div className="mt-5">
      <h4 className="mb-4">Đánh giá sản phẩm</h4>
      {reviews.length === 0 && <p className="text-muted">Chưa có đánh giá nào.</p>}
      {reviews.map((review, index) => (
        <div key={index} className="border rounded p-3 mb-3 shadow-sm" >         
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>{review.name}</strong>            
          </div>
          <div>
            <small >{review.date}</small>
          </div>
          <div className="mb-2">
            
            {Array.from({ length: 5 }, (_, i) =>
              i < review.rating ? (
                <FaStar key={i} className="text-warning" />
              ) : (
                <FaRegStar key={i} />
              )
            )}
          </div>
          <p className="mb-0">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReview;
