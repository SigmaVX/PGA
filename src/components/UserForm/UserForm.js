import React, { Component } from 'react';
import styles from "./UserForm.module.css";
import Input from '../UI/Forms/Input/Input';
import Button from "../UI/Button/Button";
import Slider from '../UI/Forms/Slider/Slider';
import ImageUpload from "../UI/ImageUpload/ImageUpload";
const uuidv1 = require('uuid/v1');

class UserForm extends Component {

    state = {
        validForm: true,
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
                value: 0,
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


    componentWillReceiveProps(nextProps){
        console.log(nextProps.editUser);
        if(nextProps.editUser !== null){
           
            let userCopy = {...this.state.user};

            for(let key in userCopy){
                userCopy[key].touched = true;
                userCopy[key].validation.valid = true;
            }

            userCopy.id.value=nextProps.editUser.id;
            userCopy.firstName.value=nextProps.editUser.firstName;
            userCopy.lastName.value=nextProps.editUser.lastName;
            userCopy.photoUrl.value=nextProps.editUser.photoUrl;
            userCopy.score.value=nextProps.editUser.score;

            
            let safeUpdateObject = {
                ...this.state,
                user: userCopy
            }

            console.log(safeUpdateObject);
            this.setState(safeUpdateObject);

        } else {
            let resetUser = {...this.state.user};

            for(let key in resetUser){
                resetUser[key].value = "";
                resetUser[key].touched = false;
                resetUser[key].validation.valid = true;
            }
            
            let safeUpdateObject = {
                ...this.state,
                user: resetUser
            }

            this.setState(safeUpdateObject);
        }
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
        
        safeUpdateObject.validForm = this.formCheck();
        this.setState(safeUpdateObject);
        console.log(safeUpdateObject);
    }

    validationCheck = (value, rules) =>{
        let isValid = true;
        
        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
    
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
    
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid; 
        }
    
        return isValid;
    }

    formCheck = () =>{

        let validForm = true;
        for(let key in this.state.user){
            if(!this.state.user[key].validation.valid && this.state.user[key].validation.required) validForm = false;
            if(!this.state.user[key].touched && this.state.user[key].validation.required) validForm = false;
        } 

        if(!validForm) return false;
        if(validForm) return true;
    }

    
    updateUser = () =>{

        let id = this.state.user.id.value;
        if(id === "") id = uuidv1(); 
        
        let sendObject = {
            newUser: this.props.newUser,
            id: id,
            firstName: this.state.user.firstName.value,
            lastName: this.state.user.lastName.value,
            score: parseInt(this.state.user.score.value),
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
            user: resetUser
        }

        this.setState(safeUpdateObject);
        console.log(safeUpdateObject);
       
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
        console.log(this.state);
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
                        
                        <label className={styles.ModalFormLabel}>Add Photo</label>
                        <div className={styles.ImageUploadWrapper}>
                            <ImageUpload returnPhotoURL={this.returnPhotoURL}/>                
                        </div>
                       
                        <label className={styles.ModalFormLabel}>Score: {this.state.user.score.value}</label>               
                        <Slider 
                            className={styles.Input} 
                            min={0} 
                            max={100} 
                            name="score" 
                            value={this.state.user.score.value}
                            onChange={(event)=>this.formInputChangeHandler(event, "score")}
                        />

                        {!this.state.validForm 
                            ? <h5 className={styles.ErrorText}>Please Provide The Information Above</h5> 
                            : null
                        }

                        <div className={styles.ModalButtons}>
                            <Button onClick={this.updateUser} buttonType='default' disable={!this.state.validForm}>
                                {this.props.newUser? "Add User" : "Update User"}
                            </Button>
                            <Button onClick={this.props.closeModal} buttonType='default'>
                                Cancel
                            </Button>
                        </div>

            </React.Fragment>
        );
    }
}

export default UserForm;

