const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const button = document.querySelector('button');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const warningColor = 'hsl(0, 100%, 67%)';
const regularColor = 'hsl(0, 1%, 44%)';
const border = '1px solid ';
const labelForDay = document.querySelector(`label[for="${dayInput.id}"]`);
const labelForYear = document.querySelector(`label[for="${yearInput.id}"]`);
const labelForMonth = document.querySelector(`label[for="${monthInput.id}"]`);
const calculatedYears = document.getElementById(`calculatedYears`);
const calculatedMonths = document.getElementById(`calculatedMonths`);
const calculatedDays = document.getElementById(`calculatedDays`);

function changeColor(inputs, labels, color) {
    inputs.forEach(input => {
        input.style.border = border + color;
    });
    labels.forEach(label => {
        label.style.color = color;
    });
}

function validateInput(input, min, max) {
    const value = input.value.trim(); // Trim whitespace from input value
    const labelForInput = document.querySelector(`label[for="${input.id}"]`);

    if ((isNaN(value) || value < min || value > max)) {
        changeColor([input], [labelForInput], warningColor);
        return false; // Invalid input
    } else {
        // changeColor([input], [labelForInput], regularColor);
        return true;
    }
}

function createErrorMessage(input, message) {
    let errorMessage = input.nextElementSibling;
    if (!errorMessage || errorMessage.tagName !== 'P') {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        input.parentNode.insertBefore(errorMessage, input.nextElementSibling);
    }
    errorMessage.textContent = message;
}

function removeErrorMessage(input) {
    const errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.tagName === 'P') {
        errorMessage.remove();
    }
}

dayInput.addEventListener('input', () => {
    if (!validateInput(dayInput, 1, 31) && dayInput.value.trim().length > 0) {
        createErrorMessage(dayInput, 'Must be a valid day');
    } else {
        removeErrorMessage(dayInput);
        changeColor([dayInput], [labelForDay], regularColor);
    }
});

monthInput.addEventListener('input', () => {
    if (!validateInput(monthInput, 1, 12) && monthInput.value.trim().length > 0) {
        createErrorMessage(monthInput, 'Must be a valid month');
    } else {
        removeErrorMessage(monthInput);
        changeColor([monthInput], [labelForMonth], regularColor);
    }
});

yearInput.addEventListener('input', () => {
    if (!validateInput(yearInput, 1, currentYear) && yearInput.value.trim().length > 0) {
        createErrorMessage(yearInput, 'Must be in the past');
    } else {
        removeErrorMessage(yearInput);
        changeColor([yearInput], [labelForYear], regularColor);
    }
});

function isDateValid(dateStr) {
    return isFinite(new Date(dateStr));
  }

function animate(ageNumbers) {
    ageNumbers.forEach(number => {
        number.classList.remove('animation'); // Remove animation class
        void number.offsetWidth; // Trigger reflow to restart the animation
        number.classList.add('animation'); // Reapply animation class
      });
}

button.addEventListener('click', () => {
    const isValid = validateInput(dayInput, 1, 31) && validateInput(monthInput, 1, 12) && validateInput(yearInput, 1, 2024);
    const fullDate = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
    let startDate = moment(fullDate, 'YYYY-MM-DD');
    let endDate = moment();
    isDateValid = startDate.isValid();

    if (isValid && isDateValid) {

        // Calculate the difference in months
        const diffMonthsTotal = endDate.diff(startDate, 'months');

        // Calculate the remaining months and days
        const diffYears = Math.floor(diffMonthsTotal / 12);
        const remainingMonths = diffMonthsTotal % 12;
        const diffDays = endDate.diff(startDate.add(diffYears, 'years').add(remainingMonths, 'months'), 'days');

        animate([calculatedDays, calculatedMonths, calculatedYears])

        calculatedDays.innerHTML = diffDays;
        calculatedMonths.innerHTML = remainingMonths;
        calculatedYears.innerHTML = diffYears;



    } else if (!isValid) {
        if (!validateInput(dayInput, 1, 31)) {
            createErrorMessage(dayInput, 'This field is required');
        }
        if (!validateInput(monthInput, 1, 12)) {
            createErrorMessage(monthInput, 'This field is required');

        }   
        if (!validateInput(yearInput, 1, currentYear)) {
            createErrorMessage(yearInput, 'This field is required');

        }     
    } else if (!isDateValid && isValid) {    
        createErrorMessage(dayInput, 'Must be a valid date');
        createErrorMessage(monthInput, 'Must be a valid date');
        createErrorMessage(yearInput, 'Must be a valid date');
        changeColor([dayInput, monthInput, yearInput], [labelForDay, labelForMonth, labelForYear], warningColor);
    }
});


