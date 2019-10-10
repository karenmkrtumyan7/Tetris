let td = document.getElementsByTagName('td');
let intervalId;
let figureArr = [
    [3, 4, 5, 6], 
    [4, 5, 14, 15],
    [3, 4, 5, 13], 
    [3, 4, 5, 14], 
    [3, 4, 5, 15], 
    [3, 4, 14, 15], 
    [4, 5, 13, 14] 
]
let randomColor;

function giveRandomColor() {
    let arr = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'aqua'];
    randomColor = arr[Math.floor(Math.random() * arr.length)];
}

function create() {
    let random = [...figureArr[Math.floor(Math.random() * figureArr.length)]];
    giveRandomColor();
    for (let i = 0; i < 4; i++) {
        td[random[i]].style.backgroundColor = randomColor; 
    }

    return random;
}

let randomFigure = create();

function goLeftOrRight(n) {
  
    let arr = giveBorders();
    let answer = checkGoLeftOrRight(arr, n);

    if (answer) {
        for (let i = 0; i < 4; i++) {
            td[randomFigure[i]].style.backgroundColor = '';
        }

        for (let i = 0; i < 4; i++) {
            td[randomFigure[i] + n].style.backgroundColor = randomColor;
            randomFigure[i] += n;
        }
    }
    // console.log(arr);
    console.log(answer)
}


function checkGoLeftOrRight(arr, n) {
    
    for (let i = 0; i < arr.length; i++) {

        if (td[arr[i]].className === 'right' && n === 1) return false;
        if(td[arr[i]].className === 'left' && n === -1) return false;

        if (td[arr[i] - 1].style.backgroundColor !== '' && !randomFigure.includes(arr[i] - 1)) {
            return false;      
        }

        if (td[arr[i] + 1].style.backgroundColor !== '' && !randomFigure.includes(arr[i] + 1)) {
            return false;
        }
    }
    return true;
}

function giveBorders() { 
    let resArr = [];

    for(let i = 0; i < randomFigure.length; i++) {
        if(!(randomFigure.includes(randomFigure[i] - 1) && randomFigure.includes(randomFigure[i] + 1))) {
            resArr.push(randomFigure[i]);
        }
    }

    return resArr;
}



function winCheck() {   
    let answer;
    let winCount = 0;

    for (let i = 0; i < 10; i++) {
        if (td[i].style.backgroundColor === randomColor) {
            answer = 'You Lose';
            winCount++;
        }
    }

    if (winCount === 10) {
        answer = 'You Win';
    }

    if (answer) {
        alert(answer);
    }

    return answer;
}

function keyPressing(event) {
    
        if (event.keyCode === 37) {
            goLeftOrRight(-1);
        }

        if (event.keyCode === 39) {
            goLeftOrRight(1);
        }

        if (event.keyCode === 40) {
            goDown();
        }
    }; 


       
    document.documentElement.addEventListener('keydown', keyPressing);
    
function countScore() {
    document.getElementById('score').lastElementChild.innerHTML++;
}    

function goDown() {
    
    for (let i = 0; i < 4; i++) {
        
        td[randomFigure[i]].removeEventListener('keydown', keyPressing);
    }

    let isFindDownFirst = false;
    let checkingArr = [];

    for (let i = 0; i < 4; i++) {
        
        if (Math.ceil(randomFigure[0] / 10) <= Math.ceil(randomFigure[i] / 10)) {
            isFindDownFirst = true;
        }

        if (Math.ceil(randomFigure[0] / 10) === Math.ceil(randomFigure[3] / 10)) {
            checkingArr = [...randomFigure];
            break;
        }

        if (isFindDownFirst) {
            checkingArr.push(randomFigure[i]);
        } else if (td[randomFigure[i] + 10] !== undefined) {
            if (td[randomFigure[i] + 10].style.backgroundColor === '' && !randomFigure.includes(randomFigure[i] + 10)) {
                checkingArr.push(randomFigure[i]);    
            } 
        }
    }
    console.log(checkingArr);
     
    for (let i = 0; i < checkingArr.length; i++) {
        
        if (checkingArr[i] >= 190) {
            clearInterval(intervalId);
            if (!winCheck()) {
                randomFigure = create();
                intervalId = setInterval(goDown, 800);
                countScore();
            }
            return;
        }

        if (td[checkingArr[i] + 10].style.backgroundColor !== '' && !checkingArr.includes(checkingArr[i] + 10)) {
            clearInterval(intervalId);
            if (!winCheck()) {
                randomFigure = create();
                intervalId = setInterval(goDown, 800);
                countScore();
            }
            return;
        }
    }
    
    for (let i = 0; i < 4; i++) {
        td[randomFigure[i]].style.backgroundColor = '';
    }    

    for (let i = 0; i < 4; i++) {
        randomFigure[i] = randomFigure[i] + 10;
        td[randomFigure[i]].style.backgroundColor = randomColor;
    }    

    for (let i = 0; i < 4; i++) {
        td[randomFigure[i]].addEventListener('keydown', keyPressing);
    }   

}

intervalId = setInterval(goDown, 800);


