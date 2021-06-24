//select the canvas
const canvas = document.querySelector('canvas');
//Select the canvas context API
const ctxt = canvas.getContext('2d')

//Set the height and width of the canvas
canvas.width = innerWidth
canvas.height = innerHeight

//create the Player class
class Player {
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

class Enemy {
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

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width / 2
const y = canvas.height / 2


//Create the player
const player = new Player(x, y, 10, 'white')


//Put the projectile here to allow it be accessed within the animate function
const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', {
    x: 1,
    y: 1
})
//create an array to draw multiple projectiles and enemies
const projectiles = []
const enemies = []

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4  //This makes sure the random size of the enemies is no smaller than 4

        let x   //This allows x and y to be used outside of the if statement
        let y

        if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
        y = Math.random() * canvas.height
    } else {
        x = Math.random() * canvas.width
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

        const angle = Math.atan2(
             canvas.height / 2 -y,
             canvas.width / 2 -x
            
         )
     
         const velocity = {
             x: Math.cos(angle), //returns angles between -1 to 1
             y: Math.sin(angle)
         }

        enemies.push(new Enemy(x, y, radius, color, velocity))
        console.log(enemies)
    }, 1000)
}

//Create a function to animate the projectile
let animationId 
function animate() {
    animationId = requestAnimationFrame(animate)
    ctxt.fillStyle = 'rgba(0, 0, 0, 0.1)'//This creates a motion blur effect
    ctxt.fillRect(0, 0, canvas.width, canvas.height) //cleard the screen to show circle projectiles rather than lines
    player.draw()
    projectiles.forEach((projectile, index) => {
        projectile.update()
        // Removes the projectiles from the edges of the screen to improve perfoprmance
        if (Projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width || 
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius >canvas.height
            ) {
            setTimeout(() => {
                projectiles.splice(index, 1) 
                }, 0) 
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
        //End game
        if (dist - enemy.radius - player.radius < 1) {
          cancelAnimationFrame(animationId)   
        }

        projectiles.forEach((projectile, projectileIndex) => {
         const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
        
         //Projectiles touch enemy
         if (dist - enemy.radius - projectile.radius < 1) {
            
            if (enemy.radius - 10 > 5) {
                gsap.to(enemy, {
                    radius: enemy.radius - 10
                })
                setTimeout(() => { 
                    projectiles.splice(projectileIndex, 1) 
                    }, 0)  
            } else {
               setTimeout(() => {
            enemies.splice(index, 1) 
            projectiles.splice(projectileIndex, 1) 
            }, 0)  
            }
           

            
         }
        })
    })
}


//Add an event listener to listen for a click event which will create a projectile
addEventListener('click', (event) => {
    //Trigonometry to make the projectile aim where we click
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2,

    )

    const velocity = {
        x: Math.cos(angle) * 4, //returns angles between -1 to 1
        y: Math.sin(angle) * 4
    }

    projectiles.push(new Projectile(
        canvas.width / 2, canvas.height / 2, 5, 'white',
        velocity
    ))
})

animate()
spawnEnemies()