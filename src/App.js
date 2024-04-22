import React, { useState, useEffect } from 'react'
import EventCard from './component/EventCard'
import EventTable from './component/EventTable'
import { Button } from 'primereact/button'
import SearchBar from './component/SearchBar'
import Pagination from './component/Pagination'

function App() {
  const [events, setEvents] = useState([]) // Состояние для списка событий
  const [currentPage, setCurrentPage] = useState(0) // Состояние для текущей страницы пагинации
  const [viewType, setViewType] = useState('table') // Состояние для типа отображения (таблица или карточки)
  const [searchTerm, setSearchTerm] = useState('') // Состояние для поискового запроса
  const [sortField, setSortField] = useState(null) // Состояние для поля сортировки
  const [sortOrder, setSortOrder] = useState(null) // Состояние для порядка сортировки

  const eventsPerPage = 10 // Количество событий на одной странице пагинации

  // Вспомогательные массивы для генерации случайных данных
  const importances = ['Критическая', 'Высокая', 'Средняя', 'Низкая']
  const equipments = ['Оборудование 1', 'Оборудование 2', 'Оборудование 3']
  const descriptions = [
    'Не работает первый сектор',
    'Ушел домой',
    'Сделал всю работу'
  ]
  const responsibles = [
    'Иванов И.И.',
    'Петров П.П.',
    'Сидоров С.С.',
    'Антонов А.А.',
    'Козлов К.К.'
  ]
  const servers = ['Vegas', 'Alpha', 'Beta']
  const statuses = ['Недоступен', 'Доступен', 'В обслуживании']

  // Запуск добавления случайного события через интервал
  useEffect(() => {
    const addEvent = () => {
      const randomImportanceIndex = Math.floor(
        Math.random() * importances.length
      )
      const randomEquipmentIndex = Math.floor(Math.random() * equipments.length)
      const randomDescriptionIndex = Math.floor(
        Math.random() * descriptions.length
      )
      const randomServerIndex = Math.floor(Math.random() * servers.length)
      const randomStatusIndex = Math.floor(Math.random() * statuses.length)
      const randomResponsibleIndex = Math.floor(
        Math.random() * responsibles.length
      )
      const newEvent = {
        id: events.length + 1,
        date: new Date().toLocaleString(),
        importance: importances[randomImportanceIndex],
        equipment: equipments[randomEquipmentIndex],
        description: descriptions[randomDescriptionIndex],
        responsible: responsibles[randomResponsibleIndex],
        server: servers[randomServerIndex],
        status: statuses[randomStatusIndex],
        read: false
      }
      setEvents((prevEvents) => [...prevEvents, newEvent])
    }

    const interval = setInterval(addEvent, 5000) // Добавление нового события каждые 5 секунд
    return () => clearInterval(interval) // Очистка интервала при размонтировании компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]) // Запуск эффекта только при изменении списка событий

  // Пометить событие как прочитанное
  const markAsRead = (eventId) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, read: true } : event
    )
    setEvents(updatedEvents)
  }

  // Удалить событие
  const removeEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    )
  }

  // Изменить текущую страницу пагинации
  const onPageChange = (e) => {
    setCurrentPage(e.page)
  }

  // Обработать сортировку
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 1 ? -1 : 1)
    } else {
      setSortField(field)
      setSortOrder(1)
    }
  }

  // Обработать поиск
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  // Фильтрация событий по поисковому запросу
  const filteredEvents = events.filter((event) =>
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Сортировка отфильтрованных событий
  const sortedEvents =
    sortField && sortOrder
      ? filteredEvents
          .slice()
          .sort((a, b) =>
            a[sortField] > b[sortField] ? sortOrder : -sortOrder
          )
      : filteredEvents

  // Вычисление общего количества страниц пагинации
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage)

  return (
    <div className='App'>
      <h1>Журнал событий</h1>
      <div className='top-bar'>
        <div className='button-group'>
          {/* Кнопки для выбора типа отображения */}
          <Button
            label='Таблица'
            onClick={() => setViewType('table')}
            className={viewType === 'table' ? 'p-button-secondary' : ''}
          />
          <Button
            label='Карточки'
            onClick={() => setViewType('card')}
            className={viewType === 'card' ? 'p-button-secondary' : ''}
          />
        </div>
        {/* Компонент поиска */}
        <SearchBar onSearch={handleSearch} />
      </div>
      {/* Отображение списка событий в зависимости от выбранного типа отображения */}
      {viewType === 'table' && (
        <EventTable
          events={sortedEvents.slice(
            currentPage * eventsPerPage,
            (currentPage + 1) * eventsPerPage
          )}
          markAsRead={markAsRead}
          handleDelete={removeEvent}
          onSort={handleSort}
        />
      )}
      {viewType === 'card' && (
        <div className='horizontal-event-cards'>
          {sortedEvents
            .slice(
              currentPage * eventsPerPage,
              (currentPage + 1) * eventsPerPage
            )
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                markAsRead={markAsRead}
                handleDelete={removeEvent}
              />
            ))}
        </div>
      )}
      {/* Компонент пагинации */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default App
