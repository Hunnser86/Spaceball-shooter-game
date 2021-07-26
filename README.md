# Spaceball Shooter Game

This is a fun game I made using [HTML canvas](https://en.wikipedia.org/wiki/Canvas_element) .

It has a simple design, much like [asteroids](https://en.wikipedia.org/wiki/Asteroids_(video_game)), where the player is in the center of the screen and the enemies attack from all sides.

It is designed to be responsive to different screen sizes, so any player can use it on any device.

---

## User Experience

---


* ### **User Stories**
     
     * **Site Owner Goals**
        
       **To give players a fun game.**

        *  To make it simple to understand and easy to use
        * the game should start and stop at the appropriate times
        * the enemies should explode
            
     * **Visitor Goals**

       *  visitors should be able to immediately begin playing
       *  They should be able to see their score
       *  They should be able to restart the game from scratch
---

 ## Design
---
   * **Colours**
       
       * I felt that the game should have a black background.
       
       * The player is white, so that it stands out on the screen

       * The enemies are random colors that are vibrant 



   * **Typography**

       *  I used the standard Sans serif font for my score and my modal.
       I did this as I felt it fit the style of the game.

   * **Imagery**

     *  The imagery used was a simple black background with colourful enemies to allow for good contrast.

* **Wireframes**

    * I made some simple wireframes in the design process to show how it will look on desktop and mobile.

    ![screenshot of the wireframe process](/assets/wireframes/wireframe-1.jpg)


    ![Screenshot of Wireframe for desktop](/assets/wireframes/wireframe-2.jpg)

    
# Features 
  ### Start Game
     
* At the beginning of the game, a modal is displayed, with a button that says "start game" 

### End Game

* When the player gets a game over, the modal is displayed once again, with the players score and the start game button. 

### Score

* In the top left corner of the screen, there will be a simple scoreboard, 
  displaying "Score:0".  This will increment when a player ditroys an enemy. 
  

### Enemy shrink score

* Players can score more points when destroying large enemies, as each time they are hit
  they reduce in size, giving the player points as they do so. 

### Random enemies

* The enemies will be randomised in respect to starting position off screen, 
  their size and their colour. 


### Static Player

* The player will be static in the center of the screen and enemies will approach from all angles. 

### Projectiles 

* The player will be able to shoot projectiles at the enemies. (THANK GOODNESS!!) 


### Enemies will explode

* When the enemies are hit, they will produce particles and when 
  they are destroyed, they will explode in a firework type way.  The 
  Particles from this will fade over time. 


# Technologies Used

## **Launguages**

    
 * [HTML5](https://en.wikipedia.org/wiki/HTML5)
 
 * [CSS3](https://en.wikipedia.org/wiki/CSS)

 * [JavaScript](https://en.m.wikipedia.org/wiki/JavaScript)

 

 ## **Frameworks, Libraries and Programs Used**

 1. [Tailwind CSS](https://tailwindcss.com/)

   * I used Tailwind to create the modal that displays the final score and the button for starting the game.

 2. [jsdelivr:](https://getbootstrap.com/)   

   * jsdelivr was used to enable GitHub to serve my web files without any configuration.

 3. [Git:](https://github.com/)  

   * Git was used for version control of the game by using the git commit and git push functions in the terminal, to to ensure any changes I made were not lost and were also meaningful to the development process. It would also help any other developers to assess or make changes in a real world setting.

 4. [GitHub:](https://github.com/)

   *  GitHub was used to store the code from the project after being pushed from the terminal.

 5. [Figma:](https://www.figma.com/)  

  * I used Figma for the Wireframe, to full site visual design process.


# Testing

For my testing I used manual testing.

For testing the code for errors, I used the following;

- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/)

- [Beautify Tools JS validator](https://beautifytools.com/javascript-validator.php)

- [es6console](https://es6console.com) 

- [W3C Markup Validation](https://validator.w3.org/)

These were used in particular, to check for errors in the code to enable me
to rectify these and have a fully functioning website.

# Testing the game functionality

For the functionality tests, I ran through what I considered to be the core 
functions of the game and attempted to use them as a standard player would.
The results are as below.

| Test Label     | Test Action   | Expected Outcome  | Test Outcome | 
| -------------  |-------------- |----------------- | ------------ |
| Game Setup     | The modal is <br> displayed and the <br> button starts the <br>game. | The game starts. | PASS
| The player is <br> displayed      | Start the game<br> to check.      |  The player is <br> displayed  | PASS
| The score is<br>displayed.  | Check the top <br>corner.      | The score is<br>displayed.   | PASS |
| enemies<br>approach <br>player.  | Start the game  | The enemies<br>approach <br>player.   | PASS |

# Testing the game during the build

To test the game while I was coding, I used the console.log()
to show that certain functions acted the way they should.  I logged out the word 'go' to show that the action or event had taken place.

| Test Label     | Test Action   | Expected Outcome  | Test Outcome | 
| -------------  |-------------- |----------------- | ------------ |
| Draw Player     | log the word<br>'go' to the<br>console. | The word go will be <br>logged to<br>the console. | PASS
| Projectile<br>click event.| Set the event<br>to log 'go'<br>to the console.|   The word go will be <br>logged to<br>the console. | PASS
|The score<br>is displayed. | Check the top <br>left corner.      | The score is<br>displayed.   | PASS |
| enemies<br>approach <br>player.  | Start the game  | The enemies<br>approach <br>player.   | PASS |

# Code errors from the validator tools

As you can see, there is very little HTML or CSS in this project, so the code validators threw no errors (which was nice to see for once!).

However, when I came to use the beautify tools JS validator, I realised that after having read and followed the various tutorials and documentation, that I had been using the es6 syntax and that arrow functions were "NOT ALLOWED!".

Being a complete noob, I had no idea of the mish mash of syntaxes I had used (what a nightmare!).  This lead me to more research, and eventually I found an online tool that would convert the es6 syntax, to an older version that did no throw any errors (PHEW!).

I had a few declaration errors which were simple enough to fix, and finally I had errorless code (HUZZAH!).

## Site owner Goals testing

  **To give players a fun game.**

   *  **To make it simple to understand and easy to use**
    
      To achieve this, I included a modal on the start screen of the game.  The modal displays the simple instructions "click or touch the screen to fire".  It also displays the players score and a button to start the game.    

   * **The game should start and stop at the appropriate times.**
     
     This goal was acieved simply by putting a button in the modal to start the game.  To end the game, the player must be hit by an enemy.  This was slightly more complicated.

     I created an if statement, wherein, if the distance between the enemy radius and the player radius is less than one, the animation function ceases and the modal displays along with the score.

     `if (dist - enemy.radius - player.radius < 1) {
             cancelAnimationFrame(animationId);
             modalEL.style.display = 'flex';
             bigScoreEl.innerHTML = score;
         }`

   * **the enemies should explode**

     AND DO THEY EVER!
    I created a particle function which not only draws a particle, but updates the draw function to slow it's velocity to give it that outer space feel and then fade them out form the screen.

`const Particle = function () {
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
     }]);`
            
    
---


## Visitor Goals



 *  **visitors should be able to immediately begin playing.**
     
      This was achieved, simply by putting the modal on the start page, with a button to start the game.

   *  **They should be able to see their score.**
      
      The score is displayed throughout the game, in the top left of the screen.  At the end of the game, the high score is displayed in the modal.
      
   *  **They should be able to restart the game from scratch.**
     
      The player simply needs to click the button, and off they go.
---
# Client based testing

  * For the client based tests, I sent the link to the game to various people and asked them, to 
  use it.  I asked the first person to test it on mobile devices such as , mobile phones and tablets.
  
    They were asked to check both orientations, to see if the responsiveness worked.
    They were also asked to check the site accross Chrome, Firefox and Opera browsers to check compatability.

  * For the next test I asked three people to check the desktop version of the game. Each of them had a different browser.  One had Chrome, one had Firefox and one had Opera.  

    I asked them to check the gameplay for glitches such as players not displaying or firing etc and to check for any gramatical errors.

  * After the tests were completed, they reported back that the game worked fine accross all browsers
  and the responsiveness worked on all the mobile devices that were used.  There were no gramatical errors either (which was nice).    

# Deployment

  * To deploy the game, I used [GitHub pages](https://pages.github.com/).
  
    The process for this was simple.  I used the terminal on the [Gitpod](https://www.gitpod.io/)
    IDE.  I used the git add . command to add all the files that had been worked on.  Next I used the git commit
    command, to commit my files ready for deployment, followed by the git push command, to push the code to 
    [GitHub](https://github.com/).

    I also did this during development, so as not to loose and changes or work that I had done.

  * To link Github pages to the correct files I went to settings and scrolled down to the 
  [GitHub pages](https://github.com/Hunnser86/Milestone-project-version-3/settings) section of the page.  
  Next, I clicked the drop down menu on the source section
  and chose the master branch and the root folder from my repository.  This is how GitHub pages
  built my game.

  * I then waited for the game to be built and followed the link at the top of the section.
---

# Running the game locally

  *  To run the game locally, you will need to clone the GitHub [repository](https://github.com/Hunnser86/Spaceball-shooter-game)

  *  To do this, simply go to the GitHub [repository](https://github.com/Hunnser86/Spaceball-shooter-game).

     * Next, click the dropdown menu named "code".  This will bring up the clone menu.
     
     * Select HTTPS and copy the link.

     * Create a location on your local computer, where you would like to clone the repository.

     * Then on your local terminal use the "git clone" command and paste the link after it and hit return.

     * This will create a folder in the location you have created.  This will contain all the files from the
     repository, allowing you to run the site.

# Credits

  **Content**

  * All code was written by myself (Rob Hunns).

  **Tutorials**

  * [For ideas on creating enemy ships](http://blog.sklambert.com/html5-canvas-game-the-enemy-ships/)  

  * [For tips on canvas](https://www.w3schools.com/tags/ref_canvas.asp)

  * [For information on canvas arc to draw the characters](https://www.w3schools.com/tags/canvas_arc.asp)

  * [For information on collision detection](https://happycoding.io/tutorials/processing/collision-detection)

  * [For how to move objects](https://stackoverflow.com/questions/6199018/moving-objects-on-html5-canvas)

  * [for creating particles](https://modernweb.com/creating-particles-html5-canvas/)



  


#  Acknowledgements
  
 

  * I would first like to acknowledge my mentor Brian, for the suppoprt he has
    given me during the project.  Particularly for giding me towards good documentation.
    for the parts of the project where I needed to do a bit more research.

  * Codeinstitute: For providing such good training and tutorials, giving me the confidence to 
    keep going and to hone my problenm solving skills.
    
      






