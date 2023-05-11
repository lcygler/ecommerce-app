import { Products } from '../../components/index';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <Products />
    </div>
  );
}

export default Home;
