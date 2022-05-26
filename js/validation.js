//funkcje do testowania
function testText(field, lng) {
    return field.value.length >= lng;
}

function testEmail(field) {
    const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
    return reg.test(field.value);
};

function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        removeFieldError(field);
    }
};

function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field);

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};

function testCheckbox(){
   if(checkboxFrontend.checked){
       return true;
   }
   else if(checkboxBackend.checked){
       return true;
   }
   else if(checkboxMobile.checked){
    return true;
    }
    else if(checkboxGraphics.checked){
        return true;
    }
    else{
        return false;
}
}

//pobranie elementów
const form = document.querySelector("form");
const inputFirstName = form.querySelector("input[name=first-name]");
const inputLastName = form.querySelector("input[name=last-name]")
const inputEmail = form.querySelector("input[name=email]");
const formMessage = form.querySelector(".form-message");
let checkboxFrontend = form.querySelector("input[id=frontend-checkbox]");
let checkboxBackend = form.querySelector("input[id=backend-checkbox]");
let checkboxMobile = form.querySelector("input[id=mobile-checkbox]");
let checkboxGraphics = form.querySelector("input[id=graphics-checkbox]");
const checkboxes = form.querySelector(".checkboxes");

//podpięcie zdarzeń
inputFirstName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target, 3)));
inputLastName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target, 3)));
inputEmail.addEventListener("input", e => markFieldAsError(e.target, !testEmail(e.target)));

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = false;

    for (const el of [inputFirstName, inputLastName, inputEmail]) {
        markFieldAsError(el, false);
        removeFieldError(el);
    }

    if (!testText(inputFirstName, 3)) {
        markFieldAsError(inputFirstName, true);
        createFieldError(inputFirstName, "Wpisane imię jest niepoprawne");
        formErrors = true;
    } 
    
    if (!testText(inputLastName, 3)) {
        markFieldAsError(inputLastName, true);
        createFieldError(inputLastName, "Wpisane nazwisko jest niepoprawne");
        formErrors = true;
    } 

    if (!testEmail(inputEmail)) {
        markFieldAsError(inputEmail, true);
        createFieldError(inputEmail, "Wpisany e-mail jest niepoprawny");
        formErrors = true;
    }

    if(!testCheckbox()){
        createFieldError(checkboxes, "Proszę wybrać sekcję!");
        formErrors = true;
    }

    if (!formErrors) {
        e.target.submit();
    }
});