import React, {Component} from "react";
import styles from "./Home.module.css";
import addUser from "../../assets/images/adduser.svg";
import Header from "../../components/Header/Header";
import Scores from "../../components/Scores/Scores";
import Modal from "../../components/UI/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import Spinner from "../../components/UI/Spinner/Spinner";


// Test User
// {
//     id: "initialuser",
//     firstName: "Mike",
//     lastName: "Cannata",
//     photoUrl: "http://res.cloudinary.com/cloudmash-llc/image/upload/v1556279928/yrgwzygq2tmceryfmuov.png",
//     score: 65
// }


class Home extends Component{
    
    state = {
        golfers: [],
        editUserObject: null,
        newUser: null,
        showModal: false,
        showConfirmModal: false
    }
    
    componentDidMount(){


        // let storedData = JSON.parse(sessionStorage.getItem("golfers"));
        // if(storedData !== null){
        //     let safeUpdateObject = {
        //         ...this.state,
        //         golfers:  storedData.golfers
        //     } 

        //     console.log("Mounting: ", storedData.golfers);
        //     this.setState(safeUpdateObject);
        // }

        // To Do
        //  allow to add players - done
        //  allo to edit players - done
        // allow to delete players  - done
        //  validation - score must be 0 to 100 - done
        // sort table - score and then last name - ASCENDING Order - done
        
        // remove logs - done
        // fix warnings
        // add readme
        // remove unused components
        // check session storage config

        // Optional
        // add celebrate annimation 
        // add annimaiton on delete row
        // add spinner on no users
        // page layout
    }


    sendToParent = (userObject) =>{
        // console.log("User Info: ", userObject);
        let updatedGolfers = [...this.state.golfers];

        if(userObject.newUser){
            updatedGolfers.push(userObject);
        } else {
            let userIndex = null;
            updatedGolfers.forEach((golfer, index)=>{
                if(golfer.id = userObject.id) userIndex = index;
            })
            updatedGolfers.splice(userIndex, 1, userObject)
        }

        updatedGolfers.sort((golferOne, golferTwo)=>{
            if(golferOne.score > golferTwo.score) return -1;
            if(golferOne.score < golferTwo.score) return 1;
            if(golferOne.lastName < golferTwo.lastName) return -1;
            if(golferOne.lastName > golferTwo.lastName) return 1;
        })

        let safeUpdateObject = {
            ...this.state,
            editUserObject: null,
            golfers: updatedGolfers
        }

        sessionStorage.clear();
        sessionStorage.setItem("golfers", JSON.stringify(safeUpdateObject));
        this.setState(safeUpdateObject);
        this.closeModal();
    }

    editGolfer = (id) =>{
        // console.log(id);
        let userObject = null;
        this.state.golfers.forEach((golfer, index)=>{
            if(golfer.id === id) userObject = this.state.golfers[index]
        });

        let safeUpdateObject = {
            ...this.state,
            editUserObject: userObject
        }

        this.setState(safeUpdateObject);
        this.showModal(false);
    }

    deleteGolfer = (id) =>{
        let updatedGolfers = [...this.state.golfers]
        let userIndex = null;
        updatedGolfers.forEach((golfer, index)=>{
            if(golfer.id = id) userIndex = index;
        })
        updatedGolfers.splice(userIndex, 1);
        let safeUpdateObject = {
            ...this.state,
            golfers: updatedGolfers
        }
        this.setState(safeUpdateObject);
    }
    

    // Modal Triggers
    // =============================================
    showModal = (newUser) => {
        if(newUser) this.setState({showModal: true, newUser: newUser, editUserObject: null});
        if(!newUser) this.setState({showModal: true, newUser: newUser});      
        document.body.style.overflowY="hidden";
    }

    closeModal = () =>{
        this.setState({showModal: false});
        document.body.style.overflowY=null;
    }

    showConfirmModal = (id) => {
        this.setState({showEditModal: true});
        document.body.style.overflowY="hidden";
    }

    closeConfirmModal = () =>{
        this.setState({showEditModal: false});
        document.body.style.overflowY=null;
    }

    // =============================================

    
    render(){
        return(
            <div className={styles.PageWrapper}>
                <Header/>
        
                
                <div className={styles.AddUserIconWrap} onClick={()=>this.showModal(true)}>
                    <img src={addUser} alt="add a user" />
                </div>

                    {
                        this.state.golfers.length === 0
                        
                        ?   <div className={styles.SpinnerWrapper} >
                                <h2>Add Golfers To Get Started</h2>
                                <p>(Try Cheering With The Favorites Icon)</p>
                                <Spinner />
                            </div>
            
                        :   <div className={styles.ScoresWrapper}>
                                <Scores
                                golfers={this.state.golfers}
                                editGolfer={this.editGolfer}
                                deleteGolfer={this.deleteGolfer}
                                />
                            </div>  
                    }    

                <Modal
                    showModal={this.state.showModal} 
                    closeModal={this.closeModal} 
                    title={null}
                >
                    <UserForm 
                        sendToParent={this.sendToParent}
                        newUser={this.state.newUser}
                        editUser={this.state.editUserObject}
                        closeModal={this.closeModal}
                    />

                </Modal>

            </div>
        );
    }
}

export default Home;