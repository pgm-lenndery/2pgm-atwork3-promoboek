import React from 'react';
import { useFormContext } from "react-hook-form";

import './index.scss';

export default ({ name, placeholder }) => {

  const { register } = useFormContext();
  
  return (
      <label className="editInput">
          <input ref={ register } type="text" name={ name } placeholder={ placeholder }/>
      </label>
  )
}