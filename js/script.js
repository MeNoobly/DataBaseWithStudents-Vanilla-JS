"use strict";
(function() {
    const createDataBase = {
        arrayOfObjectsWithStudents: [], // глобальный массив, содержащий объекты всех студентов
        numberOfStudent: 1,

        clearForm(but) {
            but.preventDefault();
            let allInputs = document.querySelectorAll(".form-control");
            allInputs.forEach(item => item.value = ""); // очищаем все value значения
        },

        addStudent(but) {
            but.preventDefault();
            let nowObject = {}; // вводим объект с текущими данными
            let allInputs = document.querySelectorAll(".form-control");
            
            // записываем в объект все сведения об ученике в свойства
            nowObject.surname = allInputs[0].value;
            nowObject.name = allInputs[1].value;
            nowObject.lastname = allInputs[2].value;
            nowObject.birthDate = allInputs[3].value;
            nowObject.startStudyDate = allInputs[4].value;
            nowObject.facultet = allInputs[5].value;
            
            this.arrayOfObjectsWithStudents.push(nowObject); // добавляем обхект в глобальный массив со студентами
            this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // перерисовываем таблицу со студентами
        },

        drawTableWithStudents(array) {
            let tbody = document.getElementById("tbody");
            let tr = document.createElement("tr");

            tbody.innerHTML = '';

            for (let element of array) {
                let th = document.createElement("th");
                let firstTd = document.createElement("td");
                let secondTd = document.createElement("td");
                let thirdTd = document.createElement("td");
                let fourthTd = document.createElement("td");

                th.textContent = this.numberOfStudent;
                th.setAttribute("scope", "row");
                firstTd.textContent = element.surname + " " + element.name + " " + element.lastname;
                secondTd.textContent = element.facultet;

                tr.append(th);
                tr.append(firstTd);
                tr.append(secondTd);
                tbody.append(tr);
            }

            this.numberOfStudent++;
        }   
    };
    
    let buttonFormClear = document.querySelector(".btn-danger");
    buttonFormClear.addEventListener("click", createDataBase.clearForm.bind(createDataBase)); // привязываем функцию с очищением формы, с учётом объекта createDataBase

    let buttonFormCreate = document.querySelector(".btn-primary");
    buttonFormCreate.addEventListener("click", createDataBase.addStudent.bind(createDataBase)); // привязываем функцию с созданием ученика, с учётом объекта createDataBase

})();