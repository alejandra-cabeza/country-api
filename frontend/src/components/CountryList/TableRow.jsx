import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function TableRow({ country: { code, name }, isSelected, handleCheckboxChange, className, type, showDivider }) {
    return (
        <tr key={code} className={classNames("hover:bg-secondary-extraLight", className, showDivider ? 'border-t-8 border-secondary-light' : 'border-t')}>
            <td className="p-2 w-1/6 border-r">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheckboxChange({ code, name })}
                    className={classNames("form-checkbox h-5 w-5", {
                        'accent-primary focus:ring-primary-dark hover:accent-primary-dark': type === 'primary',
                        'accent-secondary focus:ring-secondary-dark hover:accent-secondary-dark': type === 'secondary'
                    })}
                    aria-label={`Select ${name}`}
                />
            </td>
            <td className="px-4 py-2 w-1/6 border-r">{code}</td>
            <td className="px-4 py-2 w-2/3">{name}</td>
        </tr>
    );
}

TableRow.propTypes = {
    country: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    type: PropTypes.string,
    showDivider: PropTypes.bool
};

export default TableRow;