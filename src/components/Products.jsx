import { useAddToCartMutation, useFetchProductsQuery } from "../api/API";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const { data, isLoading, isError, error } = useFetchProductsQuery();
  const [addToCartMutation] = useAddToCartMutation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();



  const handleAddToCart = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    await addToCartMutation({ user_id: user.id, product_id: product.id });
  };

  if (isLoading) {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h2>Flag on the play!</h2>
      </section>
    );
  }

  return (
    <>
      <h2>Products</h2>
      <section className="products-container">
        {data.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <img
                className="product-image"
                src={product.img_url}
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">${product.price}</p>
                <div className="product-buttons">
                  <Link to={`/products/${product.id}`}>
                    <button className="Details-button">View Details</button>
                  </Link>
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Products;
