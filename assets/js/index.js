//select the canvas
const canvas = document.querySelector('canvas');
//Select the canvas context API
const ctxt = canvas.getContext('2d')

//Set the height and width of the canvas
canvas.width = innerWidth
canvas.height = innerHeight

//create the Player class
class  Player {
    constructor(x, y, radius, color) {
       this.x = x
       this.y = y 
       this.radius = radius
       this.color = color
    }
//Add a draw function inside the class to draw the player to the canvas
    draw() {
       ctxt.beginPath()
       ctxt.arc(
           this.x, this.y, this.radius, 0, Math.PI * 2,
           false) 
       ctxt.fill()    
    }

}

//Create the player
const player = new Player(100, 100, 30, 'blue' )
player.draw()

console.log(player)