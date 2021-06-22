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
       ctxt.fillStyle = this.color   
       ctxt.fill()    
    }

}

//Create the projectiles
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color  
        this.velocity = velocity 
    }

    draw() {
        ctxt.beginPath()
        ctxt.arc(
            this.x, this.y, this.radius, 0, Math.PI * 2,
            false) 
        ctxt.fillStyle = this.color   
        ctxt.fill()    
     }
}

const x = canvas.width / 2
const y = canvas.height / 2


//Create the player
const player = new Player(x, y, 30, 'blue' )
player.draw()

console.log(player)

//Add an event listener to listen for a click event which will create a projectile
addEventListener('click', (event)=>{
    const projectile = new Projectile(event.clientX, event.clientY, 5, 'red', null)
    projectile.draw()
})