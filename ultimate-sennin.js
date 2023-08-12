var flag = true;
var markCount = 0;
var pId = 100;
var nId;
var hist = [];
var mReach = [];
var bReach = [];
var limite;
let seconds;
let running = false;
let display = document.getElementById("display");

function displayTime() {
    display.textContent = "残り " + seconds + " 秒";
}

function countDown() {
    setTimeout(() => {
        if (!running) {
            return;
        } else if (seconds > 0) {
            seconds--;
            displayTime();
        } else if (seconds === 0) {
            running = false;
            display.textContent = "タイムアップです。";
            winner("タイムアップ");
        }
        countDown();
    }, 1000);
}

function resetTimer() {
    seconds = limite;
    running = true;
    flag = true;
    displayTime();
}

function PushSquare(e) {
    nId = Number(e.id);
    if (e.textContent != "") return;
    else if (judgeAround(pId, nId)) {
        running = false;
        winner("マス被り");
        return;
    }
    var turn = document.getElementById("turn");
    var count = document.getElementById("count");

    if (markCount === 0 || Math.floor((markCount-1)/2)%2 === 1) {
        e.textContent = "○";
        if (markCount%2 === 0) {
            turn.textContent = "x のターン";
            count.textContent = "あと2回";
            pId = 100;
            seconds = limite;
            resetTimer();
        } else {
            count.textContent = "あと1回";
            pId = nId;
        }
    } else {
        e.textContent = "x";
        if (markCount%2 === 0) {
            turn.textContent = "○のターン";
            count.textContent = "あと2回";
            pId = 100;
            seconds = limite;
            resetTimer();
        } else {
            count.textContent = "あと1回";
            pId = nId;
        }
    }
    evaluate();
    if (!flag) winner("");
    markCount++;
    hist.push(nId);
}

function judgeAround(pn, nn) {
    if (!(pn % 8 === 1) && !(pn % 8 === 0)) {
        for (let i=-1; i<2; i++) {
            for (let j=-1; j<2; j++) {
                if(nn === pn+i*8+j) {
                    return true;
                }
            }
        }
    } else if (pn % 8 === 1) {
        for (let i=-1; i<2; i++) {
            for (let j=0; j<2; j++) {
                if(nn === pn+i*8+j) {
                    return true;
                }
            }
        }
    } else {
        for (let i=-1; i<2; i++) {
            for (let j=-1; j<1; j++) {
                if(nn === pn+i*8+j) {
                    return true;
                }
            }
        }
    }
    return false;
}

