import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className="z-50 flex h-dvh w-full items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="flex h-60 w-80 items-center justify-center">
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}

export default Loader;
