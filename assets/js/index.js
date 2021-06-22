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
//Adding the x and y velocity with an update function 
     update() {
         this.draw()
         this.x = this.x + this.velocity.x
         this.y = this.y + this.velocity.y
     }
}

const x = canvas.width / 2
const y = canvas.height / 2


//Create the player
const player = new Player(x, y, 30, 'blue' )
player.draw()

//Put the projectile here to allow it be accessed within the animate function
const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', {
   x: 1,
   y: 1
})

//create an array to draw multiple projectiles
const projectiles = []



//Create a function to animate the projectile
function animate() {
    requestAnimationFrame(animate)
    projectiles.forEach(projectile => {
        projectile.update()
    });
    
}


//Add an event listener to listen for a click event which will create a projectile
addEventListener('click', (event)=>
    {
//Trigonometry to make the projectile aim where we click
   const angle = Math.atan2(
       event.clientY - canvas.height / 2,
       event.clientX - canvas.width / 2,
       
    )

    const velocity = {
        x: Math.cos(angle), //returns angles between -1 to 1
        y: Math.sin(angle)
    }

   projectiles.push(new Projectile(
        canvas.width / 2, canvas.height / 2, 5, 'red',
        velocity
       ))
})

animate()