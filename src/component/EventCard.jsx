import React from 'react';
import { Avatar } from 'primereact/avatar'; // Импорт компонента Avatar из PrimeReact
import { Button } from 'primereact/button'; // Импорт компонента Button из PrimeReact

const EventCard = ({ event, markAsRead, handleDelete }) => {

  // Функция для определения цвета в зависимости от важности
  const getImportanceColor = () => {
    switch (event.importance) {
      case 'Критическая':
        return 'red';
        case 'Высокая':
        return 'darkorange';
      case 'Средняя':
        return 'blue';
      case 'Низкая':
        return 'green';
      default:
        return 'black';
    }
  };

  // Обработчик нажатия клавиши
  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      markAsRead(event.id); // Помечаем событие как прочитанное
    }
  };

  return (
    <div
      className={`event-card ${event.read ? 'event-read' : 'event-unread'}`} // Динамическое добавление класса в зависимости от состояния прочтения события
      tabIndex={0} // Делаем карточку фокусируемой для обработки клавиатурных событий
      onKeyDown={handleKeyDown} // Обработчик нажатия клавиши
      style={{ // Стили для размера, отступов, скругленных углов, переполнения и тени карточки
        width: '350px',
        height: '250px',
        padding: '16px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Детали события */}
      <div className='event-details'>
        <p><strong>Дата:</strong> {event.date}</p>
        <p style={{color: getImportanceColor()}}><strong>Важность:</strong> {event.importance}</p>
        <p><strong>Оборудование:</strong> {event.equipment}</p>
        <p><strong>Сообщение:</strong> {event.description}</p>
        <p><strong>Сервер:</strong> {event.server}</p>
        <p><strong>Статус:</strong> {event.status}</p>
      </div>
      {/* Пользователь события */}
      <div className='event-user'>
        {/* Контейнер аватара и имени пользователя */}
        <div className='avatar-container'>
          <Avatar
            size='large'
            shape='circle'
            icon='pi pi-user' // Иконка по умолчанию, если изображение отсутствует
            image={event.avatar} // Изображение аватара пользователя
            alt='Avatar' // Текстовое описание для доступности
          />
          <p>{event.responsible}</p> {/* Отображаем имя ответственного пользователя */}
        </div>
        {/* Действия с событием */}
        <div className='event-actions'>
          <Button
            label='Удалить'
            onClick={() => handleDelete(event.id)} // Обработчик удаления события
            className='p-button-danger' // Красная кнопка для удаления события
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
