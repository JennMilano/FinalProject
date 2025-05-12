import { useAddToCartMutation, useFetchProductsQuery } from "../api/API";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Products = () => {
    const { data, isLoading, isError } = useFetchProductsQuery();
    const [addToCartMutation] = useAddToCartMutation();s
    const user = useSelector((state) => state.auth.user);
  
    const dispatch = useDispatch();
  
    const handleAddToCart = async (product) => {
      console.log(user);
      console.log(product);
      await addToCartMutation({ user_id: user.id, product_id: product.id });
      dispatch(addToCart(product));
    };
    

    const getCorrectImageUrl = (productName) => {
        const imageMap = {
            "NFL Official Game Football": "https://i5.walmartimages.com/seo/Wilson-The-Duke-NFL-Football_d5908cdb-74bb-4b22-9dbe-056823b52f68.01f80822f0e5d1c489edf76db36fd693.jpeg",
            "NFL Team Jersey": "https://i01.hsncdn.com/is/image/HomeShoppingNetwork/rocs1200/officially-licensed-nfl-youth-brian-dawkins-2004-retire-d-20230720205237867~21582107w_alt3.jpg",
            "NFL Helmet Replica": "https://www.greengridiron.com/cdn/shop/products/BaltimoreRavensRiddellSpeedAuthentic01_1024x1024.jpg?v=1653507086",
            "NFL Team Cap": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ECfLKW5dukBcuRC3kPHFf-WKzQbwS6kazw&s"
        };
        return imageMap[productName] || "https://placehold.co/300x200?text=No+Image";
    };


 
    if (data) {
        console.log("Full product data:", JSON.stringify(data, null, 2));
    }

    if (isLoading) {
        return <section>
            <h2>Loading...</h2>
        </section>;
    };

    if (isError) {
        return <section>
            <h2>Flag on the play!</h2>
        </section>;
    };

    return (
        <>
            <h2>Products</h2>
            <section className="products-container">
                {data.map((product) => {
                    const correctImageUrl = getCorrectImageUrl(product.name);
                    console.log("Using image URL for", product.name, ":", correctImageUrl);
                   
                    
                    return (
                        <div key={product.id} className="product-card">
                            <img 
                                className="product-image" 
                                src={correctImageUrl}
                                alt={product.name}
                                onError={(e) => {
                                    console.error("Failed to load image:", correctImageUrl);
                                    e.target.src = "https://placehold.co/300x200?text=No+Image";
                                }}
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