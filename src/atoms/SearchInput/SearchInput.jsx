import React from 'react'
import './SearchInput.scss'
import Search from '../../assets/icons/Search.svg'

const SearchInput = (props) => {
    return (
        <div className='Input'>
            {/* <Search/> */}
            <input {...props}/>
        </div>
    )
}

export default SearchInput
