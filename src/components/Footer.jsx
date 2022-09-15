import styles from '../assets/styles/modules/footer.module.scss';
import gitHubLogo from "../assets/images/logo.png";

function Footer() {
  return <div className={styles.footer}>
    <p className={styles.text}>Project by Anna Begisheva</p>
    <div className={styles.logo}>
                <a href="https://github.com/AnnaBegisheva">
                    <img src={gitHubLogo} alt="github-logo"/>
                </a>
            </div>
    </div>;
}

export default Footer;
