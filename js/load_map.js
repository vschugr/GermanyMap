document.addEventListener('DOMContentLoaded', () => {
    // Загрузка SVG файла
    fetch('./svg/bundeslands.svg')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Вставка SVG содержимого в контейнер
            document.getElementById('svg-container').innerHTML = data;

            // Выполнение скрипта для обработки элементов path
            const paths = document.querySelectorAll("svg path");

            paths.forEach(path => {
                const bbox = path.getBBox();
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;

                path.style.transformOrigin = `${cx}px ${cy}px`;

                path.addEventListener("mouseover", function () {
                    // Перемещаем элемент в конец родительского элемента
                    path.parentNode.appendChild(path);
                });
            });
        })
        .catch(error => console.error('Ошибка загрузки SVG:', error));
});