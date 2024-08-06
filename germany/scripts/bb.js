document.addEventListener("DOMContentLoaded", function () {
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
});