import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h1>Bienvenido</h1>
      <button onClick={handleClick}>Home</button>
    </div>
  );
}

export default Landing;
