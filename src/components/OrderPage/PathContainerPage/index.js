import React from 'react';
import PathItem from "./PathItem";

import './PathContainerPage.scss'

const PathContainerPage = ({paths}) => {
  return (
      <div className={'path-container-page'}>
        {paths.paths ? <div>{paths.paths.map(item => <PathItem path={item}/>)}</div> : ''}
      </div>
  );
};

export default PathContainerPage;