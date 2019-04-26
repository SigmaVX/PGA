import React from "react";
import styles from "./Scores.module.css";
import deleteIcon from "../../assets/images/delete.svg"
import editIcon from "../../assets/images/edituser.svg"


const deleteGolfer = (id) =>{
    console.log("Deleting Golfer Id: ", id);
}



const Scores = (props) =>{
    return(
        <div className={styles.TableWrapper}>
            <table className={styles.Table}>
                <thead >
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {props.golfers.map((golfer, index)=>{
                        return(
                            <tr key={index}>
                                <td className={styles.PhotoTD} >
                                    <div className={styles.GolferPhotoWrap}>
                                        <img src={golfer.photoUrl} alt="golfer avatar"/>
                                    </div>
                                </td>
                                <td className={styles.TextTD}>{golfer.lastName}, {golfer.firstName}</td>
                                <td className={styles.ScoreTD}>{golfer.score}</td>
                                <td className={styles.OptionsTD} >
                                    <div className={styles.OptionIconWrap} onClick={()=>props.editGolfer(golfer.id)}>
                                        <img src={editIcon} alt="edit golfer"/>
                                    </div>
                                    <div className={styles.OptionIconWrap} onClick={()=>deleteGolfer(golfer.id)}>
                                        <img src={deleteIcon} alt="delete golfer"/>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Scores;
