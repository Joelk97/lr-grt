import styles from "../styles/BurgerIcon.module.css";
import { useState } from "react";

const BurgerIcon = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <svg
      className={styles.burgerIcon}
      onClick={() => setClicked(!clicked)}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={clicked ? styles.icon : ""}>
        <rect width="100" height="100" fill="#FFFDFA" />
        <rect
          className={styles.bkgRect}
          x="20"
          y="20"
          width="60"
          height="60"
          rx="13"
          fill="#87BB3F"
        />
        <rect
          className={
            clicked
              ? [styles.firstBar, styles.clicked].join(" ")
              : styles.firstBar
          }
          x="30"
          y="34"
          width="40"
          height="6"
          rx="2"
          fill="#FFFDFA"
        />

        <rect
          className={
            clicked
              ? [styles.secondBar, styles.clicked].join(" ")
              : styles.secondBar
          }
          x="30"
          y="47"
          width="40"
          height="6"
          rx="2"
          fill="#FFFDFA"
        />
        <rect
          className={
            clicked
              ? [styles.thirdBar, styles.clicked].join(" ")
              : styles.thirdBar
          }
          x="30"
          y="60"
          width="40"
          height="6"
          rx="2"
          fill="#FFFDFA"
        />
      </g>
    </svg>
  );
};
export default BurgerIcon;
