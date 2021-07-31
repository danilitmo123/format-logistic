import React from 'react';

import './Alert.scss'

const Alert = ({setAlert}) => {
  return (
      <div className={'alert'}>
        <div className={'alert-text'}>Ваш заказ успешно создан!<br/>Скоро мы с вами свяжемся</div>
        <div onClick={() => setAlert(false)} className={'close-alert'}>&times;</div>
      </div>
  );
};

export default Alert;