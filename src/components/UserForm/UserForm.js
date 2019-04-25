import React, { Component } from 'react';
import styles from "./UserForm.module.css";
import Input from '../../components/UI/Forms/Input/Input';
import Button from "../../components/UI/Button/Button";
import Slider from '../../components/UI/Forms/Slider/Slider';
import ImageUpload from "../../components/UI/ImageUpload/ImageUpload";
const uuidv1 = require('uuid/v1');

class UserForm extends Component {

    state = {
        newUser: this.props.newUser,
        validForm: null,
        errorMessage: null,
        user: {
            id:{
                value: "",
                touched: false,
                validation: {
                    required: false,
                    valid: true
                }
            },
            firstName:{
                value: "",
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    valid: true,
                    errorMessage: "Required: Must Be At Least 2 Characters"
                }
            },
            lastName:{
                value: "",
                touched: false,
                validation: {
                    required: true,
                    minLength: 2,
                    valid: true,
                    errorMessage: "Required: Must Be At Least 2 Characters"
                }
            },
            score: {
                value: "",
                touched: false,
                validation: {
                    required: true,
                    minLength: 0,
                    maxLenght: 100,
                    valid: true,
                    errorMessage: "Required: Score Must Be 0 to 100"
                }
            },
            photoUrl: {
                value: "",
                touched: false,
                validation: {
                    required: true,
                    valid: false,
                    errorMessage: "Required: Please Upload A Photo"
                }
            }
        },
    }


    componentDidMount(){
        

    }

    // Set State From Inputs
    // inputChangeHandler = (event) => {
    //     event.preventDefault();
    //     let safeUpdateObject = {
    //         ...this.state,
    //         [event.target.name]: event.target.value,
    //     }
    //     this.setState(safeUpdateObject);
    // }

    formInputChangeHandler = (event, fieldName) =>{
        event.preventDefault();
        let safeUpdateObject = {
            ...this.state,
            user: {
                ...this.state.user,
                [fieldName]:{
                    ...this.state.user[fieldName],       
                    value: event.target.value,
                    touched: true,
                    validation: {
                        ...this.state.user[fieldName].validation,
                        valid: this.validationCheck(event.target.value, this.state.user[fieldName].validation)
                    } 
                }
            }
        }

        console.log("Safe Update: ", safeUpdateObject);
        this.setState(safeUpdateObject);
    }

    validationCheck = (value, rules) =>{
        let isValid = true;
        
        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
    
        if(rules.minLength){
            isValid = value.length > rules.minLength && isValid;
        }
    
        if(rules.maxLength){
            isValid = value.length < rules.maxLength && isValid; 
        }
    
        return isValid;
    }

    
    updateUser = () =>{
        
       let validForm = true;
       for(let key in this.state.user){
           if(!this.state.user[key].validation.valid) validForm = false;
       } 

       if(!validForm){
           let safeUpdateObject = {
               ...this.state,
               validForm: false,
               errorMessage: "Please Fix The Items Above Prior To Submitting"
           }

           this.setState(safeUpdateObject);

       } else {

            let id = this.state.id.value;
            if(id !== "") id = uuidv1(); 
         
            let sendObject = {
                newUser: this.state.newUser,
                id: id,
                firstName: this.state.user.firstName.value,
                lastName: this.state.user.lastName.value,
                score: this.state.user.score.value,
                photoUrl: this.state.user.photoUrl.value
            }

            this.props.sendToParent(sendObject);

            let resetUser = {...this.state.user};

            for(let key in resetUser){
                resetUser[key].value = "";
                resetUser[key].touched = false;
                resetUser[key].validation.valid = true;
            }
            
            let safeUpdateObject = {
                ...this.state,
                errorMessage: null,
                user: resetUser
            }

            this.setState(safeUpdateObject);
       
       }
    }   
        

    // Returns Photo URL From Image Component
    returnPhotoURL = (photoUrl) =>{
        console.log("Recieved Photo Callback: ", photoUrl);
        let safeUpdateObject = {
            ...this.state,            
            user:{
                ...this.state.user,
                photoUrl: {
                    ...this.state.user.photoUrl,
                    value: photoUrl,
                    touched: true,
                    validation: {
                        ...this.state.user.photoUrl.validation,
                        valid: true
                    }
                },
            }
        }

        this.setState(safeUpdateObject);
        console.log("Photo Captured: ", this.state.user.photoUrl.value);
    }



    render(){

        return (
            <React.Fragment>

                        <label className={styles.ModalFormLabel}>First Name</label>
                        <Input
                            placeholder='Jane'
                            type="text"
                            name='firstName'
                            value={this.state.user.firstName.value}
                            onChange={(event)=>this.formInputChangeHandler(event, "firstName")}
                            errorMsg={
                                !this.state.user.firstName.validation.valid
                                ? this.state.user.firstName.validation.errorMessage
                                : null
                            }
                        />

                        <label className={styles.ModalFormLabel}>Last Name</label>
                        <Input
                            placeholder='Doe'
                            type="text"
                            name='lastName'
                            value={this.state.user.lastName.value}
                            onChange={(event)=>this.formInputChangeHandler(event, "lastName")}
                            errorMsg={
                                !this.state.user.lastName.validation.valid
                                ? this.state.user.lastName.validation.errorMessage
                                : null
                            }
                        />

                        <label className={styles.ModalFormLabel}>Small Map Zoom</label>               
                        <Slider 
                            className={styles.Input} 
                            min={0} 
                            max={100} 
                            name="score" 
                            value={this.state.user.score.value}
                            onChange={(event)=>this.formInputChangeHandler(event, "score")}
                        />
                        
                        <label className={styles.ModalFormLabel}>Add Photo</label>
                        <div className={styles.ImageUploadWrapper}>
                            <ImageUpload returnPhotoURL={this.returnPhotoURL}/>                
                        </div>

                        {this.state.errorMessage 
                            ? <h5 className={styles.ErrorText}>this.state.errorMessage</h5> 
                            : null
                        }


                        <div className={styles.ModalButtons}>
                            <Button onClick={this.addUser} buttonType='default' disable={!this.state.validForm}>
                                {this.state.newUser? "Add User" : "Update User"}
                            </Button>
                            <Button onClick={this.closeModal} buttonType='default'>
                                Cancel
                            </Button>
                        </div>

            </React.Fragment>
        );
    }
}

export default UserForm;

