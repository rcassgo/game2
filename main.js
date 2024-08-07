'use strict';
const gameMusic = document.getElementById('gameMusic');
const bug_pull = document.getElementById('bug_pull');
const carrot_pull = document.getElementById('carrot_pull');
const game_win = document.getElementById('game_win');
const alert = document.getElementById('alert');

const timmer = document.querySelector('.timmer');
let counter = document.querySelector('.counter');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const restartBtn = document.querySelector('.restartBtn');
const result = document.querySelector('.result');
const resultText = document.querySelector('.resultText');

timmer.textContent = '10';
let intervalId;

let game = 'off';


// 시작
startBtn.addEventListener('click',() => {
    gameMusic.play();
    startBtn.classList.toggle('active');
    pauseBtn.classList.toggle('active');
    result.classList.remove('active');
    startTimer();
    if(game=='off'){
        fieldset();
        game = 'on';
    }
});

// 정지
pauseBtn.addEventListener('click',() => {
    alert.play();
    gameMusic.pause();
    startBtn.classList.toggle('active');
    pauseBtn.classList.toggle('active');
    result.classList.add('active');
    resultText.textContent = '다시시작';
    clearInterval(intervalId); // 타이머 정지
});

// 다시시작
restartBtn.addEventListener('click', () => {
    timmer.textContent = '10';
    startBtn.classList.add('active');
    pauseBtn.classList.remove('active');
    result.classList.remove('active');
    startBtn.style.visibility = 'visible';
    pauseBtn.style.visibility = 'visible';
    resultText.textContent = '';
    counter.textContent = 10;
    clearInterval(intervalId);
    removeField();
    gameMusic.currentTime = 0;
    game = 'off';
})

// 타이머
function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        let currentValue = parseInt(timmer.textContent, 10);
        if (currentValue > 0) {
            timmer.textContent = currentValue - 1;
        } else {
            clearInterval(intervalId);
            result.classList.add('active');
            startBtn.style.visibility = 'hidden';
            pauseBtn.style.visibility = 'hidden';
            resultText.textContent = "YOU LOSE 😰";
        }
    }, 1000);
}


// 게임필드
const field = document.querySelector('.field');
const target = document.querySelector('.target');
const bug = document.querySelector('.bug');
const fieldRect = field.getBoundingClientRect();
const targetRect = target.getBoundingClientRect();
const bugRect = bug.getBoundingClientRect();


function fieldset() {
    const xMax = fieldRect.width;
    const yMax = fieldRect.height;
    
    for (let i = 0; i < 10; i++){
        const x = randomNumber(bugRect.width, xMax);
        const y = randomNumber(bugRect.height, yMax);
        const newBugImg = document.createElement('img');
        newBugImg.src = 'img/bug.png';
        newBugImg.classList.add('target');
        newBugImg.style.position = 'absolute';
        newBugImg.style.left = `${x}px`;
        newBugImg.style.top = `${y}px`;
        // 실패
        newBugImg.addEventListener('click', (event) => {
            if (result.classList.contains('active')) {
                event.stopPropagation(); // 이벤트 전파 중지
                return;
            }
            carrot_pull.play();
            gameMusic.pause();
            bug_pull.play();
            startBtn.style.visibility = 'hidden';
            startBtn.classList.toggle('active');
            pauseBtn.classList.toggle('active');
            result.classList.add('active');
            startBtn.style.visibility = 'hidden';
            pauseBtn.style.visibility = 'hidden';
            resultText.textContent = '실패!';
            clearInterval(intervalId); // 타이머 정지
            return;
        })
        field.appendChild(newBugImg);
    }
    
    for (let i = 0; i < 10; i++){
        const x = randomNumber(targetRect.width, xMax);
        const y = randomNumber(targetRect.height, yMax);
        const newTargetImg = document.createElement('img');
        newTargetImg.src = 'img/carrot.png';
        newTargetImg.classList.add('bug');
        newTargetImg.style.position = 'absolute';
        newTargetImg.style.left = `${x}px`;
        newTargetImg.style.top = `${y}px`;
        newTargetImg.addEventListener('click', (event) => {
            if (result.classList.contains('active')) {
                event.stopPropagation(); // 이벤트 전파 중지
                return;
            }
            const newCarrotPull = carrot_pull.cloneNode(); // 사운드 객체 복제
            newCarrotPull.play();
            newTargetImg.remove();
            counter.textContent -- ;
            //클리어
            if(counter.textContent == 0){
                gameMusic.pause();
                game_win.play();
                startBtn.classList.toggle('active');
                pauseBtn.classList.toggle('active');
                result.classList.add('active');
                resultText.textContent = '클리어!';
                clearInterval(intervalId); // 타이머 정지
                startBtn.style.visibility = 'hidden';
                return;
            }
        })
        field.appendChild(newTargetImg);
    }
}
function randomNumber(buttonRect, max) {
    return Math.random() * (max - buttonRect);
}
// 초기화
function removeField() {
    field.innerHTML = '';
}
