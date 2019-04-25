import React from 'react';
import styles from "./Input.module.css";

const Input = (props) => {

    let classes = styles.Input;
    let errorMessage = null;

    if(props.errorMsg){
        errorMessage = ( <p className={styles.ValidationError}>{props.errorMsg}</p>);
        classes = [styles.Input, styles.Error].join(" ");
    }

    return (
        <React.Fragment>
            <input
                className={classes}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
            />
            {errorMessage}

        </React.Fragment>
    )
}

export default Input;

