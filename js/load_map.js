function loadAndProcessSVG(containerId, svgPath) {
    const svgContainer = document.getElementById(containerId);

    fetch(svgPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            // Вставка SVG содержимого в контейнер
            svgContainer.innerHTML = data;
            // Получение SVG элемента
            const svg = svgContainer.querySelector('svg');
            if (svg) {
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                svg.style.maxWidth = '30%';
                svg.style.maxHeight = '30%';
                svg.style.width = '100%';
                svg.style.height = 'auto';
               
            }

            // Выполнение скрипта для обработки элементов path и polygon
            const elements = svgContainer.querySelectorAll("svg path, svg polygon");

            elements.forEach(element => {
                const bbox = element.getBBox();
                const cx = bbox.x + bbox.width / 2;
                const cy = bbox.y + bbox.height / 2;

                element.style.transformOrigin = `${cx}px ${cy}px`;

                element.addEventListener("mouseover", function () {
                    // Перемещаем элемент в конец родительского элемента
                    element.parentNode.appendChild(element);
                });
            });
        })
        .catch(error => console.error('Ошибка загрузки SVG:', error));
}

function addSwiper(){

    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Swiper
   
    addSwiper()
    // Загрузка и обработка SVG файлов
    loadAndProcessSVG('svg-container_1', 'images/federalstates.svg');
    loadAndProcessSVG('svg-container_2', 'images/landdistings.svg');
});