import React, {Component} from "react";
import styles from "./Home.module.css";
import addUser from "../../assets/images/adduser.svg";
import question from "../../assets/images/question.svg";
import Header from "../../components/Header/Header";
import Scores from "../../components/Scores/Scores";
import Modal from "../../components/UI/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import ModalSmall from "../../components/UI/ModalSmall/ModalSmall";
import Button from "../../components/UI/Button/Button";
import Gravity from "../../components/Canvas/Gravity/Gravity";
import Floating from "../../components/Canvas/Floating/Floating";


class Home extends Component{
    
    state = {
        golfers: [
            // {
            //     id: "testuser1",
            //     firstName: "Mike",
            //     lastName: "Cannata",
            //     photoUrl: "http://res.cloudinary.com/cloudmash-llc/image/upload/v1556279928/yrgwzygq2tmceryfmuov.png",
            //     score: 65
            // },
            // {
            //     id: "testuser2",
            //     firstName: "Tony",
            //     lastName: "Wible",
            //     photoUrl: "http://res.cloudinary.com/cloudmash-llc/image/upload/v1556279928/i73ndhrksdreuqgmyh8j.png",
            //     score: 60
            // }
        ],
        editUserObject: null,
        newUser: null,
        showModal: false,
        showInfoModal: false,
        canvas: "floating",
        clearGravityCanvas: false,
        clearFloatCanvas: false,
        celebrating: false,
        celebrateText: ""
    }
    
    componentDidMount(){

        let storedData = JSON.parse(sessionStorage.getItem("golfers"));
        if(storedData !== null){
            let safeUpdateObject = {
                ...this.state,
                golfers:  storedData.golfers
            } 
            // console.log("Mounting: ", storedData.golfers);
            this.setState(safeUpdateObject);
        }

    }

    // Gets & Stores New & Edit Users
    sendToParent = (userObject) =>{
        // console.log("User Info: ", userObject);
        let updatedGolfers = [...this.state.golfers];

        if(userObject.newUser){
            updatedGolfers.push(userObject);
        } else {
            let userIndex = null;
            updatedGolfers.forEach((golfer, index)=>{
                if(golfer.id === userObject.id) userIndex = index;
            })
            updatedGolfers.splice(userIndex, 1, userObject)
        }

        updatedGolfers.sort((golferOne, golferTwo)=>{
            if(golferOne.score > golferTwo.score) return -1;
            if(golferOne.score < golferTwo.score) return 1;
            if(golferOne.lastName < golferTwo.lastName) return -1;
            if(golferOne.lastName > golferTwo.lastName) return 1;
            return 0;
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

    // Sends Data To User Form
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

    // Removes Golfer From Array
    deleteGolfer = (id) =>{
        let updatedGolfers = [...this.state.golfers]
        let userIndex = null;
        updatedGolfers.forEach((golfer, index)=>{
            if(golfer.id === id) userIndex = index;
        })
        updatedGolfers.splice(userIndex, 1);
        let safeUpdateObject = {
            ...this.state,
            golfers: updatedGolfers
        }
        this.setState(safeUpdateObject);
        sessionStorage.clear();
        sessionStorage.setItem("golfers", JSON.stringify(safeUpdateObject));
    }
    
    cheer = ()=>{
        console.log("Hooray!!!  Thanks For Checking Out My App.");
        if(this.state.celebrating){
            
            let safeUpdateObject = {
                ...this.state,
                celebrateText: (<p>We Are Busy Celebrating!<br></br>Wait Until Things Die Down Before Celebrating Again.</p>)
            }
            this.setState(safeUpdateObject);

        } else {

            let safeUpdateObject = {
                ...this.state,
                celebrating: true,
                clearFloatCanvas: true,
                celebrateText: (<p>Hooray!!!<br></br>I &hearts; Conditional Rendering</p>)
            }

            this.setState(safeUpdateObject);

            // Load New Gravity Canvas
            setTimeout(()=>{
                safeUpdateObject.canvas = "gravity";
                this.setState(safeUpdateObject);
            }, 500)

            // Clear Existing Canvas
            setTimeout(()=>{
                safeUpdateObject.clearGravityCanvas = true;
                safeUpdateObject.clearFloatCanvas = false;
                safeUpdateObject.celebrating = false;
                safeUpdateObject.celebrateText = (<p>The Party Is Over...For Now</p>);
                this.setState(safeUpdateObject);
            }, 10000)

            // Reset Canvas To Floating
            setTimeout(()=>{
                safeUpdateObject.canvas = "floating";
                this.setState(safeUpdateObject);
            }, 10500)

        }
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

    showInfoModal = () => {
        this.setState({showInfoModal: true});
        document.body.style.overflowY="hidden";
    }

    closeInfoModal = () =>{
        this.setState({showInfoModal: false});
        document.body.style.overflowY=null;
    }

    // =============================================

    
    render(){

        let canvasType = null;
    
        switch(this.state.canvas){
            case ("gravity"): 
                canvasType = <Gravity clearCanvas={this.state.clearGravityCanvas} />;
                break; 
            case ("floating"): 
                canvasType = <Floating clearCanvas={this.state.clearFloatCanvas} />;
                break;
            default: 
                canvasType = <Floating clearCanvas={this.state.clearFloatCanvas} />;
        }

        return(
            <div className={styles.PageWrapper}>
                <Header/>

                {canvasType}
                
                <div className={styles.AddUserIconWrap} onClick={()=>this.showModal(true)}>
                    <img src={addUser} alt="add a user" />
                </div>

                <div className={styles.InfoIconWrap} onClick={this.showInfoModal}>
                    <img src={question} alt="learn more" />
                </div>

                    {
                        this.state.golfers.length === 0
                        
                        ?   <div className={styles.SpinnerWrapper} >
                                <h2 onClick={()=>this.showModal(true)}>Add Golfers With The Button Above<br></br>Or Click Here To Get Started</h2>
                                <p>(Try Cheering With The Favorites Icon)</p>
                                <Spinner />
                            </div>
            
                        :   <div className={styles.ScoresWrapper}>
                                <div className={styles.CelebrateDiv}>{this.state.celebrateText}</div>
                                <Scores
                                    golfers={this.state.golfers}
                                    editGolfer={this.editGolfer}
                                    deleteGolfer={this.deleteGolfer}
                                    cheer={this.cheer}
                                />
                            </div>  
                    }    
                
                {/* Add/Edit User Modal */}
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

                {/* Info Modal */}
                <ModalSmall
                    showModal={this.state.showInfoModal} 
                    closeModal={this.closeInfoModal} 
                    title={"About PGA Score"}
                >
                    <p className={styles.InfoText}>
                    PGA Score lets you add, edit and remove golfers using React JS components.  This app uses Session Storage in lieu of a database.  Get started by selecting the add user icon.  Golfers are sorted by score in ascending order with a secondary sort based on last name.  Edit or delete users with the icons listed in each row.  Cheer on your favorites with the celebration icon.  This app is only intended for desktop use. 
                    </p>

                    <div className={styles.ModalButtons}>
                        <Button onClick={this.closeInfoModal} buttonType='default'>Close</Button>
                    </div>

                </ModalSmall>
                
            </div>
        );
    }
}

export default Home;