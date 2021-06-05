import React from 'react';

import './CustomsClearanceForm.scss'

const CustomsClearanceForm = () => {
  return (
      <div className={'customs-clearance-wrapper'}>
        <input type="checkbox"/>
        <div className={'title'}>Таможенное оформление</div>
      </div>
  );
};

export default CustomsClearanceForm;