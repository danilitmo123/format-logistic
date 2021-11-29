import React from 'react';

import './InsuranceForm.scss'

const InsuranceForm = () => {
  return (
      <div className={'insurance-wrapper'}>
        <input type="checkbox"/>
        <div className={'title'}>Страхование груза</div>
      </div>
  );
};

export default InsuranceForm;
