import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { search, cleanResults } from '../../redux/actions/results'

export default function SearchForm () {
  const [inpQuery, setInpQuery] = useState('')
  const [selectedSearchEngine, setSelectedSearchEngine] = useState('all')
  const dispatch = useDispatch()

  const handleChangeQuery = (e) => {
    setInpQuery(e.target.value)
    if (!e.target.value) dispatch(cleanResults())
  }
  const handleSearchEngine = (e) => {
    setSelectedSearchEngine(e.target.value)
    dispatch(cleanResults())
  }
  const onSubmitSearch = (e) => {
    e.preventDefault()
    if (inpQuery) dispatch(search(inpQuery, selectedSearchEngine))
  }

  return (
    <div className='search-form'>
      <form onSubmit={onSubmitSearch}>
        <div className='search-form__inputs'>
          <input
            onChange={handleChangeQuery}
            value={inpQuery}
            type='text'
          />
          <select
            defaultValue={selectedSearchEngine}
            onChange={handleSearchEngine}
          >
            <option value='all'>All</option>
            <option value='google'>Google</option>
            <option value='bing'>Bing</option>
          </select>
        </div>
        <div className='search-form__action'>
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  )
}
