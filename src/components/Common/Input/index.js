import React, {useState} from 'react';

const Input = () => {

  const [value, setValue] = useState('')

  const changeValueHandler = (e) => {
    setValue(e.target.value)
  }

  return (
      <div>
        <input type="text" value={value} onChange={changeValueHandler}/>
      </div>
  );
};

export default Input;