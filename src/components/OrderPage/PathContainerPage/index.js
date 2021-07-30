import React, {useState, useEffect} from 'react';

import PathItem from "./PathItem";
import Loader from "../../AdminPage/common/loader";

import loader from '../../../img/loader.svg'

import './PathContainerPage.scss'

const PathContainerPage = ({paths, setChosenPath, thirdPageActiveHandler, weight, volume}) => {
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