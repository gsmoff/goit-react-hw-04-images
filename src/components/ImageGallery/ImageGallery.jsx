import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';

export const ImageGallery = ({
    value,
    showImg,
    images,
    status,
    visibleButton,
    loadMore,
}) => {
    if (status === 'rejected') {
        return <h2 className={css.colum}>{`${value} is not defined`}</h2>;
    }
    if (status === 'pending') {
        return (
            <div className={css.colum}>
                <Loader />
            </div>
        );
    }
    if (status === 'resolved') {
        return (
            <div className={css.colum}>
                <ul className={css.imageGallery}>
                    {images.length &&
                        images.map(
                            ({ id, webformatURL, largeImageURL, tags }) => (
                                <li
                                    key={id}
                                    className={css.imageGalleryItem}
                                    onClick={() =>
                                        showImg({
                                            largeImageURL,
                                            tags,
                                        })
                                    }
                                >
                                    <ImageGalleryItem
                                        src={webformatURL}
                                        tags={tags}
                                    />
                                </li>
                            )
                        )}
                </ul>
                {images.length !== 0 && visibleButton === true && (
                    <Button clickHandler={loadMore} text="Load More">
                        Load More
                    </Button>
                )}
            </div>
        );
    }
};


ImageGallery.propTypes = {
    showImg: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    visibleButton: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
};

