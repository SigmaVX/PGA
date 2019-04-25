import React from 'react';
import styles from "./Button.module.css";

const Button = (props) => {

  let buttonStyle = null;

  switch(props.buttonType){
    case("default"): 
      buttonStyle = styles.ButtonDefault; 
      break;
    case("success"): 
      buttonStyle = styles.ButtonSuccess; 
      break;
    case("danger"): 
      buttonStyle = styles.ButtonDanger; 
      break;
    default: buttonStyle = styles.ButtonDefault;

  }

  return (
    <React.Fragment>
      <button className={buttonStyle} onClick={props.onClick} disabled={props.disable}>
        {props.children}
      </button>
    </React.Fragment>
  )
}

export default Button;