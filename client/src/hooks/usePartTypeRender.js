import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const usePartTypeRender = (part={}) => {
  const [partTypeToDisplay, setPartType] = useState('');
  const defaults = useSelector(state => state.parts.default);

  useEffect(() => {
    if (Object.keys(defaults).length > 0 && (part.custom_type || part.type)) {
      let name = part.custom_type || defaults[part.type].title;
      setPartType(name);
    }
  }, [part, defaults]);

  return partTypeToDisplay;
};

export default usePartTypeRender;