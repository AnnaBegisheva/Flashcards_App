import { Outlet } from "react-router-dom";
import styles from "../assets/styles/modules/main-page.module.scss";
import bgFolder from "../assets/images/folder.png";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";

const MainPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <MenuIcon fontSize="large" className={styles.burgerIcon} onClick = {() => setOpen(!open)} />
      {open && <BurgerMenu/>}
      <div className={styles.content}>
        <Sidebar/>
        <Outlet/>
        <div className={styles.folderImg}>
          <img src={bgFolder} alt="folder"></img>
        </div>
      </div>
      <Footer className={styles.footer}/>
    </div>
  );
}

export default MainPage;
