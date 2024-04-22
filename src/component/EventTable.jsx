import React from 'react';
import {DataTable} from 'primereact/datatable'; // Импорт компонента DataTable из PrimeReact
import {Column} from 'primereact/column'; // Импорт компонента Column из PrimeReact
import {Button} from 'primereact/button'; // Импорт компонента Button из PrimeReact

const EventTable = ({events, markAsRead, handleDelete}) => {
  // Обработчик нажатия клавиши пробел для отметки события как прочитанного
  const handleKeyDown = (e, id) => {
    if (e.key === ' ') {
      e.preventDefault();
      markAsRead(id);
    }
  };

  // Функция-шаблон для отображения кнопки удаления в ячейке "Действия"
  const actionBodyTemplate = (rowData) => {
    return (
      <div className='p-d-flex p-jc-center'>
        {/* Кнопка для удаления события */}
        <Button
          onClick={() => handleDelete(rowData.id)} // Обработчик клика на кнопку удаления
          className='p-button-danger'
          label='Удалить' // Надпись на кнопке
        />
      </div>
    );
  };

  return (
    <div className='event-table' tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Таблица событий */}
      <DataTable value={events} emptyMessage="Нет доступных событий">
        {/* Колонка для отображения даты события */}
        <Column field='date' header='Дата' />
        {/* Колонка для отображения важности события */}
        <Column field='importance' header='Важность' />
        {/* Колонка для отображения оборудования, связанного с событием */}
        <Column field='equipment' header='Оборудование' />
        {/* Колонка для отображения описания события с возможностью сортировки */}
        <Column field='description' header='Сообщение' sortable />
        {/* Колонка для отображения ответственного за событие с возможностью сортировки */}
        <Column field='responsible' header='Ответственный' sortable />
        {/* Колонка с кнопкой удаления события */}
        <Column body={actionBodyTemplate} header='Действия' />
        {/* Колонка для отображения статуса события с возможностью добавления класса для стилизации */}
        <Column
          field='status'
          header='Статус'
          className={(rowData) => (rowData.read ? '' : 'unread-event')} // Добавление класса 'unread-event' для непрочитанных событий
        />
      </DataTable>
    </div>
  );
};

export default EventTable;
