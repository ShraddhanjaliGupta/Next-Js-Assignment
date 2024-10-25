
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/ProductList.module.css'; 

export async function getServerSideProps(context) {
    const category = context.query.category || 'All';
    const res = await fetch(`http://localhost:3005/products${category !== 'All' ? `?category=${category}` : ''}`);
    const products = await res.json();
  
    return {
      props: {
        products,
        selectedCategory: category,
      },
    };
  }

export default function ProductList({ products}) {
    const router = useRouter();
  
    const filterByCategory = (category) => {
      router.push(`/products?category=${category}`);
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
          {products.map(product => (
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
