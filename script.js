function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

// Each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42.
function operate(tempOperator, displayMemory0, displayMemory1){
    let result = 0;
    switch (tempOperator) {
        case "add":
            result = add(displayMemory0, displayMemory1);
            displayOutput(result);
            // console.log(result);
            // console.log(`displayMemory0: ${displayMemory[0]}`);
            return result; // sends it back down to operator function.
        case "subtract":
            result = subtract(displayMemory0, displayMemory1);
            displayOutput(result);
            return result;
        case "multiply":
            result = multiply(displayMemory0, displayMemory1);
            displayOutput(result);
            return result;            
        case "divide":
            result = divide(displayMemory0, displayMemory1);
            displayOutput(result);
            return result;
        default:
            return 0;
    }
    //displayMemory = []; // clear memory
    //displayTemp = "";
}

const screen = document.querySelector('.inner-screen .main');
const screenLog = document.querySelector('.screenlog');
const clear = document.querySelector('.clear');
const deleteNum = document.querySelector('.delete');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const five = document.querySelector('.five');
const six = document.querySelector('.six');
const seven = document.querySelector('.seven');
const eight = document.querySelector('.eight');
const nine = document.querySelector('.nine');
const zero = document.querySelector('.zero');
const decimal = document.querySelector('.decimal');
const addOperator = document.querySelector('.plus');
const subtractOperator = document.querySelector('.subtract');
const multiplyOperator = document.querySelector('.multiply');
const divideOperator = document.querySelector('.divide');
const equalOperator = document.querySelector('.equal');
const buttons = document.querySelectorAll('.button');
let displayMemory = [];
let numberString = "";  //was displayTemp
let operatorStorage = "";
let tempOperator = "";
let screenStorage = "";

// outputs displayTemp2Memory's number to screen
function displayOutput(input){    
    screen.textContent = input;
}

// stores number inputs on click/keypress as strings until action button is pressed.
function displayStorage(input){
    //console.log("numberString.charAt(0):" + numberString.charAt(0));

    // if (numberString.charAt(0) === "0") {
    //     numberString = "";
    //     console.log("don't start a number string with zero");
    // } else {    
    //     numberString = numberString + input;
    //     displayOutput(numberString);
    // };

    if (numberString == "" && input == 0){
        console.log("don't start a number string with zero");
    } else {
        numberString = numberString + input;
        displayOutput(numberString);
    }
};

function operatorDisplayStorage(input){
    operatorStorage = input;
}

// parses string to numbers and stores in array
function displayTemp2Memory(){
    let temp = parseFloat(numberString);
    displayMemory.push(temp); // pushes temp into array

    screenStorage = screenStorage + numberString + " " + operatorStorage + " "; // stores old numberString into screenStorage
    screenLog.textContent = screenStorage; // display running log;

    numberString = ""; // empties numberString
};

clear.addEventListener('click', function(){
    displayMemory = [];
    numberString = "";
    screen.textContent = 0;
    screenLog.textContent = "What is the Matrix";
    screenStorage = "";
});

deleteNum.addEventListener('click', function(){
    if(numberString.length === 1){
        // displayMemory = [];
        displayTemp = "";
        screen.textContent = 0;
    } else if (numberString.length > 1){
        numberString = numberString.slice(0, numberString.length-1);
        displayOutput(numberString);
    }
});

addOperator.addEventListener('click', function(){
    if(numberString == "") {
        console.log("empty numString");
    } else {
        operatorDisplayStorage("+")
        displayTemp2Memory(); //push numberString into displayMemory array.

        if(displayMemory.length === 2) {
            // console.log(`if displayMemory.length === 2 statement triggered. tempOperator: ${tempOperator}`);
            let multiResult = operate(tempOperator, displayMemory[0], displayMemory[1]);
            // console.log(`tempResult: ${tempResult}`);
            displayMemory = [];
            displayMemory[0] = multiResult;
            // console.log(displayMemory[0]);    
        }
        //displayTemp2Memory(); //push temp strings into displayMemory array.
        tempOperator = "add";
    };
});

subtractOperator.addEventListener('click', function(){
    if(numberString == "") {
        console.log("empty numString");
    } else {    
        operatorDisplayStorage("-")
        displayTemp2Memory();
        if (displayMemory.length === 2){
            let multiResult = operate(tempOperator, displayMemory[0], displayMemory[1]);
            displayMemory = []; 
            displayMemory[0] = multiResult;
        };     
        tempOperator = "subtract";
    };   
});

