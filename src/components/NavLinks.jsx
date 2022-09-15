import styles from "../assets/styles/modules/sidebar.module.scss";
import { Link } from "react-router-dom";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

const NavLinks = (props) =>{
    return (
    <ul className={styles.menu}>
    <li className={styles.menuItem} onClick={props.onClick}>
      <Link to="/" className={styles.menuLink}>
        <MenuBookRoundedIcon className={styles.menuIcon}/>
        Learn
      </Link>
    </li>
    <li className={styles.menuItem} onClick={props.onClick}>
      <Link to="/training" className={styles.menuLink}>
      <SchoolRoundedIcon className={styles.menuIcon}/>
      Practice
      </Link>
    </li>
  </ul>
  )
}

export default NavLinks;