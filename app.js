document.addEventListener('DOMContentLoaded',()=>{
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    const button = document.querySelector('button');
    const windowH = window.innerHeight;

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
          this.sound.play();
        }
        this.stop = function(){
          this.sound.pause();
        }
    }
   
    const loseSound = new sound('lose.mp3');
    // let obstaclePosition = 1000;
    let position = 0;
   
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;

    function control(e){
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping = true;
                jump()
            }
        }
    }
    document.addEventListener('keyup',control)
  
   
    function jump(){
        let count = 0;
        let timerId = setInterval(function(){

            if(count === 15){
                clearInterval(timerId)
                
                let downTimerId = setInterval(function(){
                    if(count ===0){
                        clearInterval(downTimerId)
                        isJumping=false;
                    }
                    console.log('down')
                    position -= 5;
                    count--;
                    position = position*gravity;
                    dino.style.bottom = windowH*0.5+position+'px';
                })

                
            }

            console.log('up')
            count++;
            position +=30;
            position = position*gravity
            dino.style.bottom = windowH*0.5+position+'px';
        },20)
    }

    function generateObstacles(){
        let randomTime = Math.random()*4000
        let obstaclePosition = 2000
        const obstacle = document.createElement('div')
        const obstaclePixel = document.createElement('div')
        if(!isGameOver) {
            obstaclePixel.classList.add('obstaclePixel')
            for(let i=0;i<64;i++){
                obstacle.append(obstaclePixel.cloneNode(true))
                console.log('append')
            }
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle);
            obstacle.style.left = obstaclePosition+'px';
        } 
        
        let timerId = setInterval(function(){
            if(obstaclePosition>0 && obstaclePosition<60 && position<60){
                clearInterval(timerId)
                isGameOver = true
                alert.style.display='block'
                button.style.display = 'block'
                loseSound.play();
                
            }
            if(!isGameOver){
                obstaclePosition -=10
                obstacle.style.left = obstaclePosition+'px';
            }
        },20)
        setTimeout(generateObstacles,randomTime)
    }
    generateObstacles();

    





})