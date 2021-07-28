//select the canvas
const canvas = document.querySelector('canvas');
//Select the canvas context API
const ctxt = canvas.getContext('2d');

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//Set the height and width of the canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEL = document.querySelector('#modalEL');
const bigScoreEl = document.querySelector('#bigScoreEl');
const x = canvas.width / 2;
const y = canvas.height / 2;
const friction = 0.99;
//create the Player class using a constructor

class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    /*Add a draw function inside the class to draw 
    the player to the canvas using the properties
    from the player class.
    
    ctxt - references the canvas context

    ctxt.beginPath - specifies that we want to start drawing

    ctxt.arc - creates the arc by taking the x, y, radius
    and color from the player class constructor then uses
    Math.PI * 2 to create a full circle.
    
    ctxt.fill - fills the circle with the specified color from
    the class.
    */
    draw() {
        ctxt.beginPath();
        ctxt.arc(
            this.x, this.y, this.radius, 0, Math.PI * 2,
            false);
        ctxt.fillStyle = this.color;
        ctxt.fill();
    }

}

/* Create the Projectile class using the same method as the player.
   I re-used the code from the player class for this.
   However, this time we added a velocity property.
*/
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
// We use our handy draw function again to draw the projectile.
// This is done in the same way as the player.
    draw() {
        ctxt.beginPath();
        ctxt.arc(
        this.x, this.y, this.radius, 0, Math.PI * 2,
        false);
        ctxt.fillStyle = this.color;
        ctxt.fill();
    }

/*
For each frame of the animation loop we set the x and y
coordinates for each projectile by creating the update function. 
It determines the velocity by taking its current coordinate
and adding its current velocity together.

*/
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctxt.beginPath();
        ctxt.arc(
            this.x, this.y, this.radius, 0, Math.PI * 2,
            false);
        ctxt.fillStyle = this.color;
        ctxt.fill();
    }
// I used the same update function from the projectile.
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}


class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }

    draw() {
        ctxt.save();
        ctxt.globalAlpha = this.alpha;
        ctxt.beginPath();
        ctxt.arc(
            this.x, this.y, this.radius, 0, Math.PI * 2,
            false);
        ctxt.fillStyle = this.color;
        ctxt.fill();
        ctxt.restore();
    }

    update() {
        this.draw();
        //slows the velocity over time
        this.velocity.x *= friction; 
        this.velocity.y *= friction;
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.alpha -= 0.01;
    }
}




//Create the player
let player = new Player(
    x,
    y, 
    10, 
    'rgb(255, 162, 255)'
    );


/* Put the projectile here to allow it be accessed within the animate function
   correcting any scope issues.
*/   
const projectile = new Projectile(
    canvas.width / 2,
    canvas.height / 2, 5,
    'rgb(255, 162, 255)', 
    {
    x: 1,
    y: 1
});
/* create an array to draw multiple projectiles and enemies
 at the same time.
*/
let projectiles = [];
let  enemies = [];
let  particles = [];

function init() {
     player = new Player(x, y, 10, 'rgb(255, 162, 255)');
     projectiles = [];
     enemies = [];
     particles = [];
     score = 0;
     scoreEl.innerHTML = score;
     bigScoreEl.innerHTML = score;
}

function spawnEnemies() {
    setInterval(() => {
//This makes sure the random size of the enemies is no smaller than 4       
        const radius = Math.random() * (30 - 4) + 4 ; 
//This allows x and y to be used outside of the if statement
        let x;  
        let y;

        if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
    } else {
        x = Math.random() * canvas.width;
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

        const angle = Math.atan2(
             canvas.height / 2 -y,
             canvas.width / 2 -x
            
         );
     
         const velocity = {
             x: Math.cos(angle), //returns angles between -1 to 1
             y: Math.sin(angle)
         };

        enemies.push(new Enemy(x, y, radius, color, velocity));
        console.log(enemies);
    }, 1000);
}

//Create a function to animate the projectile

/*
By calling the animate function from inside the animate function
it will loop over and over again.

*/
let animationId;
let score = 0;
function animate() {
    animationId = requestAnimationFrame(animate);
//This creates a motion blur effect    
    ctxt.fillStyle = 'rgba(0, 0, 0, 0.1)';
//clears the screen to show circle projectiles rather than lines    
    ctxt.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);  
        } else {
          particle.update();  
        }
        
    });
    
    
    projectiles.forEach((projectile, index) => {
        projectile.update();
// Removes the projectiles from the edges of the screen to improve perfoprmance
        if (Projectile.x + projectile.radius < 0 || 
            projectile.x - projectile.radius > canvas.width || 
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius >canvas.height
            ) {
            setTimeout(() => {
                projectiles.splice(index, 1); 
                }, 0); 
        }
    });

    enemies.forEach((enemy, index) => {
        enemy.update();

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        //End game
        if (dist - enemy.radius - player.radius < 1) {
          cancelAnimationFrame(animationId); 
          modalEL.style.display = 'flex';
          bigScoreEl.innerHTML =  score;
        }

        projectiles.forEach((projectile, projectileIndex) => {
         const dist = Math.hypot(projectile.x - enemy.x, 
         projectile.y - enemy.y);
        
         //Projectiles touch enemy
         if (dist - enemy.radius - projectile.radius < 1) {

         
         //Make explosion   
            for (let i = 0; i < enemy.radius * 2; i++) {
               particles.push(new Particle(projectile.x, projectile.y,
               Math.random() * 2, enemy.color, 
                {
                 x: Math.random() -0.5 * (Math.random() * 5) ,
                 y: Math.random() - 0.5 * (Math.random() * 5)} ));
            }

            if (enemy.radius - 10 > 5) {

                //increase score
                score += 100;
                scoreEl.innerHTML = score;

                gsap.to(enemy, {
                    radius: enemy.radius - 10
                });
                setTimeout(() => { 
                    projectiles.splice(projectileIndex, 1); 
                    }, 0) ; 
            } else {
               
                //completely remove from scene
                score += 250;
                scoreEl.innerHTML = score;

               setTimeout(() => {
            enemies.splice(index, 1); 
            projectiles.splice(projectileIndex, 1); 
            }, 0);  
            }
           

            
         }
        });
    });
}


// Add an event listener to listen for a click event
// which will create a projectile

/*
The first argument the listener takes is the event
@param {event} 'click'

  The second argument is an arrow function which
  creates a new projectile (see Projectile class on line 158) 
  whenever the mouse clicks.

  The function takes an x and y like the player but
  the x and y coordinates are created from the position of 
  the mouse click on the screen. This determines the direction of the 
  projectile.

  so...

  @param {event} 'click'(clientX)- The x coordinate where the mouse
  clicked on the screen.

  @param {event}  'click'(clientY)- the y coordinate where the
  mouse clicked on the screen.
  
  canvas.height / 2 - sets the y coordinate start position 
  of the projectile to the center of the screen on the y
  axis.
  
  canvas.width / 2 - sets the x coordinate start position 
  of the projectile to the center of the screen on the x
  axis. 

*/



    addEventListener('click', (event) => {
//Trigonometry to make the projectile aim where we click
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2,

    );

    const velocity = {
        x: Math.cos(angle) * 4, //returns angles between -1 to 1
        y: Math.sin(angle) * 4
    };

    projectiles.push(new Projectile(
        canvas.width / 2, canvas.height / 2, 5, 'white',
        velocity
    ));
});

startGameBtn.addEventListener('click', () => {
    init();
    animate();
    spawnEnemies();
    modalEL.style.display = 'none';
});
