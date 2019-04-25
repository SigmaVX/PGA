import React, {Component} from "react";
import styles from "./Home.module.css";
import addUser from "../../assets/images/adduser.svg";
import Header from "../../components/Header/Header";
import Scores from "../../components/Scores/Scores";
import Modal from "../../components/UI/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";

class Home extends Component{
    
    state = {
        golfers: [],
        newUser: null
    }
    
    componentDidMount(){
        // To Do
        //  allow to add/edit players
        //  validation - score must be 0 to 100
        // sort table - score and then last name - ASCENDING Order - loop
        // Optional
        // add celebrate annimation 
        // add annimaiton on delete row


        // props
        // newUser
        // cb for user obj

        

    }

    sendToParent = (userObject) =>{
        console.log("User Info: ", userObject);
    }

    

    // Modal Triggers
    // =============================================
    // showModal = () => {
    //     this.setState({showModal: true});
    //     document.body.style.overflowY="hidden";
    // }

    // closeModal = () =>{
    //     this.setState({showModal: false});
    //     document.body.style.overflowY=null;
    // }

    // showEditModal = (id) => {
    //     this.setState({showEditModal: true});
    //     document.body.style.overflowY="hidden";
    // }

    // closeEditModal = () =>{
    //     this.setState({showEditModal: false});
    //     document.body.style.overflowY=null;
    // }

    // =============================================

    
    render(){
        return(
            <div className={styles.PageWrapper}>
                <Header/>
                <div className={styles.ScoresWrapper}>
                    <Scores/>
                </div>

                <UserForm 
                    sendToParent={this.sendToParent}
                    newUser={this.state.newUser}
                />

            </div>
        );
    }
}

export default Home;