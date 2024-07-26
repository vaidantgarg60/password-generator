const  inputSlider = document.querySelector("[data-lengthSlider]");
const  lengthDisp = document.querySelector("[data-lengthNumber]");
const  passwordDisplay = document.querySelector("[data-passwordDisplay]");
const  copyBtn = document.querySelector("[data-copy]");
const  copyMsg = document.querySelector("[data-copyMsg]");
const  uppercaseCheck = document.querySelector("#uppercase");
const  lowercaseCheck = document.querySelector("#lowercase");
const  numbersCheck = document.querySelector("#numbers");
const  symbolsCheck = document.querySelector("#symbols");
const  indicator = document.querySelector("[data-indicator]");
const  generateBtn = document.querySelector(".generateBtn");
let  allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+=-{}:"?><,./';

let password = "";
let passwordLength=10;
let checkCount = 0;
handleSlider()  
// set strength citc
setIndicator("#ccc");

console.log("Password: " + password);
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisp.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =  ( ( passwordLength - min)*100/(max-min))+ "% 100%"

}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

console.log("Password: " + password);

function getRndInteger(min , max){
return Math.floor(Math.random() *(max-min)) + min ;
}

function generaterRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))   ;
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65, 91))   ;
}
function generateSymbol(){
       const randNum = getRndInteger(0, symbols.length);
       return symbols.charAt(randNum);
}

console.log("Password: " + password);


function  calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMsg.innerText = "Copied";
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000);
}
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value)
        copyContent();
});



// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});
console.log("Password: " + password);
generateBtn.addEventListener('click', () => {
    if (checkCount <= 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // Remove Previous Password 
    password = "";

    let arrayOfCheckedFunction = [];

    if (uppercaseCheck.checked) arrayOfCheckedFunction.push(generateUpperCase);
    if (lowercaseCheck.checked) arrayOfCheckedFunction.push(generateLowerCase);
    if (numbersCheck.checked) arrayOfCheckedFunction.push(generaterRandomNumber);
    if (symbolsCheck.checked) arrayOfCheckedFunction.push(generateSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

    // console.log("Password: " + password);

    // Additional addition
    for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
        let randIndex = getRndInteger(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
    // console.log("Password: " + password);

    // Shuffle Password 
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    calStrength();
});
console.log("Password: " + password);