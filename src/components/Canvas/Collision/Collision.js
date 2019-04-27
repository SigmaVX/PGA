import React, {Component} from "react";
import * as logic from "./collisionAnnimation";

class Collision extends Component{

    componentDidMount(){
        const canvas = this.refs.canvas;
        const c = canvas.getContext('2d')

        logic.setCanvas(canvas, c);
        logic.init();
        logic.animate();
    }
    
    mouseMoveCB = (event) =>{
        logic.mouseMove(event);
    }


    render(){

        
    window.addEventListener('resize', () => {
        const canvas = this.refs.canvas;
        const c = canvas.getContext('2d')

        logic.setCanvas(canvas, c);
        logic.init();
        logic.animate();
    })


        return <canvas 
                    className="collision" 
                    ref="canvas"
                    onMouseMove={(event)=>this.mouseMoveCB(event)}
                > 
                
                </canvas>
    }
}

export default Collision;