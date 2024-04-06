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
    } else {
        input.style.border = border + usualColor;
        labelForInput.style.color = usualColor;
        return true; // Valid input
    }
}

dayInput.addEventListener('input', () => {
    if (!validateInput(dayInput, 1, 31)) {
        
        createErrorMessage(dayInput, 'Must be a valid day');
    } else {
        removeErrorMessage(dayInput);
    }
});

monthInput.addEventListener('input', () => {
    if (!validateInput(monthInput, 1, 12)) {
        createErrorMessage(monthInput, 'Must be a valid month');
    } else {
        removeErrorMessage(monthInput);
    }
});

yearInput.addEventListener('input', () => {
    if (!validateInput(yearInput, 1, currentYear)) {
        createErrorMessage(yearInput, 'Must be a valid year');
    } else {
        removeErrorMessage(yearInput);
    }
});

button.addEventListener('click', () => {
    const isValid = validateInput(dayInput, 1, 31) && validateInput(monthInput, 1, 12) && validateInput(yearInput, 0, 2024);
    if (isValid) {
        alert('All inputs are valid and not empty');
    } else {
        if (!validateInput(dayInput, 1, 31)) {
            createErrorMessage(dayInput, 'This field is required');
        }   
        if (!validateInput(monthInput, 1, 12)) {
            createErrorMessage(monthInput, 'This field is required');
        }   
        if (!validateInput(yearInput, 0, currentYear)) {
            createErrorMessage(yearInput, 'This field is required');
        }   
       
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
