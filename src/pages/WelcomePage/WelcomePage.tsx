import styles from "./WelcomePage.module.css";
import macbookBoy1x from "../../assets/images/macbook-boy-1x.png";
import macbookBoy2x from "../../assets/images/macbook-boy-2x.png";
import { Icon } from "../../components/Icon/Icon";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className={styles.mainCont}>
      <div className={styles.cont}>
        <div className={styles.logoImgCont}>
          <div className={styles.imageCont}>
            <img
              className={styles.image}
              src={macbookBoy1x}
              srcSet={`${macbookBoy1x} 1x, ${macbookBoy2x} 2x`}
              alt="boy with macbook"
            />
          </div>
          <div className={styles.logoCont}>
            <Icon id="logo" size={48} />
            <h1 className={styles.logoContName}>Task Pro</h1>
          </div>
          <p className={styles.description}>
            Supercharge your productivity and take control of your tasks with
            Task Pro - Don't wait, start achieving your goals now!
          </p>
        </div>
        <div className={styles.btnCont}>
          <NavLink to="/auth/register" className={styles.regsiterButton}>
            Registration
          </NavLink>
          <NavLink to="/auth/login" className={styles.loginButton}>
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
