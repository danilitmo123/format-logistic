import React from 'react';

import boy from '../../img/contacts-boy.png'

import './Contacts.scss'

const Contacts = () => {
  return (
      <section className={'contacts-wrapper'}>
        <div className={'description-block'}>
          <div className={'overtitle'}>Схема работы</div>
          <div className={'contacts-title'}>Вы можете связаться с нами:</div>
          <img src={boy} alt="" className={'contacts-img'}/>
        </div>
        <div className="form-wrapper">
          <form className={'registration-form'}>
            <div className={'form-title'}>Есть вопросы?</div>
            <div className={'form-subtitle'}>Оставьте заявку и мы ответим</div>
            <input placeholder={'Email'} type="email" className={'form-input'}/>
            <input placeholder={'Номер телефона'} type="number" className={'form-input'}/>
            <button type={"submit"} className={'create-account-btn'}>Оставить заявку</button>
          </form>
          <div className={'extra-text'}>
            <div className={'first-line'}></div>
            <div className={'text'}>ИЛИ</div>
            <div className={'second-line'}></div>
          </div>
          <div className={'contacts-number'}>+7 (499) 281-60-81</div>
        </div>
      </section>
  );
};

export default Contacts;