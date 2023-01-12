import styles from "../styles/MediaList.module.css";

const ListMedia = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.mediaArticle}>
        <p className={styles.data}>{props.articleData}</p>
        <div className={styles.articleText}>
          <h2>{props.articleTitle}</h2>
          <p>{props.articleText}</p>
        </div>
      </div>
    </div>
  );
};

export default ListMedia;
