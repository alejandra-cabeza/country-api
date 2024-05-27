import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

function Pagination({ currentPage, totalPages, entriesPerPage, handleEntriesChange, setCurrentPage }) {
    return (
        <div className='flex items-center justify-between mt-2'>
            <div className='flex'>
                <Button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    type={'secondary'}
                    label='Previous Page'
                >
                    <i className='fas fa-arrow-left'></i>
                </Button>
                <Button
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    type={'secondary'}
                    label='Next Page'
                >
                    <i className='fas fa-arrow-right'></i>
                </Button>
            </div>
            <span className='ml-2'>
                Page {currentPage} of {totalPages}
            </span>
            <div className='w-min sm:w-max'>
                <label htmlFor='entriesPerPage' className='mr-2'>Show</label>
                <select
                    id='entriesPerPage'
                    value={entriesPerPage}
                    onChange={(e) => handleEntriesChange(parseInt(e.target.value))}
                    className='border border-secondary rounded px-2 py-1 outline-none'
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    entriesPerPage: PropTypes.number.isRequired,
    handleEntriesChange: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
