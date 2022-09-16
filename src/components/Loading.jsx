import styles from "../assets/styles/modules/loading.module.scss";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.text}></div>
      </div>
    </div>
  );
}

export default Loading;
