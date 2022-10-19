"use strict";
(function() {
    const createDataBase = {
        arrayOfObjectsWithStudents: [], // глобальный массив, содержащий объекты всех студентов

        check() {
            console.log("check");
        },

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
            nowObject.birthDate = new Date(allInputs[3].value); // в свойство birthDate записываем объект с введённой датой
            nowObject.startStudyYear = allInputs[4].value;
            nowObject.facultet = allInputs[5].value;
            
            this.arrayOfObjectsWithStudents.push(nowObject); // добавляем обхект в глобальный массив со студентами
            this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // перерисовываем таблицу со студентами
        },

        drawTableWithStudents(array) {
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = ''; // очищаем тело таблицы

            for (let i = 1; i < array.length + 1; i++) { // цикл с перебором всех значений в переданном в функцию массиве
                // создание элементов таблицы
                let trOfTable = document.createElement("tr");
                let thOfTable = document.createElement("th");
                let fioTd = document.createElement("td");
                let facultetTd = document.createElement("td");
                let birthDateTd = document.createElement("td");
                let fourthTd = document.createElement("td");

                let dateNow = new Date(); // получаем дату в текущий момент
                let yearsFromStartStudy = dateNow.getFullYear() - array[i - 1].startStudyYear; // получаем, сколько лет мы учимся, вычитая из текущего года год поступления
                let ageOfStudent = Math.trunc((dateNow.getTime() - array[i - 1].birthDate.getTime()) / 1000 / 60 / 60 / 24 / 365); // получаем полный возраст ученика

                
                thOfTable.textContent = i; // id каждого ученика
                thOfTable.setAttribute("scope", "row"); // добавляем атрибут для айди 

                fioTd.textContent = array[i - 1].surname + " " + array[i - 1].name + " " + array[i - 1].lastname; // полное ФИО ученика
                facultetTd.textContent = array[i - 1].facultet; // факультет ученика
                birthDateTd.textContent = `${array[i - 1].birthDate.getDate()}.${array[i - 1].birthDate.getMonth() + 1}.${array[i - 1].birthDate.getFullYear()} (${ageOfStudent} лет)`; // дата рождения ученика с его возрастом
                fourthTd.textContent = (yearsFromStartStudy > 4 || yearsFromStartStudy == 4 && dateNow.getMonth() > 9 || yearsFromStartStudy + 1 === 5) ?
                `${array[i - 1].startStudyYear}-${Number(array[i - 1].startStudyYear) + 4} (закончил)` : // если ученик закончил институт, годы обучение и статус "закончил"
                dateNow.getMonth() < 9 ?
                `${array[i - 1].startStudyYear}-${Number(array[i - 1].startStudyYear) + 4} (${yearsFromStartStudy} курс)` : // если ученик не перешёл на следующий курс
                `${array[i - 1].startStudyYear}-${Number(array[i - 1].startStudyYear) + 4} (${yearsFromStartStudy + 1} курс)`; // если ученик перешёл на следующий курс
                
                trOfTable.append(thOfTable, fioTd, facultetTd, birthDateTd, fourthTd); // добавляем элементы таблицы в tr
                tbody.append(trOfTable); // добавляем tr в тело таблицы
            }
        },

        activateButtons() {
            let buttonFormClear = document.querySelector(".btn-danger");
            let buttonFormCreate = document.querySelector(".btn-primary");
            let studentsForm = document.querySelector(".form");

            buttonFormClear.addEventListener("click", createDataBase.clearForm.bind(createDataBase)); // привязываем функцию с очищением формы, с учётом объекта createDataBase
            // buttonFormCreate.addEventListener("click", createDataBase.addStudent.bind(createDataBase)); // привязываем функцию с созданием ученика, с учётом объекта createDataBase
            // buttonFormCreate.addEventListener("click", createDataBase.clearForm.bind(createDataBase)); // привязываем функцию с очищением формы, с учётом объекта createDataBase
            studentsForm.addEventListener('submit', function(event) {
                console.log("submit");
                
                event.preventDefault();
                let studentsForm = document.querySelector(".form");
                let studentsFormInputs = document.querySelectorAll(".form-control");
                let studentsFormLabels = document.querySelectorAll(".start__title");
                let spanElements = document.querySelectorAll(".start__error");
                return false;
            });

            
            studentsForm.addEventListener('submit', createDataBase.addStudent.bind(createDataBase));
        }
    };
    
    createDataBase.activateButtons();
})();