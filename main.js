const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 800;

let spacePressed = false;//will flip between true and false whenever spacebarr is pressed
let angle = 0;//used to move slightly the bird up and down
let hue = 0;//will cycle trought RGB spectrum using HSL colour property
let frame = 0;//frame count over animation loop
let score = 0; // will increase when character avoid obstacle 
let gamespeed = 2;//will use to move obstacles, particles and background at same speed

const gardient = ctx.createLinearGradient(0, 0, 0, 70);
gardient.addColorStop('0.4', '#eaff00');
gardient.addColorStop('0.5', '#03fcf8');
gardient.addColorStop('0.55', '#380ec2');
gardient.addColorStop('0.6', '#05fce4');
gardient.addColorStop('0.9', '#eaff00');

const background = new Image();
background.src = '/FlappyBird/img/ww.png';
const BG = {
    x1: 0,//first background 
    x2: canvas.width,//second background 
    y: 0,
    width:canvas.width,
    height: canvas.height
}
function handleBackground(){ 
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else (BG.x1 -= gamespeed);
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else {BG.x2 -= gamespeed};
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10,canvas.height - 90, 50, 50);//player 
    handleBackground();
    handleObstacles();
    bird.update();//will draw current rectangle (player)
    bird.draw();//player cordinates 
    ctx.fillStyle = gardient;
    ctx.font = '90px Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleParticles();
    handleCollisions();
    if(handleCollisions()) return;// when collision is detected the game stops 
    requestAnimationFrame(animate);// recursion; will create animation loop
    angle += 0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown',function(e){
    //console.log(e.code);  shows the pressed keys in console
    if (e.code === 'Space') spacePressed = true;
});
window.addEventListener('keyup',function(e){ 
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = '/FlappyBird/img/bang.png';
function handleCollisions(){ // we need to check both top and bottom obstacles for collusion
    for(let i = 0; i < obstaclesArray.length; i ++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x && 
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || 
            (bird.y > canvas.height - obstaclesArray[i].bottom &&//check for both 
                bird.y + bird.height < canvas.height))){
                    //collision detected
                    ctx.drawImage(bang, bird.x, bird.y, 50, 50);//if collusion is detected bang.png will appear 
                    ctx.font = "25px Georgia";
                    ctx.fillStyle = 'white';
                    ctx.fillText('Game Over, your score is ' + score, 160, canvas.height/2 -10);
                    
                    return true;
                }
    }
}

