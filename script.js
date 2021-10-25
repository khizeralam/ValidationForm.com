// input fields

const firstName = document.getElementById('firstName'); 
const lastName = document.getElementById('lastName'); 
const password = document.getElementById('password'); 
const confirmPassword = document.getElementById('confirmPassword'); 
const email = document.getElementById('email'); 

//form

const form = document.getElementById('myForm');

// validatio color

const green = '#4CAF50';
const red = '#F44336';

//Handle form
form.addEventListener('submit', function(event){
    //prevent default behaviour
    event.preventDefault();
    if (
        validateFirstName() && 
        validateLastName() && 
        validatePassword() &&
        validateConfirmPassword()  &&
        validateEmail()
    ) {
        const name = firstName.value;
        const container = document.querySelector('div.container');
        const loader = document.creatElement('div');
        loader.className = 'progress';
        const loadingBar = document.creatElement('div');
        loadingBar.className = 'indeterminate';
        loader.appendChild(loadingBar);
        container.appendChild(loader);  
        setTimeout(function(){
            const loaderDiv = document.querySelector('div.progress');
            const panel = document.creatElement('div');
            panel.className = 'card-panel green';
            const text = document.creatElement('span');
            text.appendChild(document.createTextNode('Sign up Successfull, welcome to socialApp ${name}'));
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
        }, 1000)   
    }

});

//validators firstName
function validateFirstName() {
    //check if is it empty
    if(checkIfEmpty(firstName)) return;
    //check if is it only letter
    if(!checkIfOnlyLetters(firstName)) return;
    return true;
}
//validators lastName
function validateLastName(){
    //check if is it empty
    if(checkIfEmpty(lastName)) return;
    //check if is it only letter
    if(!checkIfOnlyLetters(lastName)) return;
    return true;
}


//validators passwords
function validatePassword(){
     // check empty
    if(checkIfEmpty(password)) return;
    //check if uncertain lenth
    if(!meetLength(password, 4, 30)) return;
    //check password against our character set
    
    //check password against our character set
    //1- a
    //2- a 1
    //3- A a 1
    //1- A a 1 @
    if(!containsCharacter(password, 3)) return;
    return true;
}
function validateConfirmPassword(){
    if(password.className !== 'valid'){
        setInvalid(confirmPassword , 'password must be valid');
        return;
    }
// if they match
if(password.value  !== confirmPassword.value){
    setInvalid(confirmPassword, 'password must match');
    return;
} else {
        setValid(confirmPassword)
}
return true;
}
function validateEmail(){
    if(checkIfEmpty(email)) return;
    if(!containsCharacter(email, 5))return;
    return true;
}

//utility
function checkIfEmpty(field){
    if(IsEmpty(field.value.trim())){
        // set field invalid
        setInvalid(field, '${field.name} must not be empty');
        return true;
    }
    else{
        //set field valid
        setValid(field);
        return false;
    }
}
function IsEmpty(value){
    if(value === '') return true;
    return false;

}
function  setInvalid(field, message){
    field.className = 'invalid';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}
function  setValid(field){
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    //field.nextElementSibling.style.color = green;
}
 function checkIfOnlyLetters(field){
     if(/^[a-zA-Z ]+$/.test(field.value)){
         setValid(field);
         return true;
     } else {
         setInvalid(field, '${field.name} contain only letters');
         return false;
     }
     
 }

 function meetLength(field, minLength, maxLength){
     if(field.value.length >= minLength && field.value.length < maxLength){
         setValid(field);
         return true;
     } else if(field.value.length < minLength){
         setInvalid(field, '${field.name} must be at least ${minLength} character long');
         return false;
     }
         else if(field.value.length > maxLength) 
         { 
             setInValid(field, '${field.name} must be shorter than ${maxLength} characters');
             return false;
         }
     }
 function containsCharacter(field, code){
     let regEx;
     switch(code){
        case 1:
            //letters
               regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'must contain at least one letter');

        case 2:
            //letter and  numbers
              regEx = /[^A-Za-z0-9]+/;
            return matchWithRegEx(regEx, field, 'must contain at least one letter and one number');
        
        case 3:
              //uppercase, lowercase and number
              regEx = /[a-zA-Z]+/g; 
        return matchWithRegEx(regEx, field, 'must contain at least one Uppercase one lowercase and one number');  
        
        case 4:
            //uppercase, lowercase number and one special char 
              regEx =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/; 
        return matchWithRegEx(regEx, field, 'must contain at least one Uppercase one lowercase one special char and one number for your safety');
      
        case 5:
            //Email Pattern 
              regEx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return matchWithRegEx(regEx, field, 'must type valid Email please'); 
         
        default:
            
         return false;
     }  
 }
 function matchWithRegEx(regEx, field, message){
     if(field.value.match(regEx)){
         setValid(field);
         return true;

     } else {
         setInvalid(field, message);
         return false;
     }
 }

 

