import React, {useState, useEffect} from 'react';

import PathItem from "./PathItem";

import loader from '../../../img/loader.svg'

import './PathContainerPage.scss'

const PathContainerPage = ({paths, setChosenPath, thirdPageActiveHandler}) => {
  const [index, setIndex] = useState('')

  useEffect(() => {
    if(paths.paths !== undefined && index !== '') {
      setChosenPath([paths.paths[index]])
      localStorage.setItem('path', JSON.stringify(paths.paths[index]))
      thirdPageActiveHandler(false)
    }
  }, [index])
  return (
      <div className={'path-container-page'}>
        {paths.paths ? <div>{paths.paths.map((item, index) => <PathItem
            index={index}
            setIndex={setIndex}
            path={item}/>)}
        </div> : <div className={'loader'}><img src={loader} alt=""/><div>Загрузка...</div></div>}
      </div>
  );
};

export default PathContainerPage;