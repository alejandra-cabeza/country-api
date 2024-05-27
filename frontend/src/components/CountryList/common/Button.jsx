import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const buttonTypeClasses = {
  primary: 'bg-primary hover:bg-primary-dark focus:bg-primary-dark',
  secondary: 'bg-secondary hover:bg-secondary-dark focus:bg-secondary-dark',
};

function Button({ onClick, disabled = false, label, children, type }) {

  const buttonClasses = classNames(
    'font-semibold rounded p-2 px-4 mr-4',
    buttonTypeClasses[type],
    {
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={label}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
};
export default Button;