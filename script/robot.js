

$(function() {

class Robot {
  constructor(canvasId, containerId) {
    // Получаем канвас и контекст рисования
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    if (!this.ctx) return;

    // Начальные параметры робота
    this.robotCenterX = 0;
    this.robotCenterY = 0;
    this.eye = new Eye('robotCanvas', 'robotBlock'); // Глаз робота
    this.yOffset = 0; // Смещение по вертикали для анимации
    this.direction = 1; // Направление движения (вверх/вниз)

    // Настроить размер канваса
    this.resizeCanvas(containerId);

    // Запуск анимации робота
    this.animate();
  }

  // Метод для изменения размера канваса робота
  resizeCanvas(containerId) {
    const robotBlock = $('#' + containerId);
    this.canvas.width = robotBlock.width();
    this.canvas.height = robotBlock.width(); // Размер канваса - квадрат
    this.robotCenterX = this.canvas.width / 2;
    this.robotCenterY = this.canvas.height / 2;
  }

  // Метод для рисования робота
  drawRobot() {
    // Очистка канваса перед рисованием
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Рисуем тело робота (овал)
    this.ctx.beginPath();
    this.ctx.ellipse(this.robotCenterX, this.robotCenterY + this.yOffset, 70, 100, 0, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.strokeStyle = '#555';
    this.ctx.lineWidth = 4;
    this.ctx.stroke();

    // Рисуем голову робота (круг)
    const headYPosition = this.robotCenterY - 40 + this.yOffset; // Центр головы
    this.ctx.beginPath();
    this.ctx.arc(this.robotCenterX, headYPosition, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.strokeStyle = '#555';
    this.ctx.lineWidth = 4;
    this.ctx.stroke();

    // Рисуем глаз внутри головы (в центре головы)
    const eyeCenterX = this.robotCenterX; // Центр глаза совпадает с центром головы
    const eyeCenterY = headYPosition; // Центр глаза совпадает с центром головы
    this.eye.eyeCenterX = eyeCenterX;
    this.eye.eyeCenterY = eyeCenterY;
    this.eye.drawEye(); // Рисуем глаз

    // Рисуем руки робота (линиями)
    this.ctx.beginPath();
    this.ctx.moveTo(this.robotCenterX - 80, this.robotCenterY + this.yOffset);
    this.ctx.lineTo(this.robotCenterX - 120, this.robotCenterY + this.yOffset + 30);
    this.ctx.lineWidth = 6;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(this.robotCenterX + 80, this.robotCenterY + this.yOffset);
    this.ctx.lineTo(this.robotCenterX + 120, this.robotCenterY + this.yOffset + 30);
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
  }

  // Основной цикл анимации робота
  animate() {
    // Колебания робота вверх и вниз
    if (this.yOffset > 10 || this.yOffset < -10) {
      this.direction *= -1; // Изменить направление
    }
    this.yOffset += this.direction * 0.5; // Обновляем положение

    // Рисуем робот с обновленным положением
    this.drawRobot();
    requestAnimationFrame(() => this.animate()); // Повторный вызов анимации
  }
}




  // Создаем и запускаем робота
  new Robot('robotCanvas', 'robotBlock');





});



