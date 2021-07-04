import React from 'react';

import './ExtraShoulderItem.scss'

const ExtraShoulderItem = ({title, type}) => {
    return (
        <div className={'extra-shoulder-item-wrapper'}>
            <div className={'extra-shoulder-text'}>
                <div className={'extra-shoulder-title'}>{title}</div>
                <div className={'extra-shoulder-type'}>{type}</div>
            </div>
            <div className={'inputs-wrapper'}>
                <div className={'input-per-kg'}>
                    <input type="number"/>
                    <div>€</div>
                </div>
                <div className={'input-per-volume'}>
                    <input type="number"/>
                    <div>€</div>
                </div>
                <div className={'input-per-ldm'}>
                    <input type="number"/>
                    <div>€</div>
                </div>
            </div>
        </div>
    );
};

export default ExtraShoulderItem;