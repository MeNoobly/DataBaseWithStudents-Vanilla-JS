"use strict";
(function() {
    const createDataBase = {
        arrayOfObjectsWithStudents: [], // глобальный массив, содержащий объекты всех студентов

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
            nowObject.birthDate = new Date(allInputs[3].value);
            nowObject.startStudyYear = allInputs[4].value;
            nowObject.facultet = allInputs[5].value;
            
            this.arrayOfObjectsWithStudents.push(nowObject); // добавляем обхект в глобальный массив со студентами
            this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // перерисовываем таблицу со студентами
        },

        drawTableWithStudents(array) {
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = '';

            for (let i = 1; i < array.length + 1; i++) {
                let tr = document.createElement("tr");
                let th = document.createElement("th");
                let firstTd = document.createElement("td");
                let secondTd = document.createElement("td");
                let thirdTd = document.createElement("td");
                let fourthTd = document.createElement("td");
                let dateNow = new Date();
                let yearsFromStartStudy = dateNow.getFullYear() - array[i - 1].startStudyYear;
                let age = Math.trunc((dateNow.getTime() - array[i - 1].birthDate.getTime()) / 1000 / 60 / 60 / 24 / 365);

                
                th.textContent = i;
                th.setAttribute("scope", "row");

                firstTd.textContent = array[i - 1].surname + " " + array[i - 1].name + " " + array[i - 1].lastname;
                secondTd.textContent = array[i - 1].facultet;
                thirdTd.textContent = `${array[i - 1].birthDate.getDate()}.${array[i - 1].birthDate.getMonth() + 1}.${array[i - 1].birthDate.getFullYear()} (${age} лет)`;
                fourthTd.textContent = (yearsFromStartStudy > 5 || yearsFromStartStudy == 4 && dateNow.getMonth > 10) ?
                "закончил" :
                `${array[i - 1].startStudyYear}-${dateNow.getFullYear()} (${yearsFromStartStudy} курс)`;
                
                tr.append(th);
                tr.append(firstTd);
                tr.append(secondTd);
                tr.append(thirdTd);
                tr.append(fourthTd);
                tbody.append(tr);
            }
        }   
    };
    
    let buttonFormClear = document.querySelector(".btn-danger");
    buttonFormClear.addEventListener("click", createDataBase.clearForm.bind(createDataBase)); // привязываем функцию с очищением формы, с учётом объекта createDataBase

    let buttonFormCreate = document.querySelector(".btn-primary");
    buttonFormCreate.addEventListener("click", createDataBase.addStudent.bind(createDataBase)); // привязываем функцию с созданием ученика, с учётом объекта createDataBase
    buttonFormCreate.addEventListener("click", createDataBase.clearForm.bind(createDataBase)); // привязываем функцию с очищением формы, с учётом объекта createDataBase
})();