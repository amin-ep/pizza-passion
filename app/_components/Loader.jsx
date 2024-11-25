import React from "react";
import styles from "@/app/_styles/loading.module.css";

function Loader() {
  return (
    <div className="bg-transparent h-dvh w-full backdrop-blur-sm flex items-center justify-center z-50 ">
      <div className="w-80 h-60 flex items-center justify-center">
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}

export default Loader;
