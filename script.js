"use strict"

//////////////////////////// Task 1 ////////////////////////////////////
// Создать html-страницу для отображения/редактирования текста. При 
// открытии html-страницы текст отображается с помощью тега div. При нажатии 
// Ctrl + E вместо блока div появляется многострочное текстовое поле textarea с 
// тем же текстом, который теперь можно редактировать. При нажатии Ctrl + S
// вместо textarea появляется div с уже измененным текстом.

let text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, voluptates earum a aliquam repellendus rem laudantium illo excepturi. Ipsa magnam obcaecati quod laboriosam dolore recusandae quos, adipisci totam ipsam doloribus.";

let divForText = document.createElement("div");
divForText.textContent += text;

let mainSection = document.getElementsByClassName("mainSection1")[0];
mainSection.appendChild(divForText);

let textareaForText = document.createElement("textarea");


// обработка нажатия Ctrl+E
document.addEventListener("keydown", function(event){
    if(event.code == 'KeyE' && event.ctrlKey){
        event.preventDefault();
        textareaForText.textContent = divForText.textContent;
        mainSection.removeChild(divForText);
        mainSection.appendChild(textareaForText);
    }
})

// обработка нажатия Ctrl+S
document.addEventListener('keydown', function(event){
    if(event.code == 'KeyS' && event.ctrlKey){
        event.preventDefault();
      
        // обработка изменения текста в textarea
        textareaForText.onchange = function(){         
            divForText.textContent = textareaForText.value;
        }
        mainSection.removeChild(textareaForText);
        mainSection.appendChild(divForText);
    }
})

//////////////////////////// Task 2 ////////////////////////////////////
// Создать html-страницу с таблицей. При клике по заголовку колонки
// необходимо отсортировать данные по этой колонке.

let table = document.getElementsByTagName("table")[0];

table.onclick = function(e){
    // если нажаты любые другие ячейки, кроме заглавных - сортировка не будет выполнятся
    if(e.target.tagName != 'TH') return;

    // присваиваем переменной th кликнутую ячейку
    let th = e.target;

    // вызов ф-ии сортировки
    sortTable(th.cellIndex, th.dataset.type)
}

// 1ый парам - номер столбца, 2ой парам - тип данных (строки или числа)
function sortTable(colNum, type){
    
    // выбираем все, что в теле таблицы
    let tbody = table.querySelector('tbody');

    // создаем массив из строк tbody
    let rowsArray = Array.from(tbody.rows);

    // переменная для ф-ии сортировки
    let compare;
    
    // в зависимости от типа данных
    switch(type){
        // если данные числовые
        case 'number':
            compare = function(rowA, rowB){
                return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
            }
            break;
        // если данные строковые
        case 'string':
            compare = function(rowA, rowB){
                return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
            }
            break;
    }
    // сортируем строки
    rowsArray.sort(compare);
    // запсываем сортированные строки в тело таблицы
    tbody.append(...rowsArray);
}