multiplyOperator.addEventListener('click', function(){
    if(numberString == "") {
        console.log("empty numString");
    } else {
        operatorDisplayStorage("*")
        displayTemp2Memory();
        if (displayMemory.length === 2){
            let multiResult = operate(tempOperator, displayMemory[0], displayMemory[1]);
            displayMemory = []; 
            displayMemory[0] = multiResult;
        };     
        tempOperator = "multiply";
    };   
});

divideOperator.addEventListener('click', function(){
    if(numberString == "") {
        console.log("empty numString");
    } else {
        operatorDisplayStorage("/")
        displayTemp2Memory();
        if(displayMemory.length === 2 && displayMemory[1] === 0){
            screen.textContent = 0;
            screenLog.textContent = "You cannot divide by 0. Press CLEAR.";
            screenStorage = "";
        } else if (displayMemory.length === 2){
            let multiResult = operate(tempOperator, displayMemory[0], displayMemory[1]);
            displayMemory = []; 
            displayMemory[0] = multiResult;
        };     
        tempOperator = "divide";
    };   
});

equalOperator.addEventListener('click', function(){    
        if(displayMemory.length === 0 || displayMemory.length === 1 && numberString == "") {
            console.log("You need either a full equation or a second term in the expression before equaling. Press CLEAR.")
        } else {
            operatorDisplayStorage("=");    
            displayTemp2Memory(); //push 2nd temp strings into displayMemory array.    
            let result = operate(tempOperator, displayMemory[0], displayMemory[1]);
            //displayOutput(result);
            displayMemory = []; // clear memory
            numberString = ""; // clear temp
            tempOperator = ""; // clear operator
            screenStorage = ""; // clear screen log
        };         
});

decimal.addEventListener('click', function(){
    if(!numberString.includes(".")) {
        displayStorage(".");
    };    
});

// https://keyjs.dev/#keyboard-events-inspector
window.addEventListener('keydown', function(e){
    if(e.code == 'Numpad1'){
        displayStorage(1);
    } else if(e.code == 'Numpad2'){
        displayStorage(2);
    } else if(e.code == 'Numpad3'){
        displayStorage(3);
    } else if(e.code == 'Numpad4'){
        displayStorage(4);
    } else if(e.code == 'Numpad5'){
        displayStorage(5);
    } else if(e.code == 'Numpad6'){
        displayStorage(6);
    } else if(e.code == 'Numpad7'){
        displayStorage(7);
    } else if(e.code == 'Numpad8'){
        displayStorage(8);
    } else if(e.code == 'Numpad9'){
        displayStorage(9);
    } else if(e.code == 'Numpad0'){
        displayStorage(0);
    } else if(e.code == 'NumpadDecimal'){
        displayStorage(".");
    } 
    
    // else if(e.code == 'NumpadDivide'){
    //     displayStorage("/");
    // } else if(e.code == 'NumpadMultiply'){
    //     displayStorage("*");
    // } else if(e.code == 'NumpadSubtract'){
    //     displayStorage("-");
    // } else if(e.code == 'NumpadAdd'){
    //     displayStorage("+");
    // } else if(e.code == 'NumpadEnter'){
    //     displayStorage("=");
    // }; 
});

one.addEventListener('click', function(){
    displayStorage(1);
});

two.addEventListener('click', function(){
    displayStorage(2);
});

three.addEventListener('click', function(){
    displayStorage(3);
});

four.addEventListener('click', function(){
    displayStorage(4);
});

five.addEventListener('click', function(){
    displayStorage(5);
});

six.addEventListener('click', function(){
    displayStorage(6);
});

seven.addEventListener('click', function(){
    displayStorage(7);
});

eight.addEventListener('click', function(){
    displayStorage(8);
});

nine.addEventListener('click', function(){
    displayStorage(9);
});

zero.addEventListener('click', function(){
    displayStorage(0);
});



window.addEventListener('keydown', function(e) {
    //const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    const audio = document.querySelector(`audio[data-key="${e.key}"]`);
    //console.log(e);
    if(!audio) return;
    audio.play();
});

//const article = document.querySelector('#electric-cars');
//console.log(article.dataset.columns);

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
/* To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase). */

