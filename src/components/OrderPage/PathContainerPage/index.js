import React, {useState, useEffect} from 'react';
import PathItem from "./PathItem";

import './PathContainerPage.scss'

const PathContainerPage = ({paths, setChosenPath}) => {
  const [index, setIndex] = useState('')
  useEffect(() => {
    if(paths.paths !== undefined && index !== '') {
      setChosenPath([paths.paths[index]])
    }
  }, [index])
  return (
      <div className={'path-container-page'}>
        {paths.paths ? <div>{paths.paths.map((item, index) => <PathItem
            index={index}
            setIndex={setIndex}
            setChosenPath={setChosenPath}
            path={item}/>)}</div> : ''}
      </div>
  );
};

export default PathContainerPage;