function evaluate() {
    for (var i=0; i<8; i++) {
        for (var j=1; j<6; j++) {
            //横方向
            if (document.getElementById(String(i*8+j)).innerHTML === "○" && document.getElementById(String(i*8+j+1)).innerHTML === "○" && document.getElementById(String(i*8+j+2)).innerHTML === "○" && document.getElementById(String(i*8+j+3)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                    document.getElementById(String(i*8+j)).style.background = "#ffaaaa";
                    document.getElementById(String(i*8+j+1)).style.background = "#ffaaaa";
                    document.getElementById(String(i*8+j+2)).style.background = "#ffaaaa";
                    document.getElementById(String(i*8+j+3)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(i*8+j)) dobl++;
                    if (mReach.includes(i*8+j+1)) dobl++;
                    if (mReach.includes(i*8+j+2)) dobl++;
                    if (mReach.includes(i*8+j+3)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            } 
            if (document.getElementById(String(i*8+j)).innerHTML === "x" && document.getElementById(String(i*8+j+1)).innerHTML === "x" && document.getElementById(String(i*8+j+2)).innerHTML === "x" && document.getElementById(String(i*8+j+3)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                    document.getElementById(String(i*8+j)).style.background = "#aaaaff";
                    document.getElementById(String(i*8+j+1)).style.background = "#aaaaff";
                    document.getElementById(String(i*8+j+2)).style.background = "#aaaaff";
                    document.getElementById(String(i*8+j+3)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(i*8+j)) dobl++;
                    if (bReach.includes(i*8+j+1)) dobl++;
                    if (bReach.includes(i*8+j+2)) dobl++;
                    if (bReach.includes(i*8+j+3)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            //縦方向
            if (document.getElementById(String(i+(j-1)*8+1)).innerHTML === "○" && document.getElementById(String(i+j*8+1)).innerHTML === "○" && document.getElementById(String(i+(j+1)*8+1)).innerHTML === "○" && document.getElementById(String(i+(j+2)*8+1)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                    document.getElementById(String(i+(j-1)*8+1)).style.background = "#ffaaaa";
                    document.getElementById(String(i+j*8+1)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+1)*8+1)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+2)*8+1)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(i+(j-1)*8+1)) dobl++;
                    if (mReach.includes(i+j*8+1)) dobl++;
                    if (mReach.includes(i+(j+1)*8+1)) dobl++;
                    if (mReach.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*8+1)).innerHTML === "x" && document.getElementById(String(i+j*8+1)).innerHTML === "x" && document.getElementById(String(i+(j+1)*8+1)).innerHTML === "x" && document.getElementById(String(i+(j+2)*8+1)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                    document.getElementById(String(i+(j-1)*8+1)).style.background = "#aaaaff";
                    document.getElementById(String(i+j*8+1)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+1)*8+1)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+2)*8+1)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(i+(j-1)*8+1)) dobl++;
                    if (bReach.includes(i+j*8+1)) dobl++;
                    if (bReach.includes(i+(j+1)*8+1)) dobl++;
                    if (bReach.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
        }
    }

    for (var i=1; i<6; i++) {
        for (var j=6-i; j>0; j--) {
            //右肩下がり、上
            if (document.getElementById(String(i+(j-1)*9)).innerHTML === "○" && document.getElementById(String(i+j*9)).innerHTML === "○" && document.getElementById(String(i+(j+1)*9)).innerHTML === "○" && document.getElementById(String(i+(j+2)*9)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                    document.getElementById(String(i+(j-1)*9)).style.background = "#ffaaaa";
                    document.getElementById(String(i+j*9)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+1)*9)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+2)*9)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(i+(j-1)*9)) dobl++;
                    if (mReach.includes(i+j*9)) dobl++;
                    if (mReach.includes(i+(j+1)*9)) dobl++;
                    if (mReach.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*9)).innerHTML === "x" && document.getElementById(String(i+j*9)).innerHTML === "x" && document.getElementById(String(i+(j+1)*9)).innerHTML === "x" && document.getElementById(String(i+(j+2)*9)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                    document.getElementById(String(i+(j-1)*9)).style.background = "#aaaaff";
                    document.getElementById(String(i+j*9)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+1)*9)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+2)*9)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(i+(j-1)*9)) dobl++;
                    if (bReach.includes(i+j*9)) dobl++;
                    if (bReach.includes(i+(j+1)*9)) dobl++;
                    if (bReach.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            //右肩下がり、下
            if (document.getElementById(String(47-i-9*j)).innerHTML === "○" && document.getElementById(String(56-i-9*j)).innerHTML === "○" && document.getElementById(String(65-i-9*j)).innerHTML === "○" && document.getElementById(String(74-i-9*j)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                    document.getElementById(String(47-i-9*j)).style.background = "#ffaaaa";
                    document.getElementById(String(56-i-9*j)).style.background = "#ffaaaa";
                    document.getElementById(String(65-i-9*j)).style.background = "#ffaaaa";
                    document.getElementById(String(74-i-9*j)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(47-i-9*j)) dobl++;
                    if (mReach.includes(56-i-9*j)) dobl++;
                    if (mReach.includes(65-i-9*j)) dobl++;
                    if (mReach.includes(74-i-9*j)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            if (document.getElementById(String(47-i-9*j)).innerHTML === "x" && document.getElementById(String(56-i-9*j)).innerHTML === "x" && document.getElementById(String(65-i-9*j)).innerHTML === "x" && document.getElementById(String(74-i-9*j)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                    document.getElementById(String(47-i-9*j)).style.background = "#aaaaff";
                    document.getElementById(String(56-i-9*j)).style.background = "#aaaaff";
                    document.getElementById(String(65-i-9*j)).style.background = "#aaaaff";
                    document.getElementById(String(74-i-9*j)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(47-i-9*j)) dobl++;
                    if (bReach.includes(56-i-9*j)) dobl++;
                    if (bReach.includes(65-i-9*j)) dobl++;
                    if (bReach.includes(74-i-9*j)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
        }
    }
    for (var i=8; i>3; i--) {
        for (var j=i-3; j>0; j--) {
            //右肩上がり、上
            if (document.getElementById(String(i+(j-1)*7)).innerHTML === "○" && document.getElementById(String(i+j*7)).innerHTML === "○" && document.getElementById(String(i+(j+1)*7)).innerHTML === "○" && document.getElementById(String(i+(j+2)*7)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                    document.getElementById(String(i+(j-1)*7)).style.background = "#ffaaaa";
                    document.getElementById(String(i+j*7)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+1)*7)).style.background = "#ffaaaa";
                    document.getElementById(String(i+(j+2)*7)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(i+(j-1)*7)) dobl++;
                    if (mReach.includes(i+j*7)) dobl++;
                    if (mReach.includes(i+(j+1)*7)) dobl++;
                    if (mReach.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*7)).innerHTML === "x" && document.getElementById(String(i+j*7)).innerHTML === "x" && document.getElementById(String(i+(j+1)*7)).innerHTML === "x" && document.getElementById(String(i+(j+2)*7)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                    document.getElementById(String(i+(j-1)*7)).style.background = "#aaaaff";
                    document.getElementById(String(i+j*7)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+1)*7)).style.background = "#aaaaff";
                    document.getElementById(String(i+(j+2)*7)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(i+(j-1)*7)) dobl++;
                    if (bReach.includes(i+j*7)) dobl++;
                    if (bReach.includes(i+(j+1)*7)) dobl++;
                    if (bReach.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            //右肩上がり、下
            if (document.getElementById(String(51-i-7*j)).innerHTML === "○" && document.getElementById(String(58-i-7*j)).innerHTML === "○" && document.getElementById(String(65-i-7*j)).innerHTML === "○" && document.getElementById(String(72-i-7*j)).innerHTML === "○") {
                if (mReach.length === 0) {
                    mReach.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                    document.getElementById(String(51-i-7*j)).style.background = "#ffaaaa";
                    document.getElementById(String(58-i-7*j)).style.background = "#ffaaaa";
                    document.getElementById(String(65-i-7*j)).style.background = "#ffaaaa";
                    document.getElementById(String(72-i-7*j)).style.background = "#ffaaaa";
                } else {
                    let dobl = 0;
                    if (mReach.includes(51-i-7*j)) dobl++;
                    if (mReach.includes(58-i-7*j)) dobl++;
                    if (mReach.includes(65-i-7*j)) dobl++;
                    if (mReach.includes(72-i-7*j)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
            if (document.getElementById(String(51-i-7*j)).innerHTML === "x" && document.getElementById(String(58-i-7*j)).innerHTML === "x" && document.getElementById(String(65-i-7*j)).innerHTML === "x" && document.getElementById(String(72-i-7*j)).innerHTML === "x") {
                if (bReach.length === 0) {
                    bReach.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                    document.getElementById(String(51-i-7*j)).style.background = "#aaaaff";
                    document.getElementById(String(58-i-7*j)).style.background = "#aaaaff";
                    document.getElementById(String(65-i-7*j)).style.background = "#aaaaff";
                    document.getElementById(String(72-i-7*j)).style.background = "#aaaaff";
                } else {
                    let dobl = 0;
                    if (bReach.includes(51-i-7*j)) dobl++;
                    if (bReach.includes(58-i-7*j)) dobl++;
                    if (bReach.includes(65-i-7*j)) dobl++;
                    if (bReach.includes(72-i-7*j)) dobl++;
                    if (dobl < 2){
                        flag = false;
                        return;
                    }
                }
            }
        }
    }
    if (markCount === 63) flag = false;
}

function winner(str) {
    const modalDialog = document.getElementById("dialog");
    let result = document.getElementById("message");
    console.log(result);
    let factor = document.getElementById("cause");
    if (markCount === 63) {
        result.textContent = "引き分け";
        modalDialog.showModal();
    } else if ((markCount === 0 || Math.floor((markCount-1)/2)%2 === 1) && str === "") {
        result.textContent = "○の勝ち";
        modalDialog.showModal();
    } else if (Math.floor((markCount-1)/2)%2 === 0 && str === ""){
        result.textContent = "xの勝ち";
        modalDialog.showModal();
    } else if (markCount === 0 || Math.floor((markCount-1)/2)%2 === 1) {
        factor.textContent = str;
        result.textContent = "xの勝ち";
        modalDialog.showModal();
    } else {
        factor.textContent = str;
        result.textContent = "○の勝ち";
        modalDialog.showModal();
    }
}

let reload = document.getElementById("again");
reload.addEventListener('click', function(){
    location.reload();
});

let back = document.getElementById("back");
back.addEventListener('click', function(){
    location.href = "ultimate.html";
});

const popupWrapper = document.getElementById('popup-wrapper');
function start(time) {
    limite = time;
    seconds = time;
    running = true;
    displayTime();
    popupWrapper.style.display = 'none';
    countDown();
}