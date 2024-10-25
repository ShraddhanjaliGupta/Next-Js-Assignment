import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ProductList.module.css'; 

export async function getStaticProps() {
  const res = await fetch('http://localhost:3005/products');
  const products = await res.json();

  return {
    props: {
      products,
    },
    revalidate: 10, 
  };
}

export default function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filterByCategory = (category) => {
    if (category === 'All') {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product List</h1>
      <div>
        <button className={styles.button} onClick={() => filterByCategory('All')}>All</button>
        <button className={styles.button} onClick={() => filterByCategory('Category A')}>Category A</button>
        <button className={styles.button} onClick={() => filterByCategory('Category B')}>Category B</button>
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <Link href={`/products/${product.id}`} className={styles.productLink}>
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
