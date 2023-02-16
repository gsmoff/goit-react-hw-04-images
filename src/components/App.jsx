import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/getImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';

export const App = () => {
    const [images, setImages] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentImg, setCurrentImg] = useState(null);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(1);
    const [visibleButton, setVisibleButton] = useState(true);

    const showMore = data => {
        setCurrentImg(data);
    };

    const closeModal = () => {
        setCurrentImg(null);
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSubmit = search => {
        if (search === searchText) {
            return;
        }
        setSearchText(search);
        setCurrentImg(null);
        setPage(1);
    };

    useEffect(() => {
        if (searchText === '') {
            setCurrentImg(null);
            return;
        }
        getImages(searchText, page)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (!data.total)
                    // Promise.reject(new Error());
                    throw new Error();
                if (data.hits.length < 12) setVisibleButton(false);
                if (page === 1) setImages([...data.hits]);
                else setImages(prevImages => [...prevImages, ...data.hits]);
                setStatus('resolved');
            })
            .catch(error => {
                setError(error);
                setStatus('rejected');
            });
    }, [page, searchText]);

    return (
        <div>
            <Toaster position="top-right" toastOption={{ duration: 500 }} />
            <Searchbar onSearch={handleSubmit} />
            <ImageGallery
                value={searchText}
                showImg={showMore}
                images={images}
                status={status}
                visibleButton={visibleButton}
                loadMore={loadMore}
                error={error}
            />
            {currentImg && (
                <Modal currentImg={currentImg} closeModal={closeModal} />
            )}
        </div>
    );
};
