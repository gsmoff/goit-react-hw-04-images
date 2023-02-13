import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Search } from './Search';
import './Searchbar.module.css';
    
export const Searchbar = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const handleChange = e => {
        const { value } = e.target;
        setValue(value.toLowerCase());
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!value.trim()) {
            toast.error('Please enter search text!');
        }
        onSearch(value);
        setValue('');
    };

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <span>
                        <Search />
                    </span>
                </button>
                <input
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    value={value}
                    onChange={handleChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
