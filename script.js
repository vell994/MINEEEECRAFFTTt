// Переменные для хранения ссылок на DOM-элементы
const canvas = document.getElementById('pixel-canvas');
const ctx = canvas.getContext('2d');
let currentColor = '#000';

// Генерация сетки
function drawGrid() {
    const size = 50; // Размер сетки (50х50)
    const cellSize = 10; // Ширина каждого квадрата
    ctx.clearRect(0, 0, 500, 500); // Очистка canvas
    for(let i = 0; i <= size; i++) {
        ctx.beginPath();
        ctx.moveTo(i*cellSize, 0);
        ctx.lineTo(i*cellSize, size*cellSize);
        ctx.strokeStyle = "#ccc"; // Светлый серый цвет линий
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i*cellSize);
        ctx.lineTo(size*cellSize, i*cellSize);
        ctx.stroke();
    }
}

// Наполнение ячейки определенным цветом
function fillPixel(x, y, color) {
    if (ctx && x >= 0 && y >= 0 && x < 50 && y < 50) { // Проверка границ
        ctx.fillStyle = color;
        ctx.fillRect(x*10, y*10, 10, 10); // Заливка пикселя
    }
}

// Слушатели событий для рисования
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 10);
    const y = Math.floor((event.clientY - rect.top) / 10);
    if(event.buttons === 1) { // Левая кнопка мыши
        fillPixel(x, y, currentColor);
    }
});

canvas.addEventListener('mousedown', event => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / 10);
    const y = Math.floor((event.clientY - rect.top) / 10);
    fillPixel(x, y, currentColor);
});

// Переключение активного цвета
document.querySelectorAll('.color-picker').forEach(colorPicker => {
    colorPicker.addEventListener('click', () => {
        currentColor = colorPicker.dataset.color;
    });
});

// Сохранение изображения на сервер
async function saveImage() {
    try {
        const dataURL = canvas.toDataURL('image/png');
        await fetch('/api/save-image', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ image: dataURL }),
        });
        alert('Изображение успешно сохранено!');
    } catch(error) {
        alert('Ошибка сохранения изображения.');
    }
}

// Экспорт файла
function exportFile(format='png') {
    const dataURL = canvas.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `mypixelart.${format}`;
    link.click();
}

// Инициализация canvas
drawGrid();

// Остальные компоненты (фильтрация, загрузка данных и т.д.) зависят от конкретного бэкенда и архитектуры приложения.