import React from 'react';

import './AdvantagesCard.scss'

const AdvantagesCard = ({number,icon,title,text}) => {
  return (
      <div className={'card-wrapper'}>
        <div className={'number-wrapper'}>
          <div className={'number'}>{number}</div>
          <img src={icon} alt={'icon'} className={'icon'}/>
        </div>
       <div className={'text-wrapper'}>
         <div className={'advantages-title'}><span className={'first-word'}>{title.split(' ')[0] + ' '}</span>{title.split(' ').slice(1,).join(' ')}</div>
         <div className={'text'}>{text}</div>
       </div>
      </div>
  );
};

export default AdvantagesCard;