let inputt={x: 0, y: 0};
let eat=new Audio('Data/food.mp3');
let over=new Audio('data/gameover.mp3');
let pathchange=new Audio('Data/move.mp3');
let gamesound=new Audio('Data/music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let arr=[
    {x: 13,y: 15}
];
foood={x:14,y:15};
// Game Function
function main(timee){
    window.requestAnimationFrame(main);
    if ((timee-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=timee;
    gameEngine();
}
function isCollide(arrr){
    for (let ind = 1; ind< arr.length; ind++) {
        if (arrr[ind].x===arrr[0].x && arrr[ind].y===arrr[0].y){
            return true;
        }
    }
    if (arrr[0].x>=18 || arrr[0].x<0 || arrr[0].y<0 || arrr[0].y>=18){
        return true;
    }
    return false;
    }

function gameEngine(){
    // update position of snake
    if (isCollide(arr)){
        over.play();
        highscoreBox.innerHTML="Highscore: "+score;
        score=0
        scoreBox.innerHTML="Score: "+ score;
        gamesound.pause();
        inputt={x:0,y:0};
        alert("Game Over press key to start new")
        arr=[{x:13,y:15}];
        gamesound.play();
        score=0;
    }
    // if snake eat the food
    if (arr[0].y===foood.y && arr[0].x===foood.x){
        score+=1
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(hiscoreval));
            highscoreBox.innerHTML = "Highscore: " + hiscoreval;
        }
        scoreBox.innerHTML="Score: "+ score;
        eat.play();
        arr.unshift({x: arr[0].x + inputt.x , y:arr[0].y + inputt.y} )
        let a=2;
        let b=16;
        foood={x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    };
    // moving the snake
    for (let i = arr.length - 2; i>=0; i--) {
        arr[i+1]={...arr[i]};
        
    }
    arr[0].x+=inputt.x;
    arr[0].y+=inputt.y;

    // render the food
    board.innerHTML="";
    arr.forEach((e,ind)=>{
        elementt=document.createElement('div')
        elementt.style.gridRowStart=e.y;
        elementt.style.gridColumnStart=e.x;
        if (ind===0){
            elementt.classList.add('Head');
        }
        else{
            elementt.classList.add('snake');
        }
        board.appendChild(elementt);

    })
    //render the head od snake 
        Felementt=document.createElement('div');
        Felementt.style.gridRowStart = foood.y;
        Felementt.style.gridColumnStart=foood.x;
        Felementt.classList.add('food');
        board.appendChild(Felementt);

}


let high = localStorage.getItem("highscore");
if(high === null){
    hiscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(high);
    highscoreBox.innerHTML = "Highscore: " + high;
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputt={x:0,y:1}; // start the game
    pathchange.play();
    switch(e.key){
        case "ArrowUp":
            inputt.x=0;
            inputt.y=-1;
            console.log("UP");
            console.log(inputt.x);
            break;
        case "ArrowDown":
            inputt.x=0;
            inputt.y=1;
            console.log("Down")
            break;
        case "ArrowLeft":
            inputt.x=-1;
            inputt.y=0;
            console.log("Left")
            break;
        case "ArrowRight":
            inputt.x=1;
            inputt.y=0;
            console.log("Right")
            break;
        default:
            break;
    }

});