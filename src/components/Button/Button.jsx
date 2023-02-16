import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';
export const Button = ({ clickHandler, text }) => {
    return (
        <button onClick={clickHandler} className={css.loadMore}>
            {text}
        </button>
    );
};

Button.propTypes = {
    clickHandler: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};