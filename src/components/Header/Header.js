import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/PGA_Logo.svg"

const Header = (props) =>{
    return(
        <header className={styles.Header}>
            <img src={logo} className={styles.Logo} alt="pga logo" />
        </header>
    );
}

export default Header;
