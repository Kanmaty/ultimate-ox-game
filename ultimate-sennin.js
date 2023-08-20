var flag = true;
var stop = false;
var markCount = 0;
var pId = 100;
var nId;
var mReach1 = [];
var mReach2 = [];
var mstack = [];
var mflag = true;
var bReach1 = [];
var bReach2 = [];
var bstack = [];
var bflag = true;
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
    if (stop) {
        if (document.getElementById(String(nId)).style.backgroundColor !== "rgb(255, 166, 40)") return;
        if (document.getElementById(String(nId)).textContent === "○") {
            for (let i=0; i<mstack.length; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(mstack[i][j])).style.background = "#ffffff";
                }
            }
            for (let i=0; i<mstack.length; i++) {
                if (mstack[i].includes(nId)) {
                    for (let j=0; j<4; j++) {
                        document.getElementById(String(mstack[i][j])).style.background = "#ffaaaa";
                        if (mReach1.length === j) mReach1.push(mstack[i][j]);
                        else mReach2.push(mstack[i][j]);
                    }
                    if (mReach2.length === 4) mflag = mstack[i][4];
                }
            }
            mstack = [];
            if (mReach2.length === 4) for (let i=0; i<4; i++) document.getElementById(String(mReach1[i])).style.background = "#ffaaaa";
        } else {
            for (let i=0; i<bstack.length; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(bstack[i][j])).style.background = "#ffffff";
                }
            }
            for (let i=0; i<bstack.length; i++) {
                if (bstack[i].includes(nId)) {
                    for (let j=0; j<4; j++) {
                        document.getElementById(String(bstack[i][j])).style.background = "#aaaaff";
                        if (bReach1.length === j) bReach1.push(bstack[i][j]);
                        else bReach2.push(bstack[i][j]);
                    }
                    if (bReach2.length === 4) bflag = bstack[i][4];
                }
            }
            bstack = [];
            if (bReach2.length === 4) for (let i=0; i<4; i++) document.getElementById(String(bReach1[i])).style.background = "#aaaaff";
        }
        stop = false;
        document.getElementById('mul').style.display = 'none';
        document.getElementById('blank').style.display = 'block';
        evaluate();
    } else {
        if (e.textContent != "") return;
        else if (judgeAround(pId, nId)) {
            running = false;
            winner("マス被り");
            return;
        }

        if (markCount === 0 || Math.floor((markCount-1)/2)%2 === 1) e.textContent = "○";
        else e.textContent = "x";
        if (markCount === 0 || Math.floor((markCount-1)/2)%2 === 1) {
            if (markCount%2 === 0) pId = 100; 
            else pId = nId;
        } else {
            if (markCount%2 === 0) pId = 100;
            else pId = nId;
        }
        evaluate();
        markCount++;
    }
    if (!stop) {
        var turn = document.getElementById("turn");
        var count = document.getElementById("count");

        if (Math.floor(markCount/2)%2 === 0) {
            if (markCount%2 === 0) {
                count.textContent = "あと1回";
            } else {
                turn.textContent = "x のターン";
                count.textContent = "あと2回";
                resetTimer();
            }
        } else {
            if (markCount%2 === 0) {
                count.textContent = "あと1回";
            } else {
                turn.textContent = "○のターン";
                count.textContent = "あと2回";
                resetTimer();
            }
        }
    }
    if (!flag) winner();
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
                if (mReach1.length === 0) {
                    let tem = [];
                    tem.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                    mstack.push(tem);
                } else if (mReach1.length === 4 && mReach2.length === 0) {
                    let dobl = 0;
                    if (mReach1.includes(i*8+j)) dobl++;
                    if (mReach1.includes(i*8+j+1)) dobl++;
                    if (mReach1.includes(i*8+j+2)) dobl++;
                    if (mReach1.includes(i*8+j+3)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        mstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (mReach1.includes(i*8+j)) dobl++;
                    if (mReach1.includes(i*8+j+1)) dobl++;
                    if (mReach1.includes(i*8+j+2)) dobl++;
                    if (mReach1.includes(i*8+j+3)) dobl++;
                    if (mReach2.includes(i*8+j)) dobl++;
                    if (mReach2.includes(i*8+j+1)) dobl++;
                    if (mReach2.includes(i*8+j+2)) dobl++;
                    if (mReach2.includes(i*8+j+3)) dobl++;
                    if (dobl < 2) {
                        if (mflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            } 
            if (document.getElementById(String(i*8+j)).innerHTML === "x" && document.getElementById(String(i*8+j+1)).innerHTML === "x" && document.getElementById(String(i*8+j+2)).innerHTML === "x" && document.getElementById(String(i*8+j+3)).innerHTML === "x") {
                if (bReach1.length === 0) {
                    let tem = [];
                    tem.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                    bstack.push(tem);
                } else if (bReach1.length === 4 && bReach2.length === 0) {
                    let dobl = 0;
                    if (bReach1.includes(i*8+j)) dobl++;
                    if (bReach1.includes(i*8+j+1)) dobl++;
                    if (bReach1.includes(i*8+j+2)) dobl++;
                    if (bReach1.includes(i*8+j+3)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i*8+j, i*8+j+1, i*8+j+2, i*8+j+3);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        bstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (bReach1.includes(i*8+j)) dobl++;
                    if (bReach1.includes(i*8+j+1)) dobl++;
                    if (bReach1.includes(i*8+j+2)) dobl++;
                    if (bReach1.includes(i*8+j+3)) dobl++;
                    if (bReach2.includes(i*8+j)) dobl++;
                    if (bReach2.includes(i*8+j+1)) dobl++;
                    if (bReach2.includes(i*8+j+2)) dobl++;
                    if (bReach2.includes(i*8+j+3)) dobl++;
                    if (dobl < 2) {
                        if (bflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            } 
            //縦方向
            if (document.getElementById(String(i+(j-1)*8+1)).innerHTML === "○" && document.getElementById(String(i+j*8+1)).innerHTML === "○" && document.getElementById(String(i+(j+1)*8+1)).innerHTML === "○" && document.getElementById(String(i+(j+2)*8+1)).innerHTML === "○") {
                if (mReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                    mstack.push(tem);
                } else if (mReach1.length === 4 && mReach2.length === 0) {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*8+1)) dobl++;
                    if (mReach1.includes(i+j*8+1)) dobl++;
                    if (mReach1.includes(i+(j+1)*8+1)) dobl++;
                    if (mReach1.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        mstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*8+1)) dobl++;
                    if (mReach1.includes(i+j*8+1)) dobl++;
                    if (mReach1.includes(i+(j+1)*8+1)) dobl++;
                    if (mReach1.includes(i+(j+2)*8+1)) dobl++;
                    if (mReach2.includes(i+(j-1)*8+1)) dobl++;
                    if (mReach2.includes(i+j*8+1)) dobl++;
                    if (mReach2.includes(i+(j+1)*8+1)) dobl++;
                    if (mReach2.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2) {
                        if (mflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*8+1)).innerHTML === "x" && document.getElementById(String(i+j*8+1)).innerHTML === "x" && document.getElementById(String(i+(j+1)*8+1)).innerHTML === "x" && document.getElementById(String(i+(j+2)*8+1)).innerHTML === "x") {
                if (bReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                    bstack.push(tem);
                } else if (bReach1.length === 4 && bReach2.length === 0) {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*8+1)) dobl++;
                    if (bReach1.includes(i+j*8+1)) dobl++;
                    if (bReach1.includes(i+(j+1)*8+1)) dobl++;
                    if (bReach1.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*8+1, i+j*8+1, i+(j+1)*8+1, i+(j+2)*8+1);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        bstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*8+1)) dobl++;
                    if (bReach1.includes(i+j*8+1)) dobl++;
                    if (bReach1.includes(i+(j+1)*8+1)) dobl++;
                    if (bReach1.includes(i+(j+2)*8+1)) dobl++;
                    if (bReach2.includes(i+(j-1)*8+1)) dobl++;
                    if (bReach2.includes(i+j*8+1)) dobl++;
                    if (bReach2.includes(i+(j+1)*8+1)) dobl++;
                    if (bReach2.includes(i+(j+2)*8+1)) dobl++;
                    if (dobl < 2) {
                        if (bflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
        }
    }

    for (var i=1; i<6; i++) {
        for (var j=6-i; j>0; j--) {
            //右肩下がり、上
            if (document.getElementById(String(i+(j-1)*9)).innerHTML === "○" && document.getElementById(String(i+j*9)).innerHTML === "○" && document.getElementById(String(i+(j+1)*9)).innerHTML === "○" && document.getElementById(String(i+(j+2)*9)).innerHTML === "○") {
                if (mReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                    mstack.push(tem);
                } else if (mReach1.length === 4 && mReach2.length === 0) {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*9)) dobl++;
                    if (mReach1.includes(i+j*9)) dobl++;
                    if (mReach1.includes(i+(j+1)*9)) dobl++;
                    if (mReach1.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        mstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*9)) dobl++;
                    if (mReach1.includes(i+j*9)) dobl++;
                    if (mReach1.includes(i+(j+1)*9)) dobl++;
                    if (mReach1.includes(i+(j+2)*9)) dobl++;
                    if (mReach2.includes(i+(j-1)*9)) dobl++;
                    if (mReach2.includes(i+j*9)) dobl++;
                    if (mReach2.includes(i+(j+1)*9)) dobl++;
                    if (mReach2.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2) {
                        if (mflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*9)).innerHTML === "x" && document.getElementById(String(i+j*9)).innerHTML === "x" && document.getElementById(String(i+(j+1)*9)).innerHTML === "x" && document.getElementById(String(i+(j+2)*9)).innerHTML === "x") {
                if (bReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                    bstack.push(tem);
                } else if (bReach1.length === 4 && bReach2.length === 0) {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*9)) dobl++;
                    if (bReach1.includes(i+j*9)) dobl++;
                    if (bReach1.includes(i+(j+1)*9)) dobl++;
                    if (bReach1.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*9, i+j*9, i+(j+1)*9, i+(j+2)*9);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        bstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*9)) dobl++;
                    if (bReach1.includes(i+j*9)) dobl++;
                    if (bReach1.includes(i+(j+1)*9)) dobl++;
                    if (bReach1.includes(i+(j+2)*9)) dobl++;
                    if (bReach2.includes(i+(j-1)*9)) dobl++;
                    if (bReach2.includes(i+j*9)) dobl++;
                    if (bReach2.includes(i+(j+1)*9)) dobl++;
                    if (bReach2.includes(i+(j+2)*9)) dobl++;
                    if (dobl < 2) {
                        if (bflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
            //右肩下がり、下
            if (i !== 1) {
                if (document.getElementById(String(47-i-9*j)).innerHTML === "○" && document.getElementById(String(56-i-9*j)).innerHTML === "○" && document.getElementById(String(65-i-9*j)).innerHTML === "○" && document.getElementById(String(74-i-9*j)).innerHTML === "○") {
                    if (mReach1.length === 0) {
                        let tem = [];
                        tem.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                        mstack.push(tem);
                    } else if (mReach1.length === 4 && mReach2.length === 0) {
                        let dobl = 0;
                        if (mReach1.includes(47-i-9*j)) dobl++;
                        if (mReach1.includes(56-i-9*j)) dobl++;
                        if (mReach1.includes(65-i-9*j)) dobl++;
                        if (mReach1.includes(74-i-9*j)) dobl++;
                        if (dobl < 2) {
                            let tem = [];
                            tem.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                            if (dobl === 1) tem.push(false);
                        else tem.push(true);
                            mstack.push(tem);
                        }
                    } else {
                        let dobl = 0;
                        if (mReach1.includes(47-i-9*j)) dobl++;
                        if (mReach1.includes(56-i-9*j)) dobl++;
                        if (mReach1.includes(65-i-9*j)) dobl++;
                        if (mReach1.includes(74-i-9*j)) dobl++;
                        if (mReach2.includes(47-i-9*j)) dobl++;
                        if (mReach2.includes(56-i-9*j)) dobl++;
                        if (mReach2.includes(65-i-9*j)) dobl++;
                        if (mReach2.includes(74-i-9*j)) dobl++;
                        if (dobl < 2) {
                            if (mflag) {
                                flag = false;
                                return;
                            } else if (dobl === 0) {
                                flag = false;
                                return;   
                            }
                        }
                    }
                }
                if (document.getElementById(String(47-i-9*j)).innerHTML === "x" && document.getElementById(String(56-i-9*j)).innerHTML === "x" && document.getElementById(String(65-i-9*j)).innerHTML === "x" && document.getElementById(String(74-i-9*j)).innerHTML === "x") {
                    if (bReach1.length === 0) {
                        let tem = [];
                        tem.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                        bstack.push(tem);
                    } else if (bReach1.length === 4 && bReach2.length === 0) {
                        let dobl = 0;
                        if (bReach1.includes(47-i-9*j)) dobl++;
                        if (bReach1.includes(56-i-9*j)) dobl++;
                        if (bReach1.includes(65-i-9*j)) dobl++;
                        if (bReach1.includes(74-i-9*j)) dobl++;
                        if (dobl < 2) {
                            let tem = [];
                            tem.push(47-i-9*j, 56-i-9*j, 65-i-9*j, 74-i-9*j);
                            if (dobl === 1) tem.push(false);
                            else tem.push(true);
                            bstack.push(tem);
                        }
                    } else {
                        let dobl = 0;
                        if (bReach1.includes(47-i-9*j)) dobl++;
                        if (bReach1.includes(56-i-9*j)) dobl++;
                        if (bReach1.includes(65-i-9*j)) dobl++;
                        if (bReach1.includes(74-i-9*j)) dobl++;
                        if (bReach2.includes(47-i-9*j)) dobl++;
                        if (bReach2.includes(56-i-9*j)) dobl++;
                        if (bReach2.includes(65-i-9*j)) dobl++;
                        if (bReach2.includes(74-i-9*j)) dobl++;
                        if (dobl < 2) {
                            if (bflag) {
                                flag = false;
                                return;
                            } else if (dobl === 0) {
                                flag = false;
                                return;   
                            }
                        }
                    }
                }
            }
        }
    }
    for (var i=8; i>3; i--) {
        for (var j=i-3; j>0; j--) {
            //右肩上がり、上
            if (document.getElementById(String(i+(j-1)*7)).innerHTML === "○" && document.getElementById(String(i+j*7)).innerHTML === "○" && document.getElementById(String(i+(j+1)*7)).innerHTML === "○" && document.getElementById(String(i+(j+2)*7)).innerHTML === "○") {
                if (mReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                    mstack.push(tem);
                } else if (mReach1.length === 4 && mReach2.length === 0) {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*7)) dobl++;
                    if (mReach1.includes(i+j*7)) dobl++;
                    if (mReach1.includes(i+(j+1)*7)) dobl++;
                    if (mReach1.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        mstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (mReach1.includes(i+(j-1)*7)) dobl++;
                    if (mReach1.includes(i+j*7)) dobl++;
                    if (mReach1.includes(i+(j+1)*7)) dobl++;
                    if (mReach1.includes(i+(j+2)*7)) dobl++;
                    if (mReach2.includes(i+(j-1)*7)) dobl++;
                    if (mReach2.includes(i+j*7)) dobl++;
                    if (mReach2.includes(i+(j+1)*7)) dobl++;
                    if (mReach2.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2) {
                        if (mflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
            if (document.getElementById(String(i+(j-1)*7)).innerHTML === "x" && document.getElementById(String(i+j*7)).innerHTML === "x" && document.getElementById(String(i+(j+1)*7)).innerHTML === "x" && document.getElementById(String(i+(j+2)*7)).innerHTML === "x") {
                if (bReach1.length === 0) {
                    let tem = [];
                    tem.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                    bstack.push(tem);
                } else if (bReach1.length === 4 && bReach2.length === 0) {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*7)) dobl++;
                    if (bReach1.includes(i+j*7)) dobl++;
                    if (bReach1.includes(i+(j+1)*7)) dobl++;
                    if (bReach1.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2) {
                        let tem = [];
                        tem.push(i+(j-1)*7, i+j*7, i+(j+1)*7, i+(j+2)*7);
                        if (dobl === 1) tem.push(false);
                        else tem.push(true);
                        bstack.push(tem);
                    }
                } else {
                    let dobl = 0;
                    if (bReach1.includes(i+(j-1)*7)) dobl++;
                    if (bReach1.includes(i+j*7)) dobl++;
                    if (bReach1.includes(i+(j+1)*7)) dobl++;
                    if (bReach1.includes(i+(j+2)*7)) dobl++;
                    if (bReach2.includes(i+(j-1)*7)) dobl++;
                    if (bReach2.includes(i+j*7)) dobl++;
                    if (bReach2.includes(i+(j+1)*7)) dobl++;
                    if (bReach2.includes(i+(j+2)*7)) dobl++;
                    if (dobl < 2) {
                        if (bflag) {
                            flag = false;
                            return;
                        } else if (dobl === 0) {
                            flag = false;
                            return;   
                        }
                    }
                }
            }
            //右肩上がり、下
            if (i !== 8) {
                if (document.getElementById(String(51-i-7*j)).innerHTML === "○" && document.getElementById(String(58-i-7*j)).innerHTML === "○" && document.getElementById(String(65-i-7*j)).innerHTML === "○" && document.getElementById(String(72-i-7*j)).innerHTML === "○") {
                    if (mReach1.length === 0) {
                        let tem = [];
                        tem.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                        mstack.push(tem);
                    } else if (mReach1.length === 4 && mReach2.length === 0) {
                        let dobl = 0;
                        if (mReach1.includes(51-i-7*j)) dobl++;
                        if (mReach1.includes(58-i-7*j)) dobl++;
                        if (mReach1.includes(65-i-7*j)) dobl++;
                        if (mReach1.includes(72-i-7*j)) dobl++;
                        if (dobl < 2) {
                            let tem = [];
                            tem.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                            if (dobl === 1) tem.push(false);
                            else tem.push(true);
                            mstack.push(tem);
                        }
                    } else {
                        let dobl = 0;
                        if (mReach1.includes(51-i-7*j)) dobl++;
                        if (mReach1.includes(58-i-7*j)) dobl++;
                        if (mReach1.includes(65-i-7*j)) dobl++;
                        if (mReach1.includes(72-i-7*j)) dobl++;
                        if (mReach2.includes(51-i-7*j)) dobl++;
                        if (mReach2.includes(58-i-7*j)) dobl++;
                        if (mReach2.includes(65-i-7*j)) dobl++;
                        if (mReach2.includes(72-i-7*j)) dobl++;
                        if (dobl < 2) {
                            if (mflag) {
                                flag = false;
                                return;
                            } else if (dobl === 0) {
                                flag = false;
                                return;   
                            }
                        }
                    }
                }
                if (document.getElementById(String(51-i-7*j)).innerHTML === "x" && document.getElementById(String(58-i-7*j)).innerHTML === "x" && document.getElementById(String(65-i-7*j)).innerHTML === "x" && document.getElementById(String(72-i-7*j)).innerHTML === "x") {
                    if (bReach1.length === 0) {
                        let tem = [];
                        tem.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                        bstack.push(tem);
                    } else if (bReach1.length === 4 && bReach2.length === 0) {
                        let dobl = 0;
                        if (bReach1.includes(51-i-7*j)) dobl++;
                        if (bReach1.includes(58-i-7*j)) dobl++;
                        if (bReach1.includes(65-i-7*j)) dobl++;
                        if (bReach1.includes(72-i-7*j)) dobl++;
                        if (dobl < 2) {
                            let tem = [];
                            tem.push(51-i-7*j, 58-i-7*j, 65-i-7*j, 72-i-7*j);
                            if (dobl === 1) tem.push(false);
                            else tem.push(true);
                            bstack.push(tem);
                        }
                    } else {
                        let dobl = 0;
                        if (bReach1.includes(51-i-7*j)) dobl++;
                        if (bReach1.includes(58-i-7*j)) dobl++;
                        if (bReach1.includes(65-i-7*j)) dobl++;
                        if (bReach1.includes(72-i-7*j)) dobl++;
                        if (bReach2.includes(51-i-7*j)) dobl++;
                        if (bReach2.includes(58-i-7*j)) dobl++;
                        if (bReach2.includes(65-i-7*j)) dobl++;
                        if (bReach2.includes(72-i-7*j)) dobl++;
                        if (dobl < 2) {
                            if (bflag) {
                                flag = false;
                                return;
                            } else if (dobl === 0) {
                                flag = false;
                                return;   
                            }
                        }
                    }
                }
            }
        }
    }
    if (mReach1.length === 0 && mstack.length > 0) {
        if (mstack.length === 1) {
            for (let i=0; i<4; i++) {
                document.getElementById(String(mstack[0][i])).style.background = "#ffaaaa";
                mReach1.push(mstack[0][i]);
            }
            mstack = [];
        } else {
            let len = mstack.length;
            for (let i=0; i<len; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(mstack[i][j])).style.background = "#ffa628";
                    for (let k=0; k<len; k++) {
                        if (!(i === k) && mstack[k].includes(mstack[i][j])) document.getElementById(String(mstack[i][j])).style.background = "#ff5ad3";
                    }
                }
            }
            document.getElementById('mul').style.display = 'block';
            document.getElementById('blank').style.display = 'none';
            stop = true;
        }
    } else if (bReach1.length === 0 && bstack.length > 0) {
        if (bstack.length === 1) {
            for (let i=0; i<4; i++) {
                document.getElementById(String(bstack[0][i])).style.background = "#aaaaff";
                bReach1.push(bstack[0][i]);
            }
            bstack = [];
        } else {
            let len = bstack.length;
            for (let i=0; i<len; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(bstack[i][j])).style.background = "#ffa628";
                    for (let k=0; k<len; k++) {
                        if (!(i === k) && bstack[k].includes(bstack[i][j])) document.getElementById(String(bstack[i][j])).style.background = "#ff5ad3";
                    }
                }
            }
            document.getElementById('mul').style.display = 'block';
            document.getElementById('blank').style.display = 'none';
            stop = true;
        }
    } else if (mReach2.length === 0 && mstack.length > 0) {
        if (mstack.length === 1) {
            for (let i=0; i<4; i++) {
                document.getElementById(String(mstack[0][i])).style.background = "#ffaaaa";
                mReach2.push(mstack[0][i]);
            }
            mflag = mstack[0][4];
            mstack = [];
        } else {
            let len = mstack.length;
            for (let i=0; i<len; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(mstack[i][j])).style.background = "#ffa628";
                    for (let k=0; k<len; k++) {
                        if (!(i === k) && mstack[k].includes(mstack[i][j])) document.getElementById(String(mstack[i][j])).style.background = "#ff5ad3";
                    }
                }
            }
            document.getElementById('mul').style.display = 'block';
            document.getElementById('blank').style.display = 'none';
            stop = true;
        }
    } else if (bReach2.length === 0 && bstack.length > 0) {
        if (bstack.length === 1) {
            for (let i=0; i<4; i++) {
                document.getElementById(String(bstack[0][i])).style.background = "#aaaaff";
                bReach2.push(bstack[0][i]);
            }
            bflag = bstack[0][4];
            bstack = [];
        } else {
            let len = bstack.length;
            for (let i=0; i<len; i++) {
                for (let j=0; j<4; j++) {
                    document.getElementById(String(bstack[i][j])).style.background = "#ffa628";
                    for (let k=0; k<len; k++) {
                        if (!(i === k) && bstack[k].includes(bstack[i][j])) document.getElementById(String(bstack[i][j])).style.background = "#ff5ad3";
                    }
                }
            }
            document.getElementById('mul').style.display = 'block';
            document.getElementById('blank').style.display = 'none';
            stop = true;
        }
    }
    if (markCount === 63) flag = false;
}

function winner(str) {
    running = false;
    const modalDialog = document.getElementById("dialog");
    let result = document.getElementById("message");
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