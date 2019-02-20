// Get display
const display = document.querySelector('.display-value');
const $hourDisplay = display.querySelector('.hour-display');
const $minuteDisplay = display.querySelector('.minute-display');
const $secondsDisplay = display.querySelector('.seconds-display');
const $milisecondsDisplay = display.querySelector('.miliseconds-display');
const $lapDisplay = document.querySelector('.timer-lap');
const $gitHubDisplay = document.querySelector('.github-link');

//Get controls
const controls = document.querySelector('.timer-controls');
const $resetBtn = controls.querySelector('.reset');
const $startStopBtn = controls.querySelector('.start-stop');
const $lapBtn = controls.querySelector('.lap');

//Miscellaneous variables
let msIntervalId;
let lapArr = [];
let lapData;
let lapTemplate;

//Time values
let hour = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

//Functionality
$startStopBtn.addEventListener('click', () => {
    $startStopBtn.classList.toggle('recording');
    if($gitHubDisplay.classList.contains('hide')){
        $gitHubDisplay.classList.remove('hide');
    }
    if($lapBtn.classList.contains('invisible')){
        $lapBtn.classList.remove('invisible');
    }
    if(!$startStopBtn.classList.contains('recording')) {
        clearInterval(msIntervalId);
        console.log('Stopwatch:: Timer stopped')
    } else {
        console.log('Stopwatch:: Timer started')
        msIntervalId = setInterval(() => {
            miliseconds++;
            $milisecondsDisplay.textContent = miliseconds;
            if(miliseconds == 100) {
                miliseconds = 1;
                $milisecondsDisplay.textContent = miliseconds;
                seconds++;
                if($secondsDisplay.classList.contains('hide')) {
                    $secondsDisplay.classList.remove('hide');
                }
                $secondsDisplay.textContent = seconds;
            }
            if(seconds == 60) {
                seconds = 1;
                $secondsDisplay.textContent = seconds;
                minutes++;
                if($minuteDisplay.classList.contains('hide')) {
                    $minuteDisplay.classList.remove('hide');
                }
                $minuteDisplay.textContent = minutes;
            }
            if(minutes == 60) {
                minutes = 1;
                $minuteDisplay.textContent = minutes;
                hour++;
                if($hourDisplay.classList.contains('hide')) {
                    $hourDisplay.classList.remove('hide');
                }
                $hourDisplay.textContent = hour;
            }
        }, 10)
    }

});

$resetBtn.addEventListener('click', () => {
    console.log('Stopwatch:: Timer reset')
    $startStopBtn.classList.remove('recording');
    clearInterval(msIntervalId);
    lapArr = [];
    $lapDisplay.innerHTML = '';
    
    hour = 0;
    minutes = 0;
    seconds = 0;
    miliseconds = 0;
    
    $hourDisplay.textContent = hour;
    $hourDisplay.classList.add('hide');
    $minuteDisplay.textContent = minutes;
    $minuteDisplay.classList.add('hide');
    $secondsDisplay.textContent = seconds;
    $secondsDisplay.classList.add('hide');
    $milisecondsDisplay.textContent = '00';

    if(!$lapBtn.classList.contains('invisible')){
        $lapBtn.classList.add('invisible');
    }
    
});

$lapBtn.addEventListener('click', () => {
    if(miliseconds) {
        console.log('Stopwatch:: Timer lapped')
        $lapDisplay.innerHTML = '';
        lapData = 
        `<div class="value">${hour? hour <10 ? '0'+hour +':' : hour+':': '00:'}${minutes ? minutes < 10 ? '0'+minutes+':' : minutes+':' : '00:'}${seconds ? seconds < 10 ? '0'+seconds+':':seconds+':' : '00:'}${miliseconds ? miliseconds < 10 ? '0'+miliseconds : miliseconds : '00'}</div>`;
    
        lapArr.push(lapData);
    
        if(lapArr.length == 6) {
            lapArr.shift();
        }
    
        lapArr.forEach((lap, i) => {
            lapTemplate = 
            `<div class="lap">
                <div class="number"># ${i+1}</div>
                ${lap}
            </div>`;
            $lapDisplay.innerHTML += lapTemplate;
        });
    }
});