import NavLinks from "./NavLinks";
import styles from "../assets/styles/modules/burger-menu.module.scss";

const BurgerMenu = (props) => {
  return (
    <nav className={styles.container}>
      <NavLinks onClick={props.clickState}/>
    </nav>
  );
};

export default BurgerMenu;
