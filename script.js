// Получаем элементы формы и сообщения
const form = document.getElementById('info-form');
const thankYouMessage = document.getElementById('thank-you-message');

// URL вашего веб-приложения Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbziIrH4TS00Q1LNCxZmeKbYB0Q5q6wFNwcp6T-_Ro0oKOpLfxCcBp3oL-iSPe1ypUeolA/exec'; // Замените на ваш URL

// Добавляем обработчик события отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы

    // Собираем данные формы
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        zipCode: document.getElementById('zipCode').value.trim(),
    };

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Конвертируем данные в формат JSON
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Парсим ответ от сервера в JSON
        })
        .then((data) => {
            if (data.status === 'success') {
                // Если сервер ответил "успех", показываем сообщение благодарности
                form.style.display = 'none';
                thankYouMessage.style.display = 'block';
            } else {
                alert('Server returned an error: ' + data.message);
            }
        })
        .catch((error) => {
            // Обработка ошибок, если fetch не сработал
            console.error('Fetch error:', error.message);
            alert('Error: ' + error.message);
        });
});
