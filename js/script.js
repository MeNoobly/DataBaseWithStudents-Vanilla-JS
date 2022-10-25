"use strict";
(function() {
    const createDataBase = {
        arrayOfObjectsWithStudents: [], // глобальный массив, содержащий объекты всех студентов
        copyArrayOfObjectsWithStudents: [],
        objectWithSortState: {
            stateNumber: 0,
            stateFIO: 0,
            stateFacultet: 0,
            stateBirthday: 0,
            statePeriod: 0
        },

        clearForm(...button) {
            if (button.length > 0) {
                button[0].preventDefault(); // если происходит нажатие кнопки "Очистить Форму", то удаляется дефолнтое поведение формы
            }

            let allInputs = document.querySelectorAll(".form-control");
            allInputs.forEach(item => item.value = ""); // очищаем все value значения
        },

        addStudent(button) {
            button.preventDefault(); // удаляется дефолнтое поведение формы
            if (this.validateForm()) { // если форма валидируется
                let nowObject = {}; // вводим объект с текущими данными
                let allInputs = document.querySelectorAll(".form-control");
                
                // записываем в объект все сведения об ученике в свойства

                // ФИО записывается с заглавными первыми буквами
                nowObject.surname = allInputs[0].value[0].toUpperCase() + allInputs[0].value.trim().toLowerCase().substr(1, allInputs[0].value.length); 
                nowObject.name = allInputs[1].value[1].toUpperCase() + allInputs[1].value.trim().toLowerCase().substr(1, allInputs[1].value.length);
                nowObject.lastname = allInputs[2].value[2].toUpperCase() + allInputs[2].value.trim().toLowerCase().substr(1, allInputs[2].value.length);
                nowObject.birthDate = allInputs[3].value; // в свойство birthDate записываем объект с введённой датой
                nowObject.startStudyYear = allInputs[4].value;
                nowObject.facultet = allInputs[5].value;
                nowObject.numberOfStudent = this.arrayOfObjectsWithStudents.length + 1;

                this.arrayOfObjectsWithStudents.push(nowObject); // добавляем обхект в глобальный массив со студентами
                this.copyArrayOfObjectsWithStudents = JSON.parse(JSON.stringify(this.arrayOfObjectsWithStudents)); // копируем в массив с копией всеь массив со студентами
                this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // перерисовываем таблицу со студентами

                this.clearForm(); // очищаем форму после добавления студента
            }
        },

        drawTableWithStudents(array) {
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = ''; // очищаем тело таблицы
            if (array.length > 0) { // Если в массиве есть хотя бы один объект с учениками
                for (const nowStudent of array) { // цикл с перебором всех значений в переданном в функцию массиве
                    // создание элементов таблицы
                    let trOfTable = document.createElement("tr");
                    let thOfTable = document.createElement("th");
                    let fioTd = document.createElement("td");
                    let facultetTd = document.createElement("td");
                    let birthDateTd = document.createElement("td");
                    let periodOfStudy = document.createElement("td");

                    let dateNow = new Date(); // получаем дату в текущий момент
                    let yearsFromStartStudy = dateNow.getFullYear() - nowStudent.startStudyYear; // получаем, сколько лет мы учимся, вычитая из текущего года год поступления
                    let ageOfStudent = Math.trunc((dateNow.getTime() - new Date(nowStudent.birthDate).getTime()) / 31536000000); // получаем полный возраст ученика

                    thOfTable.textContent = nowStudent.numberOfStudent; // номер каждого ученика
                    thOfTable.setAttribute("scope", "row"); // добавляем атрибут для айди 

                    fioTd.textContent = nowStudent.surname + " " + nowStudent.name + " " + nowStudent.lastname; // полное ФИО ученика
                    facultetTd.textContent = nowStudent.facultet; // факультет ученика
                    birthDateTd.textContent = `${new Date(nowStudent.birthDate).getDate()}.${new Date(nowStudent.birthDate).getMonth() + 1}.${new Date(nowStudent.birthDate).getFullYear()} (${ageOfStudent} лет)`; // дата рождения ученика с его возрастом
                    periodOfStudy.textContent = (yearsFromStartStudy > 4 || yearsFromStartStudy == 4 && dateNow.getMonth() > 9 || yearsFromStartStudy + 1 === 5) ?
                    `${nowStudent.startStudyYear}-${+nowStudent.startStudyYear + 4} (закончил)` : // если ученик закончил институт, годы обучение и статус "закончил"
                    dateNow.getMonth() < 9 ? // месяц меньше февраля
                    `${nowStudent.startStudyYear}-${+nowStudent.startStudyYear + 4} (${yearsFromStartStudy} курс)` : // если ученик не перешёл на следующий курс
                    `${nowStudent.startStudyYear}-${+nowStudent.startStudyYear + 4} (${yearsFromStartStudy + 1} курс)`; // если ученик перешёл на следующий курс
                    
                    trOfTable.append(thOfTable, fioTd, facultetTd, birthDateTd, periodOfStudy); // добавляем элементы таблицы в tr
                    tbody.append(trOfTable); // добавляем tr в тело таблицы
                }
            }
            
        },

        validateRussianLetters(word) { // валидация всех русских букв
            let regular = new RegExp("[ЁёА-я]");
            return regular.test(word);
        },

        validateDate(date) { // валидация даты
            let splitDate = new Date(date);
            let nowDate = new Date();

            if (splitDate.getFullYear() >= 1900 && (splitDate.getTime() <= nowDate.getTime()) ) { // введённый год не должен быть больше 1900 и не должен превышать текущий год
                return true;
            }

            return false;
        },

        validateStartStudyYear(dateOfStartStudy) { // валидация года обучения
            let reg = new RegExp("0|[1-9]\d*");
            let nowDate = new Date();
            let dateOfStartStudyParse = +dateOfStartStudy;

            if (dateOfStartStudyParse < 2000 || dateOfStartStudyParse > nowDate.getFullYear()) { // введённый год обучения не должен быть меньше 2000 и не должен превышать текущий год
                return false;
            }

            return reg.test(dateOfStartStudyParse);
        },

        validateForm() {
            let studentsFormInputs = document.querySelectorAll(".form-control");
            let studentsFormLabels = document.querySelectorAll(".form-label");
            let errorDivs = document.querySelectorAll(".error-div");
            let returnValue = true; // дефолтное значение возвращаемого значения - true

            let valuesOfInputs = Array.from(studentsFormInputs).map(item => item.value.trim()); // все введённые значения записываются в массив

            if (!this.validateRussianLetters(valuesOfInputs[0])) {
                studentsFormLabels[0].classList.add("text-danger");
                studentsFormInputs[0].classList.add("is-invalid");
                if (valuesOfInputs[0] === "") {
                    errorDivs[0].textContent = "Заполните это поле!";
                } else {
                    errorDivs[0].textContent = "Введите имя русскими буквами!";
                }  
                errorDivs[0].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[0].classList.remove("text-danger");
                studentsFormInputs[0].classList.remove("is-invalid");
                errorDivs[0].textContent = "";
                errorDivs[0].classList.remove("invalid-feedback");
            }

            if (!this.validateRussianLetters(valuesOfInputs[1])) {
                studentsFormLabels[1].classList.add("text-danger");
                studentsFormInputs[1].classList.add("is-invalid");
                if (valuesOfInputs[1] === "") {
                    errorDivs[1].textContent = "Заполните это поле!";
                } else {
                    errorDivs[1].textContent = "Введите фамилию русскими буквами!";
                }  
                errorDivs[1].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[1].classList.remove("text-danger");
                studentsFormInputs[1].classList.remove("is-invalid");
                errorDivs[1].textContent = "";
                errorDivs[1].classList.remove("invalid-feedback");
            }

            if (!this.validateRussianLetters(valuesOfInputs[2])) {
                studentsFormLabels[2].classList.add("text-danger");
                studentsFormInputs[2].classList.add("is-invalid");
                if (valuesOfInputs[2] === "") {
                    errorDivs[2].textContent = "Заполните это поле!";
                } else {
                    errorDivs[2].textContent = "Введите очество русскими буквами!";
                }  
                errorDivs[2].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[2].classList.remove("text-danger");
                studentsFormInputs[2].classList.remove("is-invalid");
                errorDivs[2].textContent = "";
                errorDivs[2].classList.remove("invalid-feedback");
            }

            if (!this.validateDate(valuesOfInputs[3])) {
                studentsFormLabels[3].classList.add("text-danger");
                studentsFormInputs[3].classList.add("is-invalid");
                if (valuesOfInputs[3] === "") {
                    errorDivs[3].textContent = "Заполните это поле!";
                } else {
                    errorDivs[3].textContent = "Введённые данные некорректны!";
                }  
                errorDivs[3].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[3].classList.remove("text-danger");
                studentsFormInputs[3].classList.remove("is-invalid");
                errorDivs[3].textContent = "";
                errorDivs[3].classList.remove("invalid-feedback");
            }

            if (!this.validateStartStudyYear(valuesOfInputs[4])) {
                studentsFormLabels[4].classList.add("text-danger");
                studentsFormInputs[4].classList.add("is-invalid");
                if (valuesOfInputs[4] === "") {
                    errorDivs[4].textContent = "Заполните это поле!";
                } else {
                    errorDivs[4].textContent = "Введённые данные не корректны!";
                }  
                errorDivs[4].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[4].classList.remove("text-danger");
                studentsFormInputs[4].classList.remove("is-invalid");
                errorDivs[4].textContent = "";
                errorDivs[4].classList.remove("invalid-feedback");
            }

            if (!this.validateRussianLetters(valuesOfInputs[5])) {
                studentsFormLabels[5].classList.add("text-danger");
                studentsFormInputs[5].classList.add("is-invalid");
                if (valuesOfInputs[5] === "") {
                    errorDivs[5].textContent = "Заполните это поле!";
                } else {
                    errorDivs[5].textContent = "Введите название факультета русскими буквами!";
                }  
                errorDivs[5].classList.add("invalid-feedback");
                returnValue = false;
            } else {
                studentsFormLabels[5].classList.remove("text-danger");
                studentsFormInputs[5].classList.remove("is-invalid");
                errorDivs[5].textContent = "";
                errorDivs[5].classList.remove("invalid-feedback");
            }
            
            return returnValue;
        },

        sortNumber() {
            switch (this.objectWithSortState.stateNumber) {
                case 0:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка по убыванию
                        if (prev.numberOfStudent > next.numberOfStudent) {
                            return -1;
                        }
                        if (prev.numberOfStudent < next.numberOfStudent) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateNumber = 1; // меняем состояние
                    break;
                case 1:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка по возрастанию
                        if (prev.numberOfStudent < next.numberOfStudent) {
                            return -1;
                        }
                        if (prev.numberOfStudent > next.numberOfStudent) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateNumber = 0; // меняем состояние
                    break;
            }
        },

        sortFIO() {
            switch (this.objectWithSortState.stateFIO) {
                case 0: 
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка ФИО по алфавиту
                        if (prev.surname + prev.name + prev.lastname < next.surname + next.name + next.lastname) {
                            return -1;
                        }
                        if (prev.surname + prev.name + prev.lastname > next.surname + next.name + next.lastname) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFIO = 1; // меняем состояние
                    break;
                case 1:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка ФИО по алфавиту в обратном порядке
                        if (prev.surname + prev.name + prev.lastname > next.surname + next.name + next.lastname) {
                            return -1;
                        }
                        if (prev.surname + prev.name + prev.lastname < next.surname + next.name + next.lastname) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFIO = 2; // меняем состояние
                    break;
                case 2:
                    this.arrayOfObjectsWithStudents = JSON.parse(JSON.stringify(this.copyArrayOfObjectsWithStudents)); // возвращаем изначальный порядок
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFIO = 0; // меняем состояние 
                    break;
            }
        },

        sortFacultet() {
            switch (this.objectWithSortState.stateFacultet) {
                case 0:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка факультета по алфавиту
                        if (prev.facultet < next.facultet) {
                            return -1;
                        }
                        if (prev.facultet > next.facultet) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFacultet = 1; // меняем состояние 
                    break; 
                case 1: 
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка факультета по алфавиту в обратном порядке
                        if (prev.facultet > next.facultet) {
                            return -1;
                        }
                        if (prev.facultet < next.facultet) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFacultet = 2; // меняем состояние 
                    break;
                case 2:
                    this.arrayOfObjectsWithStudents = JSON.parse(JSON.stringify(this.copyArrayOfObjectsWithStudents)); // возвращаем изначальный порядок
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateFacultet = 0; // меняем состояние 
                    break;
            }
        },

        sortBirthday() {
            switch (this.objectWithSortState.stateBirthday) {
                case 0:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка даты рождения по убыванию
                        if (new Date(prev.birthDate).getTime() > new Date(next.birthDate).getTime()) {
                            return -1;
                        }
                        if (new Date(prev.birthDate).getTime() < new Date(next.birthDate).getTime()) {
                            return 1;
                        }
                        
                        return 0;
                    }); 
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateBirthday = 1; // меняем состояние
                    break;
                case 1:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка даты рождения по возрастанию
                        if (new Date(prev.birthDate).getTime() < new Date(next.birthDate).getTime()) {
                            return -1;
                        }
                        if (new Date(prev.birthDate).getTime() > new Date(next.birthDate).getTime()) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateBirthday = 2; // меняем состояние
                    break;
                case 2:
                    this.arrayOfObjectsWithStudents = JSON.parse(JSON.stringify(this.copyArrayOfObjectsWithStudents)); // возвращаем изначальный порядок
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.stateBirthday = 0; // меняем состояние
                    break;
            }
        },

        sortPeriod() {
            switch (this.objectWithSortState.statePeriod) {
                case 0:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка периода обучения по началу обучения, по убыванию
                        if (+prev.startStudyYear > +next.startStudyYear) {
                            return -1;
                        }
                        if (+prev.startStudyYear < +next.startStudyYear) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.statePeriod = 1; // меняем состояние
                    break;
                case 1:
                    this.arrayOfObjectsWithStudents.sort((prev, next) => { // сортировка периода обучения по началу обучения, по возрастанию
                        if (+prev.startStudyYear < +next.startStudyYear) {
                            return -1;
                        }
                        if (+prev.startStudyYear > +next.startStudyYear) {
                            return 1;
                        }
                        
                        return 0;
                    });
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.statePeriod = 2; // меняем состояние
                    break;
                case 2:
                    this.arrayOfObjectsWithStudents = JSON.parse(JSON.stringify(this.copyArrayOfObjectsWithStudents)); // возвращаем изначальный порядок
                    this.drawTableWithStudents(this.arrayOfObjectsWithStudents); // выводим таблицу
                    this.objectWithSortState.statePeriod = 0; // меняем состояние
                    break;
            }
        },

        hideFilter() {
            let filterInputs = document.querySelectorAll(".filter-input"); // ищем все инпуты фильтров
            
            switch(+this.id[this.id.length - 1]) { // смотрим на последний символ id и переключаем состояния включения и выключения
                case 1:
                    filterInputs[0].classList.toggle("form-control");
                    filterInputs[0].classList.toggle("hidden");
                    break;
                case 2:
                    filterInputs[1].classList.toggle("form-control");
                    filterInputs[1].classList.toggle("hidden");
                    break;
                case 3:
                    filterInputs[2].classList.toggle("form-control");
                    filterInputs[2].classList.toggle("hidden");
                    break;
                case 4:
                    filterInputs[3].classList.toggle("form-control");
                    filterInputs[3].classList.toggle("hidden");
                    break;
                case 5:
                    filterInputs[4].classList.toggle("form-control");
                    filterInputs[4].classList.toggle("hidden");
                    break;
            }
        },

        filterColumn() {
            let filterInputs = document.querySelectorAll(".filter-input"); // ищем все инпуты с фильтром
            let dateNow = new Date(); // получаем текущую дату
            
            if (filterInputs[0].value !== "" || 
            filterInputs[1].value !== "" || 
            filterInputs[2].value !== "" ||
            filterInputs[3].value !== "" ||
            filterInputs[4].value !== "") { // проверяем, что есть хотя бы не один не пустой фильтр
                if (filterInputs[0].value !== "") { // ...если это фильтр с номером студента
                    createDataBase.arrayOfObjectsWithStudents = createDataBase.arrayOfObjectsWithStudents.filter(item => item.numberOfStudent === +filterInputs[0].value); // фильтруем массив по введённому номеру
                }
                if (filterInputs[1].value !== "") { // ...если это фильтр с фио студента
                    createDataBase.arrayOfObjectsWithStudents = createDataBase.arrayOfObjectsWithStudents.filter(item => {
                        let fioForFilter = item.surname + " " + item.name + " " + item.lastname; // создаём строку с полным именем
                        return fioForFilter.includes(filterInputs[1].value); // ищем, если есть вхождения введённого значения в строку fioForFilter
                    });
                }
                if (filterInputs[2].value !== "") { // ...если это фильтр с факультетом студента
                    createDataBase.arrayOfObjectsWithStudents = createDataBase.arrayOfObjectsWithStudents.filter(item => {
                        return item.facultet.includes(filterInputs[2].value); // ищем, если есть вхождения введённого значения в item.facultet
                    });
                }
                if (filterInputs[3].value !== "") { // ...если это фильтр с датой рождения студента
                    createDataBase.arrayOfObjectsWithStudents = createDataBase.arrayOfObjectsWithStudents.filter(item => {
                        let ageOfStudent = Math.trunc((dateNow.getTime() - new Date(item.birthDate).getTime()) / 31536000000); // получаем полный возраст ученика
                        let birthday = `${new Date(item.birthDate).getDate()}.${new Date(item.birthDate).getMonth() + 1}.${new Date(item.birthDate).getFullYear()} (${ageOfStudent} лет)`; // получаем строку с датой рождения студента
                        return birthday.includes(filterInputs[3].value);  // ищем, если есть вхождения введённого значения в строку birthday      
                    });
                }
                if (filterInputs[4].value !== "") { // ...если это фильтр с периодом обучения студента
                    createDataBase.arrayOfObjectsWithStudents = createDataBase.arrayOfObjectsWithStudents.filter(item => {
                        let courseOfStudent = dateNow.getMonth() < 9 ? dateNow.getFullYear() - item.startStudyYear : dateNow.getFullYear() - item.startStudyYear + 1; // получаем, на каком курме студент
                        return  +item.startStudyYear === +filterInputs[4].value || // если введён год начала обучения, год окончания обучения или курс студента
                        +item.startStudyYear + 4 === +filterInputs[4].value || 
                        courseOfStudent === +filterInputs[4].value; 
                    });
                }
               
            } else {
                createDataBase.arrayOfObjectsWithStudents = JSON.parse(JSON.stringify(createDataBase.copyArrayOfObjectsWithStudents)); // если все фильтры пусты, то рисуется первоначальная таблица
            }
            createDataBase.drawTableWithStudents(createDataBase.arrayOfObjectsWithStudents); // рисуем получившийся результат
            
        },

        activateForm() {
            let buttonFormClear = document.querySelector(".btn-danger");
            let buttonFormCreate = document.querySelector(".btn-primary");
            let studentNumberSpan = document.getElementById("studentNumberSort");
            let studentFIOSpan = document.getElementById("studentFIOSort");
            let studentFacultetSpan = document.getElementById("studentFacultetSort");
            let studentBirthdaySpan = document.getElementById("studentBirthdaySort");
            let studentPeriodSpan = document.getElementById("studentPeriodSort");
            let filterSpans = document.querySelectorAll(".filter-span");
            let filterInputs = document.querySelectorAll(".filter-input");
            
            buttonFormClear.addEventListener("click", this.clearForm.bind(this)); // привязываем функцию с очищением формы, с учётом объекта createDataBase
            buttonFormCreate.addEventListener("click", this.addStudent.bind(this)); // привязываем функцию с созданием ученика, с учётом объекта createDataBase
            studentNumberSpan.addEventListener("click", this.sortNumber.bind(this)); // привязываем функцию с сортировкой
            studentFIOSpan.addEventListener("click", this.sortFIO.bind(this)); // привязываем функцию с сортировкой
            studentFacultetSpan.addEventListener("click", this.sortFacultet.bind(this)); // привязываем функцию с сортировкой
            studentBirthdaySpan.addEventListener("click", this.sortBirthday.bind(this)); // привязываем функцию с сортировкой
            studentPeriodSpan.addEventListener("click", this.sortPeriod.bind(this)); // привязываем функцию с сортировкой
            filterSpans.forEach(item => item.addEventListener("click", this.hideFilter.bind(item))); // привязываем функцию с сокрытием фильтров
            filterInputs.forEach(item => item.addEventListener("input", this.filterColumn.bind(item))); // привязываем функцию с фильтрации колонки
        }
    };
    
    createDataBase.activateForm();
})();