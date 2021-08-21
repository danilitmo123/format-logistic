import React, {useState, useEffect} from 'react';

import PathItem from "./PathItem";
import Loader from "../../Common/Loader";

import './PathContainerPage.scss'

const PathContainerPage = ({paths, setChosenPath, thirdPageActiveHandler, weight, volume}) => {

  const [index, setIndex] = useState('')

  useEffect(() => {
    window.scroll(0,0)
  }, [])

  useEffect(() => {
    if(paths.paths !== undefined && index !== '') {
      setChosenPath([paths.paths[index]])
      localStorage.setItem('path', JSON.stringify(paths.paths[index]))
      thirdPageActiveHandler(false)
    }
  }, [index])

  if (paths.paths && !paths.paths.length) {
    return  <div className={'warning-path'}>
      <div>На данном направлении пока что нет сервиса</div>
      <div>Вернитесь на предыдущую страницу и измените маршрут</div>
    </div>
  }

  return (
      <div className={'path-container-page'}>
        {paths.paths ? <div>{paths.paths.map((item, index) => <PathItem
            key={index}
            weight={weight}
            volume={volume}
            index={index}
            setIndex={setIndex}
            path={item}/>)}
        </div> : <Loader/>}
      </div>
  );
};

export default PathContainerPage;