import React from 'react';
import { Paginator } from 'primereact/paginator';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Обработчик изменения страницы
  const onPageChangeHandler = (e) => {
    onPageChange({
      page: e.page, // Передаем новый номер страницы обратно в родительский компонент
    });
  };

  return (
    <div className="pagination">
      {/* Компонент Paginator из библиотеки PrimeReact для пагинации */}
      <Paginator
        first={currentPage * totalPages} // Номер первой записи на странице
        rows={totalPages} // Количество записей на странице
        totalRecords={totalPages * totalPages} // Общее количество записей
        pageLinkSize={3} // Количество отображаемых ссылок на страницы
        onPageChange={onPageChangeHandler} // Обработчик изменения страницы
      />
    </div>
  );
};

export default Pagination;
