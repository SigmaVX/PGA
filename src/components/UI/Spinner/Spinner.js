import React from "react";
import style from "./Spinner.module.css";
import ball from "../../../assets/images/golf-ball.svg";

const Spinner = () =>{
    return(
        <div className={style.Spinner}>
            <img src={ball} alt="golf ball" />
        </div>
    );
}

export default Spinner;