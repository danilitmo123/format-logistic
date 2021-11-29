import React from 'react';

import './ErrorMessage.scss'

const ErrorMessage = ({text}) => {
  return <div className={'error-message'}>{text}</div>
};

export default ErrorMessage;
