import React, { useState, useMemo } from 'react';
import ToolBar from './ToolBar';
import Table from './Table';
import Pagination from './Pagination';
import useFetch from '../../hooks/useFetch';
import useDebounce from '../../hooks/useDebounce';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const params = useMemo(() => {
        const baseParams = {
            page: currentPage,
            per_page: entriesPerPage
        };
    
        if (debouncedSearchTerm) {
            baseParams.search = debouncedSearchTerm;
        }
    
        return baseParams;
    }, [currentPage, debouncedSearchTerm, entriesPerPage]);


    const { data: fetchedCountries, loading, error } = useFetch(`http://localhost:8000/api/countries`, params);
    const totalPages = fetchedCountries?.meta?.last_page;

    const handleCheckboxChange = (country) => {
        setSelectedCountries((prevSelected) =>
            prevSelected.some((c) => c.code === country.code)
                ? prevSelected.filter((c) => c.code !== country.code)
                : [...prevSelected, country]
        );
    };

    const handleResetClick = () => {
        setSelectedCountries([]);
        setCurrentPage(1);
        setSearchTerm('');
    };

    const handleSearchTermChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleEntriesChange = (value) => {
        setEntriesPerPage(value);
        setCurrentPage(1);
    };

    const handleButtonClick = () => {
        const selectedCountryNames = selectedCountries.map((country) => country.code);
        alert(selectedCountryNames.join(', '));
    };


    const renderContent = () => {
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return (
            <div className='bg-error rounded p-2 m-20 text-white'>
              Error: {error.response?.data?.message || 'An error occurred'}
            </div>
          );
        }
      
        if (fetchedCountries?.data.length) {
          return (
            <>
              <Table
                fetchedCountries={fetchedCountries?.data}
                selectedCountries={selectedCountries}
                handleCheckboxChange={handleCheckboxChange}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                entriesPerPage={entriesPerPage}
                handleEntriesChange={handleEntriesChange}
                setCurrentPage={setCurrentPage}
                onButtonClick={handleButtonClick}
              />
            </>
          );
        }
      
        return <div className='text-xl m-12'>No countries found</div>;
      };


    return (
        <div className='block w-full md:w-3/4 mx-auto'>
            <h1 className='text-2xl font-bold mb-8'>
                Country List
            </h1>
            <ToolBar
                handleButtonClick={handleButtonClick}
                onResetClick={handleResetClick}
                searchTerm={searchTerm}
                selectedCountries={selectedCountries}
                onSearchTermChange={handleSearchTermChange}
            />
            {renderContent()}
        </div>
    );
}

export default Home;



