import React from 'react';
import PropTypes from 'prop-types';

function Table({ fetchedCountries, selectedCountries, handleCheckboxChange }) {
    return (
        <>
            <table className="min-w-full bg-white rounded border border-secondary" aria-label="Countries Table">
                <thead className="bg-secondary-extraLight">
                    <tr>
                        <th className="p-2 border-b border-secondary w-1/6" scope="col">Select</th>
                        <th className="px-4 py-2 border-b border-l border-secondary w-1/6" scope="col">Code</th>
                        <th className="px-4 py-2 border-b border-l border-secondary w-2/3" scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedCountries?.map((country, index) => (
                        <tr key={country.code} className={`hover:bg-secondary-extraLight ${index === selectedCountries.length - 1 ? 'border-b-8 border-secondary-light' : ''}`}>
                            <td className="p-2 border-b border-secondary-light w-1/6">
                                <input
                                    type="checkbox"
                                    checked={selectedCountries.some(c => c.code === country.code)}
                                    onChange={() => handleCheckboxChange(country)}
                                    className="form-checkbox h-5 w-5 accent-secondary focus:ring-secondary"
                                    aria-label={`Select ${country.name}`}
                                />
                            </td>
                            <td className="px-4 py-2 border-b border-l border-secondary-light w-1/6">{country.code}</td>
                            <td className="px-4 py-2 border-b border-l border-secondary-light w-2/3">{country.name}</td>
                        </tr>
                    ))}
                    {fetchedCountries?.map(country => (
                        <tr key={country.code} className="hover:bg-secondary-extraLight">
                            <td className="p-2 border-b border-secondary-light w-1/6">
                                <input
                                    type="checkbox"
                                    checked={selectedCountries.some(c => c.code === country.code)}
                                    onChange={() => handleCheckboxChange(country)}
                                    className="form-checkbox h-5 w-5 accent-primary focus:ring-primary-dark hover:accent-primary-dark"
                                    aria-label={`Select ${country.name}`}
                                />
                            </td>
                            <td className="px-4 py-2 border-b border-l border-secondary-light w-1/6">{country.code}</td>
                            <td className="px-4 py-2 border-b border-l border-secondary-light w-2/3">{country.name}</td>
                        </tr>
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