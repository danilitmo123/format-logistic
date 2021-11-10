import React, {useState, useEffect} from 'react';


import Loader from "../../Common/Loader";
import MapBlock from "../../MapUI/MapBlock";

import './PathContainerPage.scss'

const PathContainerPage = ({paths, setChosenPath, thirdPageActiveHandler, weight, volume, setThirdPage, containerWeight}) => {

  const [index, setIndex] = useState('')

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (paths.paths !== undefined && index !== '') {
      setChosenPath([paths.paths[index]])
      localStorage.setItem('path', JSON.stringify(paths.paths[index]))
      thirdPageActiveHandler(false)
    }
  }, [index])

  if (paths.paths && !paths.paths.length) {
    return <div className={'warning-path'}>
      <div>Данное направление пока что нельзя рассчитать через он-лайн сервис, пожалуйста оставьте нам свои контакты для обратной связи, мы сделаем расчет по вашему направлению!</div>
    </div>
  }

  return (
      <div className={'path-container-page'}>
        {paths.paths ? <div>{paths.paths.map((item, index) => <MapBlock
            setThirdPage={setThirdPage}
            key={index}
            weight={weight}
            volume={volume}
            containerWeight={containerWeight}
            index={index}
            setIndex={setIndex}
            path={item}/>)}
        </div> : <Loader/>}
      </div>
  );
};

export default PathContainerPage;