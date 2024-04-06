const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const button = document.querySelector('button');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const warningBorder = '1px solid hsl(0, 100%, 67%)';
const warningColor = 'hsl(0, 100%, 67%)';
const usualColor = 'hsl(0, 1%, 44%)';
const border = '1px solid ';

function validateInput(input, min, max) {
    const value = input.value.trim(); // Trim whitespace from input value
    const labelForInput = document.querySelector(`label[for="${input.id}"]`);

    if ((isNaN(value) || value < min || value > max) && value.length > 0) {
        input.style.border = border + warningColor;
        labelForInput.style.color = warningColor;
        return false; // Invalid input
    } else if (value.length >= 1) {
        input.style.border = border + usualColor;
        labelForInput.style.color = usualColor;
        return true;
    } else {
        input.style.border = border + usualColor;
        labelForInput.style.color = usualColor;
        return;
    }
}

dayInput.addEventListener('input', () => {
    if (!validateInput(dayInput, 1, 31) && dayInput.value.trim().length > 0) {
        createErrorMessage(dayInput, 'Must be a valid day');
    } else {
        removeErrorMessage(dayInput);
    }
});

monthInput.addEventListener('input', () => {
    if (!validateInput(monthInput, 1, 12) && monthInput.value.trim().length > 0) {
        createErrorMessage(monthInput, 'Must be a valid month');
    } else {
        removeErrorMessage(monthInput);
    }
});

yearInput.addEventListener('input', () => {
    if (!validateInput(yearInput, 1, currentYear) && yearInput.value.trim().length > 0) {
        createErrorMessage(yearInput, 'Must be a valid year');
    } else {
        removeErrorMessage(yearInput);
    }
});

function isDateValid(dateStr) {
    return isFinite(new Date(dateStr));
  }

button.addEventListener('click', () => {
    const isValid = validateInput(dayInput, 1, 31) && validateInput(monthInput, 1, 12) && validateInput(yearInput, 1, 2024);
    const fullDate = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
    
    let date = moment(fullDate, 'YYYY-MM-DD');
    isDateValid = date.isValid();
    

    if (isValid && isDateValid) {
        alert('All inputs are valid and not empty');
    } else if (!isValid) {
        if (!validateInput(dayInput, 1, 31)) {
            createErrorMessage(dayInput, 'This field is required');
        }
        if (!validateInput(monthInput, 1, 12)) {
            createErrorMessage(monthInput, 'This field is required');
        }   
        if (!validateInput(yearInput, 0, currentYear)) {
            createErrorMessage(yearInput, 'This field is required');
        }     
    } else if (!isDateValid) {    
        const labelForDay = document.querySelector(`label[for="${dayInput.id}"]`);
        const labelForYear = document.querySelector(`label[for="${monthInput.id}"]`);
        const labelForMonth = document.querySelector(`label[for="${yearInput.id}"]`);
        createErrorMessage(dayInput, 'Must be a valid date');
        createErrorMessage(monthInput, 'Must be a valid date');
        createErrorMessage(yearInput, 'Must be a valid date');
        dayInput.style.border = border + warningColor;
        labelForDay.style.color = warningColor;
        monthInput.style.border = border + warningColor;
        labelForMonth.style.color = warningColor;
        yearInput.style.border = border + warningColor;
        labelForYear.style.color = warningColor;
    }
});

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
