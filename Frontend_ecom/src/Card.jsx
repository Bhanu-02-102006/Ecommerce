

import "./Card.css";

function Card({ image, title, price }) {
  return (
    <>
      <div className="product-card">
        <img className="product-card__img" src={image} alt={title ?? "Product"} />
        <h1 className="product-card__title" title={title}>
          {title}
        </h1>
        <h2 className="product-card__price">${price}</h2>
      </div>
    </>
  );
}

export default Card
