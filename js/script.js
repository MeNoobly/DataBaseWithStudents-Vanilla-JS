"use strict";
(function() {
    const createDataBase = {
        clearForm(but) {
            but.preventDefault();
            
            let allInputs = document.querySelectorAll(".form-control");
            allInputs.forEach(item => item.value = "");
        },
    };
    
    let formClear = document.querySelector(".btn-danger");
    formClear.addEventListener("click", createDataBase.clearForm);
})();