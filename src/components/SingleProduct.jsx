import { useParams } from "react-router-dom";
import React from "react";
import { useFetchSingleProductQuery } from "../api/API";
import { Link } from "react-router-dom";

const SingleProduct = () => {
    const { product_id } = useParams();
    console.log('Attempting to fetch product with ID:', product_id);
    console.log('Full URL would be:', `http://localhost:3000/api/products/${product_id}`);
    
    const { data, isLoading, isError, error } = useFetchSingleProductQuery(product_id);
    
    console.log('Product ID:', product_id);
    console.log('Data:', data);
    console.log('Loading:', isLoading);
    console.log('Error:', isError);
    console.log('Error Details:', error);

    if (isLoading) return (
        <section>
            <h2>Loading...</h2>
        </section>
    );

    if (isError) {
        console.log('Full error object:', error);
        return (
            <section>
                <h2>Error loading product</h2>
                <p>Error details: {error?.data?.message || error?.message || 'Unknown error'}</p>
            </section>
        );
    }

    if (!data) {
        return (
            <section>
                <h2>No product found</h2>
            </section>
        );
    }

    return (
        <section className="single-product-card">
            <img src={data.img_url} alt={data.name} />
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>${data.price}</p>
            <Link to={`/products/${data.id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(data.id)}>Delete</button>
        </section>
    );
};

export default SingleProduct;