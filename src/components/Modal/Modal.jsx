import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ largeImageURL, tags, closeModal }) => {
    // const handleBackdropClick = e => {
    //     if (e.currentTarget === e.target) {
    //         closeModal();
    //     }
    // };
    useEffect(() => {
        const closeByEscape = e => {
            if (e.code === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', closeByEscape);

        return () => {
            window.removeEventListener('keydown', closeByEscape);
        };
    }, [closeModal]);

    // console.log(alt.tags);
    return (
        <div className={css.overlay} onClick={() => closeModal()}>
            <div className={css.modal}>
                <img className={css.image} src={largeImageURL} alt={tags} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};
