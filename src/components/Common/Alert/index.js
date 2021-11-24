import React, {useState} from 'react';

import './Alert.scss'

const Alert = ({showAlert, setAlert}) => {

  const alertTime = setTimeout(function () {
    setAlert({active: false})
    clearTimeout(alertTime)
  }, 5000)


  return (
      <div>
        {
          showAlert.active &&
          <div className={'alert'}>
            {showAlert.isFeedback && <div className={'alert-text'}>Ваша заявка успешно создана! Скоро мы с вами свяжемся</div>}
            {!showAlert.isFeedback && <div className={'alert-text'}>{showAlert.isEmail ? 'Ваш заказ отправлен на почту' : 'Ваш заказ успешно создан! Скоро мы с вами свяжемся '}</div>}
          </div>
        }
      </div>
  );
};

export default Alert;
