// import React from "react";
import styles from "./AddButton.module.scss";
import { FaPlus } from "react-icons/fa";

// onClick={}
export default function AddButton() {
  return (
    <>
      <button type="button" className={styles.addButton}>
        <FaPlus className={styles.plusIcon} />
      </button>
    </>
  );
}
