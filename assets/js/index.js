(function () {
    'use strict';
 }());
 const _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
 
 function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
 
 //select the canvas
 const canvas = document.querySelector('canvas');
 //Select the canvas context API
 const ctxt = canvas.getContext('2d');
 
 //Set the height and width of the canvas
 canvas.width = innerWidth;
 canvas.height = innerHeight;
 
 const scoreEl = document.querySelector('#scoreEl');
 const startGameBtn = document.querySelector('#startGameBtn');
 const modalEL = document.querySelector('#modalEL');
 const bigScoreEl = document.querySelector('#bigScoreEl');
 
 //create the Player class
 
 let Player = function () {
     function Player(x, y, radius, color) {
         _classCallCheck(this, Player);
 
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
     }
     //Add a draw function inside the class to draw the player to the canvas
 
 
     _createClass(Player, [{
         key: 'draw',
         value: function draw() {
             ctxt.beginPath();
             ctxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
             ctxt.fillStyle = this.color;
             ctxt.fill();
         }
     }]);
 
     return Player;
 }();
 
 //Create the projectiles
 
 
 const Projectile = function () {
     function Projectile(x, y, radius, color, velocity) {
         _classCallCheck(this, Projectile);
 
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
         this.velocity = velocity;
     }
 
     _createClass(Projectile, [{
         key: 'draw',
         value: function draw() {
             ctxt.beginPath();
             ctxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
             ctxt.fillStyle = this.color;
             ctxt.fill();
         }
         //Adding the x and y velocity with an update function 
 
     }, {
         key: 'update',
         value: function update() {
             this.draw();
             this.x = this.x + this.velocity.x;
             this.y = this.y + this.velocity.y;
         }
     }]);
 
     return Projectile;
 }();
 
 const Enemy = function () {
     function Enemy(x, y, radius, color, velocity) {
         _classCallCheck(this, Enemy);
 
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
         this.velocity = velocity;
     }
 
     _createClass(Enemy, [{
         key: 'draw',
         value: function draw() {
             ctxt.beginPath();
             ctxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
             ctxt.fillStyle = this.color;
             ctxt.fill();
         }
     }, {
         key: 'update',
         value: function update() {
             this.draw();
             this.x = this.x + this.velocity.x;
             this.y = this.y + this.velocity.y;
         }
     }]);
 
     return Enemy;
 }();
 
 const friction = 0.99;
 
 const Particle = function () {
     function Particle(x, y, radius, color, velocity) {
         _classCallCheck(this, Particle);
 
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.color = color;
         this.velocity = velocity;
         this.alpha = 1;
     }
 
     _createClass(Particle, [{
         key: 'draw',
         value: function draw() {
             ctxt.save();
             ctxt.globalAlpha = this.alpha;
             ctxt.beginPath();
             ctxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
             ctxt.fillStyle = this.color;
             ctxt.fill();
             ctxt.restore();
         }
     }, {
         key: 'update',
         value: function update() {
             this.draw();
             this.velocity.x *= friction; //slows the velocity over time
             this.velocity.y *= friction;
             this.x = this.x + this.velocity.x;
             this.y = this.y + this.velocity.y;
             this.alpha -= 0.01;
         }
     }]);
 
     return Particle;
 }();
 
 const x = canvas.width / 2;
 const y = canvas.height / 2;
 
 //Create the player
 let player = new Player(x, y, 10, 'rgb(255, 162, 255)');
 
 //Put the projectile here to allow it be accessed within the animate function
 let projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'rgb(255, 162, 255)', {
     x: 1,
     y: 1
 });
 //create an array to draw multiple projectiles and enemies
 let projectiles = [];
 let enemies = [];
 let particles = [];
 
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
     setInterval(function () {
         const radius = Math.random() * (30 - 4) + 4; //This makes sure the random size of the enemies is no smaller than 4
 
         let x = void 0; //This allows x and y to be used outside of the if statement
         let y = void 0;
 
         if (Math.random() < 0.5) {
             x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
             y = Math.random() * canvas.height;
         } else {
             x = Math.random() * canvas.width;
             y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
         }
         const color = 'hsl(' + Math.random() * 360 + ', 50%, 50%)';
 
         const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
 
         const velocity = {
             x: Math.cos(angle), //returns angles between -1 to 1
             y: Math.sin(angle)
         };
 
         enemies.push(new Enemy(x, y, radius, color, velocity));
         console.log(enemies);
     }, 1000);
 }
 
 //Create a function to animate the projectile
 let animationId = void 0;
 let score = 0;
 function animate() {
     animationId = requestAnimationFrame(animate);
     ctxt.fillStyle = 'rgba(0, 0, 0, 0.1)'; //This creates a motion blur effect
     ctxt.fillRect(0, 0, canvas.width, canvas.height); //cleared the screen to show circle projectiles rather than lines
     player.draw();
     particles.forEach(function (particle, index) {
         if (particle.alpha <= 0) {
             particles.splice(index, 1);
         } else {
             particle.update();
         }
     });
     projectiles.forEach(function (projectile, index) {
         projectile.update();
         // Removes the projectiles from the edges of the screen to improve performance
         if (Projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height) {
             setTimeout(function () {
                 projectiles.splice(index, 1);
             }, 0);
         }
     });
 
     enemies.forEach(function (enemy, index) {
         enemy.update();
 
         const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
         //End game
         if (dist - enemy.radius - player.radius < 1) {
             cancelAnimationFrame(animationId);
             modalEL.style.display = 'flex';
             bigScoreEl.innerHTML = score;
         }
 
         projectiles.forEach(function (projectile, projectileIndex) {
             const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
 
             //Projectiles touch enemy
             if (dist - enemy.radius - projectile.radius < 1) {
 
                 //Make explosion   
                 for (let i = 0; i < enemy.radius * 2; i++) {
                     particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, {
                         x: Math.random() - 0.5 * (Math.random() * 5),
                         y: Math.random() - 0.5 * (Math.random() * 5) }));
                 }
 
                 if (enemy.radius - 10 > 5) {
 
                     //increase score
                     score += 100;
                     scoreEl.innerHTML = score;
 
                     gsap.to(enemy, {
                         radius: enemy.radius - 10
                     });
                     setTimeout(function () {
                         projectiles.splice(projectileIndex, 1);
                     }, 0);
                 } else {
 
                     //completely remove from scene
                     score += 250;
                     scoreEl.innerHTML = score;
 
                     setTimeout(function () {
                         enemies.splice(index, 1);
                         projectiles.splice(projectileIndex, 1);
                     }, 0);
                 }
             }
         });
     });
 }
 
 //Add an event listener to listen for a click event which will create a projectile
 addEventListener('click', function (event) {
     //Trigonometry to make the projectile aim where we click
     const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
 
     let velocity = {
         x: Math.cos(angle) * 4, //returns angles between -1 to 1
         y: Math.sin(angle) * 4
     };
 
     projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, 'rgb(255, 162, 255)', velocity));
 });
 
 startGameBtn.addEventListener('click', function () {
     init();
     animate();
     spawnEnemies();
     modalEL.style.display = 'none';
 });