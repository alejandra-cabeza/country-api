import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';
import classNames from 'classnames';

function Table({ fetchedCountries, selectedCountries, handleCheckboxChange }) {
    const isSelected = (country) => selectedCountries.some(c => c.code === country.code);

    return (
        <>
            <table className="min-w-full bg-white rounded border border-secondary" aria-label="Countries Table">
                <thead className="bg-secondary-extraLight">
                    <tr>
                        <th className="p-2 border-b border-secondary w-1/6" scope="col">Select</th>
                        <th className="px-4 py-2 border-b border-secondary w-1/6" scope="col">Code</th>
                        <th className="px-4 py-2 border-b border-secondary w-2/3" scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedCountries?.map((country, index) => (
                        <TableRow
                            key={country.code}
                            country={country}
                            isSelected={isSelected(country)}
                            handleCheckboxChange={handleCheckboxChange}
                            type={'secondary'}
                        />
                    ))}
                    {fetchedCountries?.map((country, index) => (
                        <TableRow
                            key={country.code}
                            country={country}
                            isSelected={isSelected(country)}
                            handleCheckboxChange={handleCheckboxChange}
                            type={'primary'}
                            showDivider={index === 0 && selectedCountries?.length > 0}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
}

Table.propTypes = {
    fetchedCountries: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedCountries: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ),
    handleCheckboxChange: PropTypes.func.isRequired
};

export default Table;