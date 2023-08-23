let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "purple", "green"];
let max = 0;

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keydown", function() {
    if(started == false) {
        console.log("game is Started");
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    max = Math.max(max,level);
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randCol = btns[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);

    console.log("rand colr :", randCol);
    gameSeq.push(randCol);
    gameFlash(randBtn);
}


function checkAns(idx) {
   if(gameSeq[idx] === userSeq[idx]) {
        if(gameSeq.length == userSeq.length)  {
           setTimeout(levelUp, 1000);
        } 

   } else {
      h2.innerHTML = `Game over! your score was <b>${level}<b> <br>press any key to Start. High score is : ${max}`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "white"
      }, 150);
      reset();
   }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
