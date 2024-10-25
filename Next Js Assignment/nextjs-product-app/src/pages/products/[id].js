export async function getStaticPaths() {
    const res = await fetch('http://localhost:3005/products');
    const products = await res.json();
  
    const paths = products.map(product => ({
      params: { id: product.id.toString() }
    }));
  
    return { paths, fallback: 'blocking' };
  }
  
  export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3005/products/${params.id}`);
    const product = await res.json();
  
    return {
      props: {
        product
      },
      revalidate: 10 
    };
  }
  
  export default function ProductDetails({ product }) {
    return (
      <div>
        <h1>{product.name}</h1>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
      </div>
    );
  }
  