import React, {useState} from 'react'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'

const SearchBar = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Обработчик изменения значения в поле ввода
  const handleInputChange = (e) => {
    // Если значение поля ввода пустое, вызываем onSearch с пустой строкой
    if (e.target.value === '') {
      onSearch('')
    }

    // Обновляем состояние searchTerm
    return setSearchTerm(e.target.value)
  }

  // Обработчик нажатия клавиши Enter
  const handleKeyPress = (e) => {
    // Если нажата клавиша Enter, вызываем handleSearch
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Обработчик нажатия кнопки "Поиск"
  const handleSearch = () => {
    // Вызываем onSearch с текущим значением searchTerm
    onSearch(searchTerm)
  }

  return (
    <div className='search-bar'>
      {/* Поле ввода для поискового запроса */}
      <InputText
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder='Введите текст для поиска'
        className='search-input'
      />
      {/* Кнопка для выполнения поиска */}
      <Button onClick={handleSearch} className='search-button'>
        Поиск
      </Button>
    </div>
  )
}

export default SearchBar
