import React from 'react';

import loader from '../../../../img/loader.svg'

import './Loader.scss'

const Loader = () => {
  return (
      <div className={'loader-wrapper'}>
        <img src={loader} alt=""/>
        <div>Загрузка...</div>
      </div>
  );
};

export default Loader;