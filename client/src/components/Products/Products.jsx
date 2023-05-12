import { Product } from '../../components/index';
import data from '../../data.json';
import styles from './Products.module.css';

function Products() {
  return (
    <div className={styles.container}>
      {/* <Product /> */}

      {data.map((item) => (
        <div key={item.id} className={styles.product}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img src={item.image} alt={item.name} className={styles.image} />
        </div>
      ))}
    </div>
  );
}

export default Products;
