import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';

  const modalRoot = document.querySelector('#root');

export const Modal = ({ currentImg, closeModal }) => {

  useEffect(() => {
    const closeByEscape = e => {
      if (e.code === 'Escape') {
          return closeModal();
      }
    };

    window.addEventListener('keydown', closeByEscape);
    window.addEventListener('click', handleBackdropClick);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
      window.removeEventListener('click', handleBackdropClick);
    };
  });
      const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
          return closeModal();
        }
      };

  // console.log(alt.tags);
  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img
          className={css.image}
          src={currentImg.largeImageURL}
          alt={currentImg.tags}
        />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  currentImg: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired 
};
