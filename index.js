/* INPUT ELEMENTS */
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');

/* ERROR TEXT ELEMENTS */
const errorDay = document.getElementById('error-day');
const errorMonth = document.getElementById('error-month');
const errorYear = document.getElementById('error-year');
const errorItem = document.querySelectorAll('.error');

/* OUTPUT ELEMENTS */

const outputDay = document.getElementById('output-day');
const outputMonth = document.getElementById('output-month');
const outputYear = document.getElementById('output-year');


/* //////////////////
    EVENT LISTENERS
///////////////////*/
document.addEventListener('invalid', function(event) {
    
    event.preventDefault();
    
    if(inputDay.value=='')
    {
        errorDay.textContent = 'This field is required.';
        errorDay.classList.remove('hidden');
    }
    else{
        validDay();
    }
    if(inputMonth.value=='')
    {
        errorMonth.textContent = 'This field is required.';
        errorMonth.classList.remove('hidden');
    }
    else{
        validMonth();
    }
    if(inputYear.value=='')
    {
        errorYear.textContent = 'This field is required.';
        errorYear.classList.remove('hidden');
    }
    else{
        validYear();
    }

    displayError();

}, true);


document.addEventListener('submit', function(event) {

    event.preventDefault();
    
    let isValid = true;
    if(!validYear())
        isValid = false;
    if(!validMonth())
        isValid = false;
    if(!validDay())
        isValid = false;
    if(!isValid){
        displayError();
    }
    else{
        displayOutput();
    }

}, true);

document.addEventListener('input', function() {
    errorItem.forEach(element => {
        element.style.display = 'none';
        element.classList.add('hidden');
    });
});



/* //////////////////
    VALIDATION
///////////////////*/

function validYear() {
    const year = parseInt(inputYear.value, 10);

    if(year > new Date().getFullYear()) {
        errorYear.textContent = 'Must be valid year.';
        errorYear.classList.remove('hidden');
        return false;
    }
    return true;
}

function validMonth() {
    const month = parseInt(inputMonth.value, 10);
    if(month > 12 || month < 1){
        errorMonth.textContent = 'Must be valid month.';
        errorMonth.classList.remove('hidden');
        return false;
    }
    return true;
}

function validDay() {
    const inputDate = new Date(parseInt(inputYear.value, 10), parseInt(inputMonth.value, 10) - 1, parseInt(inputDay.value, 10));

    if (inputDate.getDate() !== parseInt(inputDay.value, 10)) {
        errorDay.textContent = 'Must be a valid day.';
        errorDay.classList.remove('hidden');
    } else {
        return true;
    }
}

/* //////////////////
    ERROR DISPLAY
///////////////////*/
function displayError () {
    errorItem.forEach(element => {
        element.style.display = 'block';
    });
}


/* //////////////////
    OUTPUT LOGIC
///////////////////*/

function fadeOut(element) {
    element.classList.remove("fade-transition");
    element.style.opacity = 0;
  }
  
  function fadeIn(element) {
    element.classList.add("fade-transition");
    element.style.opacity = 1;
  }

  function displayOutput() {
    const inputDate = new Date(
      parseInt(inputYear.value, 10),
      parseInt(inputMonth.value, 10) - 1,
      parseInt(inputDay.value, 10)
    );
  
    const currentDate = new Date();
  
    const yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
    const monthDiff = currentDate.getMonth() - inputDate.getMonth();
    const dayDiff = currentDate.getDate() - inputDate.getDate();
  
    let years = yearDiff;
    let months = monthDiff;
    let days = dayDiff;
  
    if (dayDiff < 0) {
      months--;
      const monthLength = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      days = monthLength - inputDate.getDate() + currentDate.getDate();
    }
  
    if (monthDiff < 0) {
      years--;
      months = 12 - inputDate.getMonth() + currentDate.getMonth();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    fadeOut(outputYear);
    fadeOut(outputMonth);
    fadeOut(outputDay);
  
    setTimeout(() => {
      outputYear.textContent = `${years}`;
      outputMonth.textContent = `${months}`;
      outputDay.textContent = `${days}`;
  
      fadeIn(outputYear);
      fadeIn(outputMonth);
      fadeIn(outputDay);
    }, 500);
  }
  
  