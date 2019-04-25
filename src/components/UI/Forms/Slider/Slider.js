import React from 'react';
import styles from "./Slider.module.css";

const Slider = (props) => {

 
    return (
        <div className={styles.SlideContainer}>
            <input 
                className={styles.Slider} 
                type="range" 
                min={props.min} 
                max={props.max} 
                name={props.name}
                value={props.value} 
                onChange={props.onChange}    
            />
            <p className={styles.ZoomText}>Zoom Setting: {props.value}</p>         
        </div>
    )
}

export default Slider;

