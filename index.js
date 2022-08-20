const form = document.getElementById('form');
const FirstName = document.getElementById('F_name');
const LastName = document.getElementById('L_name');
const DOB = document.getElementById('txtbirthdate');
var Age = document.getElementById('txtage');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    ageCalculator();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const Firstname = FirstName.value.trim();
    const Lastname = LastName.value.trim();
    const DOBValue = DOB.value.trim();
    const AgeValue = Age.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
   

    if(Firstname === '') {
        setError(FirstName, 'Firstname is required');
    } else if(Firstname.length >= 30){
        setError(FirstName, 'Firstname must be less than 30 characters');
    }
     else {
        setSuccess(FirstName);
    }
    
    if(Lastname === '') {
        setError(LastName, 'Lastname is required');
    }else if(Lastname.length >= 30){
        setError(LastName, 'Lastname must be less than 30 characters');
    }
     else {
        setSuccess(LastName);
    }

    if(DOBValue === '') {
        setError(DOB, 'Date of birth is required');
    } 
     else {
        setSuccess(DOB);
    }


    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    
var letters = /^[a-z]+$/;
if(usernameValue === '') {
    setError(username, 'Username is required');
}else if (!(usernameValue.match(letters)))
{
    setError(username, 'username should be in lowercase');

}
else if(usernameValue.length >= 10 ){
    setError(username, 'username is less than 10 characters');
}
 else {
    setSuccess(username);
}

    if(passwordValue === '') {
        setError(password, 'Password is required');
    }   else if (passwordValue.length < 6  ) {
        setError(password, 'Password must be at least 6 to 15 character.')
    }else if (passwordValue.length > 15 ) {
        setError(password, 'Password must be at least 6 to 15 character.')
    }else if(passwordValue.search(/[0-9]/)==-1){
        setError(password, 'Password must contain atleast one number.')
    }
    else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};

function formatDate(date){
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    
    return [year, month, day].join('-');
    
    }
    
    function getAge(dateString){
    var birthdate = new Date().getTime();
    if (typeof dateString === 'undefined' || dateString === null || (String(dateString) === 'NaN')){
    // variable is undefined or null value
    birthdate = new Date().getTime();
    }
    birthdate = new Date(dateString).getTime();
    var now = new Date().getTime();
    // now find the difference between now and the birthdate
    var n = (now - birthdate)/1000;
    if (n < 604800){ // less than a week
    var day_n = Math.floor(n/86400);
    if (typeof day_n === 'undefined' || day_n === null || (String(day_n) === 'NaN')){
    // variable is undefined or null
    return '';
    }else{
    return day_n + ' day' + (day_n > 1 ? 's' : '') + ' old';
    }
    } else if (n < 2629743){ // less than a month
    var week_n = Math.floor(n/604800);
    if (typeof week_n === 'undefined' || week_n === null || (String(week_n) === 'NaN')){
    return '';
    }else{
    return week_n + ' week' + (week_n > 1 ? 's' : '') + ' old';
    }
    } else if (n < 31562417){ // less than 24 months
    var month_n = Math.floor(n/2629743);
    if (typeof month_n === 'undefined' || month_n === null || (String(month_n) === 'NaN')){
    return '';
    }else{
    return month_n + ' month' + (month_n > 1 ? 's' : '') + ' old';
    }
    }else{
    var year_n = Math.floor(n/31556926);
    if (typeof year_n === 'undefined' || year_n === null || (String(year_n) === 'NaN')){
    return year_n = '';
    }else{
    return year_n + ' year' + (year_n > 1 ? 's' : '') + ' old';
    }
    }
    }
    
    function getAgeVal(pid){
    var birthdate = formatDate(document.getElementById("txtbirthdate").value);
    var count = document.getElementById("txtbirthdate").value.length;
    if (count=='10'){
    var age = getAge(birthdate);
    var str = age;
    var res = str.substring(0, 1);
    if (res =='-' || res =='0'){
    document.getElementById("txtbirthdate").value = "";
    document.getElementById("txtage").value = "";
    $('#txtbirthdate').focus();
    return false;
    }else{
    document.getElementById("txtage").value = age;
    }
    }else{
    document.getElementById("txtage").value = "";
    return false;
    }
    }


    var checker = document.getElementById('check');
    var sendbtn = document.getElementById('send');
    checker.onchange = function(){
   if(this.checked){
       sendbtn.disabled = false;
   } else {
       sendbtn.disabled = true;
   }
   
   }






	