let canvas = null;
let c = null;
let running = true;

// Set Initial Canvas
export const setCanvas = (canvasImport, cImport) => {
    canvas = canvasImport;
    c = cImport;

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight * 0.9;
    canvas.style.background = "#334459";
}

// Global Variables For Construcor & Interactivity
// ==============================================================================
let mouse = {x: null, y: null};
let maxRadius = 40;
let colorArray = ["#573D7B", "#FE7F2D", "#FCCA46", "#A1C181", "#579C87"];

// Array To Hold Multiple Shapes/Circles
let circleArray = [];

// Interactivity - Event Listeners (Optional For Constructor)
// ==============================================================================
export const mouseMove = (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
}

// Constructor Used To Make Indvidual Shapes
class Circle {
    constructor (x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        // Used To Reset To Original Size Rather Than A Fixed PX
        this.originalSize = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length - 1)];
        this.stroke = colorArray[Math.floor(Math.random() * colorArray.length - 1)];

        this.draw = function(){
            // Draws The Circle
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            c.strokeStyle = this.color; 
            c.fillStyle = this.stroke;
            c.stroke();
            c.fill();
        }

        this.update = function(){

            // Changes The Direction Based On Bounds
            if(this.x + this.radius > canvas.width || this.x - this.radius < 0){
                this.dx = -this.dx;
            }

            if(this.y + this.radius > canvas.height || this.y - this.radius < 0){
                this.dy = -this.dy;
            }

            // Increment/Decrement On Each Loop
            this.x += this.dx;
            this.y += this.dy;
            
            // Interactivity (Optional) - If X/Y Within Distance To Mouse
            if((mouse.x - this.x < 50)
                && (mouse.x - this.x > -50) 
                && (mouse.y - this.y < 50) 
                && (mouse.y - this.y > -50)){
                    // Only Increase If Radius If Shape Is Smaller Than 40px
                    // Keeps Size From Getting Too Big
                    if(this.radius < maxRadius){
                        this.radius += 0.5;
                    }
            // Compare To Min Radius Which Is Original Size
            // Prevents From All Shrinking To A Single Size
            } else if (this.radius > this.originalSize){
                this.radius -= 0.5;
            }

            // Render A Circle
            this.draw();
            
            // console.log("Float DY: ", this.dy);
        }
    }
}

// Build Initial Shapes
export const buildShapes = () =>{

    running = true;
    circleArray = []

    // Loop To Add Random Circles To Array
    for(let i = 0; i < 30; i++){
        // Set Random Variable Inputs
        let radius = Math.random() * 20  + 5;
        let x = Math.random() * (window.innerWidth - radius*2) + radius;
        let y = Math.random() * (window.innerHeight - radius*2) + radius;
        let dx = (Math.random() -0.5) * 1;
        let dy = (Math.random() -0.5) * 1;
        circleArray.push(new Circle(x,y,dx,dy,radius));
    }
}

export const constructorAnnimation = () =>{
    if(running){
        requestAnimationFrame(constructorAnnimation);
        c.clearRect(0,0,window.innerWidth, window.innerHeight);
        for(let i = 0; i < circleArray.length; i++){
            circleArray[i].update();
        }
    }
}

// Clear Canvas
export const clearCanvas =()=>{
    c.clearRect(0, 0, canvas.width, canvas.height);
    running = false;
    console.log("Running: ", running);
    circleArray = [];
}
