import React from "react";
import styles from "./Scores.module.css";
import deleteIcon from "../../assets/images/delete.svg"


let golferData = [
    {
    id: 1,
    firstName: "Tony",
    lastName: "Wible",
    score: 20
    }
]

const deleteGolfer = (id) =>{
    console.log("Deleting Golfer Id: ", id)
}

const Scores = (props) =>{
    return(
        <div className={styles.TableWrapper}>
            <table className={styles.Table}>
                <thead >
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {golferData.map((golfer)=>{
                        return(
                            <tr key={golfer.Id}>
                                <td>{golfer.lastName}, {golfer.firstName}</td>
                                <td>{golfer.score}</td>
                                <td className={styles.ImageTD} onClick={()=>delete(golfer.Id)}>
                                    <img src={deleteIcon} alt="delete"/>
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
