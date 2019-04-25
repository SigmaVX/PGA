import React, {Component} from "react";
import style from "./ModalSmall.module.css";
import Backdrop from "../Backdrop/Backdrop";

// Using Class To Have Access To Lifecycle Method
class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        // Returns true if props changes which allows the modal to be updated (false stops update)
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    render(){
        let modalClass;
        if (this.props.showModal){
            modalClass=`${style.Modal} ${style.show}` 
        } else {
            modalClass=`${style.Modal} ${style.hide}`
        }

        return(
            <React.Fragment>
                <Backdrop show={this.props.showModal} clicked={this.props.closeModal}/>
                <div className={modalClass} style={this.props.style}>
                    <h3 className={style.ModalTitle}>{this.props.title}</h3>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    } 
};


export default Modal;