import React, { useEffect } from 'react';
import UploadItem from './UploadItem';
import { useStoreContext } from '../utils/GlobalState';
import { UPDATE_UPLOADS } from '../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_UPLOADS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function UploadList() {
    const [state, dispatch] = useStoreContext();

    const { currentGenre } = state;

    const { loading, data } = useQuery(QUERY_UPLOADS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_UPLOADS,
                uploads: data.uploads,
            });
            data.uploads.forEach((upload) => {
                idbPromise('uploads', 'put', upload);
            });
        } else if (!loading) {
            idbPromise('uploads', 'get').then((uploads) => {
                dispatch({
                    type: UPDATE_UPLOADS,
                    uploads: uploads,
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterUploads() {
        if (!currentGenre) {
            return state.uploads;
        }

        return state.uploads.filter(
            (upload) => upload.genre._id === currentGenre
        );
    }

    return (
        <div className='record-container'>
            {/* <h2>Records</h2> */}
            {state.uploads.length ? (
                <div className="container">
                <div className='row'>
                    {filterUploads().map((upload) => (
                        <div className="col-md-3" key={upload._id}>
                        <UploadItem
                            key={upload._id}
                            _id={upload._id}
                            img={upload.img}
                            album={upload.album}
                            artist={upload.artist}
                            price={upload.price}
                        />
                        </div>
                    ))}
                </div>
                </div>
            ) : (
                <h3>No records to see here</h3>
            )}
        </div>
    )

};

export default UploadList;