/* ПАРАМЕТРЫ */
const canvasH600 = document.getElementById('canvas-h600')
const canvasH50 = document.getElementById('canvas-h50')

/* Параметры звезд */
const stars = [
    {color: 'red'},
    {color: 'blue'},
    {color: 'green'},
    {color: 'yellow'},
    {color: 'black'},
];

const starsLength = stars.length;

const ctx = canvasH600.getContext('2d')

/* ФУНКЦИИ */

/* Определяет случайный цвет */

/* Создает звезды */
function drawStar(x, y, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + radius);

    for (let i = 0; i < starsLength * 2; i++) {
        const r = (i % 2 === 0) ? radius : (radius / 2);
        const a = Math.PI * i / 5;
        ctx.lineTo(x + r * Math.sin(a), y + r * Math.cos(a));
    };

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
}

canvasH600.addEventListener('click', (e) => {
    /** кординаты клика */
    const x = e.offsetX;
    const y = e.offsetY;

    const { data: [red, green, blue, alpha] } = ctx.getImageData(x, y, 1, 1);
    const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

    canvasH50.style.backgroundColor = color;
})

!(() => {
    const width = canvasH600.width;

    /** Ширина и высота облости */
    const starsArea = width / starsLength;

    /** Радиус от центра */
    const radius = starsArea / 2;

    /** Рисуем */
   for (let i = 0; i <= starsLength - 1; i++) {
     const color = "#" + Math.floor(Math.random()*16777215).toString(16);
     const x = radius + starsArea * i;
     const y = radius
     drawStar(x, y, radius, stars[i].color);
   }
})()
