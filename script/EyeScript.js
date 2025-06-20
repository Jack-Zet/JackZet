 // Класс для рисования и анимации глаза
class Eye {
  constructor(canvasId, containerId) {
    // Получаем канвас и контекст рисования
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    if (!this.ctx) return;

    // Начальные координаты для центра глаза, радужки и курсора
    this.eyeCenterX = 0;
    this.eyeCenterY = 0;
    this.irisX = 0;
    this.irisY = 0;
    this.cursorX = 0;
    this.cursorY = 0;

    // Размеры глаза
    this.eyeRadius = 50;  // Радиус глаза (голова робота)
    this.irisRadius = this.eyeRadius * 0.3;  // Радиус радужки (30% от диаметра головы)
    this.pupilRadius = this.irisRadius * 0.5; // Радиус зрачка (50% от диаметра радужки)

    // Настроить размер канваса
    this.resizeCanvas(containerId);

    // Запускаем анимацию глаза
    this.animate();

    // Отслеживаем движение мыши
    document.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  // Метод для изменения размера канваса в зависимости от контейнера
  resizeCanvas(containerId) {
    const eyeBlock = $('#' + containerId);
    this.canvas.width = eyeBlock.width();
    this.canvas.height = eyeBlock.width(); // Сделать квадратный канвас
    this.eyeCenterX = this.canvas.width / 2;
    this.eyeCenterY = this.canvas.height / 2;
  }

  // Обработчик события движения мыши
  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();  // Получаем позицию канваса
    this.cursorX = event.clientX - rect.left;          // Корректируем координаты для канваса
    this.cursorY = event.clientY - rect.top;
  }

  // Метод для рисования глаза
  drawEye() {
    // Очистить канвас перед рисованием нового состояния глаза
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Рисуем контур глаза
    this.drawEyeOutline();

    // Рассчитываем положение радужки в зависимости от положения мыши
    this.calculateIrisPosition();

    // Рисуем радужку
    this.drawIris();

    // Рисуем зрачок
    this.drawPupil();
  }

  // Рисуем контур глаза
  drawEyeOutline() {
    // Внешний круг (ободок глаза)
    this.ctx.beginPath();
    this.ctx.arc(this.eyeCenterX, this.eyeCenterY, this.eyeRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#2f2f2f'; // Темный металл
    this.ctx.fill();
    this.ctx.strokeStyle = '#888'; // Серый цвет обода
    this.ctx.lineWidth = 8;
    this.ctx.stroke();

    // Внутренний ободок
    this.ctx.beginPath();
    this.ctx.arc(this.eyeCenterX, this.eyeCenterY, this.eyeRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#3d3d3d'; // Более светлый металл
    this.ctx.fill();
    this.ctx.strokeStyle = '#555';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }

  // Рассчитываем положение радужки
  calculateIrisPosition() {
    const dx = this.cursorX - this.eyeCenterX;
    const dy = this.cursorY - this.eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), this.eyeRadius * 0.6); // Ограничиваем радужку на расстоянии 60% от центра

    // Позиция радужки
    this.irisX = this.eyeCenterX + distance * Math.cos(angle);
    this.irisY = this.eyeCenterY + distance * Math.sin(angle);
  }

  // Рисуем радужку
  drawIris() {
    this.ctx.beginPath();
    this.ctx.arc(this.irisX, this.irisY, this.irisRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#00c8ff'; // Неоново-синий цвет радужки
    this.ctx.fill();
    this.ctx.strokeStyle = '#0099cc'; // Контур радужки
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

  // Рисуем зрачок
  drawPupil() {
    // Создаем градиент для зрачка
    const grad = this.ctx.createRadialGradient(this.irisX, this.irisY, 0, this.irisX, this.irisY, this.pupilRadius);
    grad.addColorStop(0, '#222'); // Темный центр
    grad.addColorStop(0.5, '#000'); // Черный цвет зрачка
    grad.addColorStop(1, '#555'); // Серая окружность с эффектом глубины

    // Рисуем сам зрачок
    this.ctx.beginPath();
    this.ctx.arc(this.irisX, this.irisY, this.pupilRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // Блик на зрачке
    this.ctx.beginPath();
    this.ctx.arc(this.irisX - 5, this.irisY - 5, 4, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'white'; // Блик на зрачке
    this.ctx.fill();

    // Дополнительный блик вокруг зрачка
    this.ctx.beginPath();
    this.ctx.arc(this.irisX, this.irisY, this.pupilRadius + 2, 0, 2 * Math.PI);
    this.ctx.strokeStyle = '#aaa'; // Светлый контур вокруг зрачка
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  // Основной цикл анимации
  animate() {
    this.drawEye();
    requestAnimationFrame(() => this.animate()); // Повторный вызов анимации
  }
}