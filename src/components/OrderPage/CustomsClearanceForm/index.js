import React, {useEffect, useState} from 'react';

import {Switch} from "antd";

import './CustomsClearanceForm.scss'
import {Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

const CustomsClearanceForm = () => {

  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    localStorage.setItem('customs', JSON.stringify(showInfo))
  }, [showInfo])

  return (
      <div className={'customs-clearance-wrapper'}>
        <div className={'title-wrapper'}>
          <Switch checked={showInfo} onChange={() => setShowInfo(!showInfo)} style={{ marginRight: 10 }}/>
          <div className={'title'}>Таможенное оформление</div>
          <Tooltip title={'Ознакомьтесь с данной услугой и выберите при необходимости'} placement={'right'} color={'rgba(0,0,0,.6)'}>
            <InfoCircleOutlined className={'info'} />
          </Tooltip>
        </div>
        <div className={'description-wrapper'}>
          {
            showInfo ?
                <div className={'description'}>
                  <div>Услуги по таможенному оформлению и предоставление электронно-цифровой подписи (ЭЦП) Таможенного
                    представителя:
                  </div>
                  <br/>
                  <div>- в порту прибытия – 18 000 руб, вкл. НДС;</div>
                  <div>- в аэропорту – 25 000 руб, вкл. НДC;</div>
                  <div>- в зоне таможенного контроля ж/д контейнерной станции – 26 000 руб, вкл. НДС;</div>
                  <div>- на СВХ по маршрутуследования – 30 000 руб, вкл. НДС;</div>
                  <br/>
                  <div>До 4 товарных позиций (без учета таможенных платежей и сборов), каждый дополнительный лист к ДТ –
                    1250 руб, вкл. НДС.
                  </div>
                </div>
                :
                ""
          }
        </div>
      </div>
  );
};

export default CustomsClearanceForm;
