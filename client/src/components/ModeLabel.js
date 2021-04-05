import React, { useEffect, useState } from 'react';
import { Icon, Label } from 'semantic-ui-react';

import { Wrapper } from './styles/modelabel.styles';

const ModeLabel = ({ mode }) => {
  const [color, setColor] = useState('grey');
  const [text, setText] = useState('TRYB PODGLĄDU WNIOSKU');
  const [icon, setIcon] = useState('eye');

  useEffect(() => {
    if (mode === 'watch') {
      setColor('grey');
      setText('TRYB PODGLĄDU WNIOSKU');
      setIcon('eye');
    } else if (mode === 'edit') {
      setColor('blue');
      setText('TRYB EDYTOWANIA WNIOSKU');
      setIcon('edit');
    } else if (mode === 'new') {
      setColor('purple');
      setText('TRYB DODAWANIA WNIOSKU');
      setIcon('plus');
    }
  }, [mode]);

  return (
    <Wrapper>
      <Label color={color} basic as='div'>
        <Icon name={icon} /> {text}
      </Label>
    </Wrapper>
  );
};

export default ModeLabel;
