import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import SubmitContext from '../context/submit/submitContext';
import { Wrapper } from './styles/nav.styles';

const Nav = ({ activeItem, setActiveItem }) => {
  const submitContext = useContext(SubmitContext);
  const { addNewSubmit, newSubmit, submitMode, updateSubmit, curSubmit } = submitContext;

  return (
    <Wrapper mode={submitMode}>
      <Button.Group size='medium'>
        <Button
          onClick={() => setActiveItem(activeItem - 1)}
          className='nav-button'
          labelPosition='left'
          icon='left chevron'
          content='Wróć'
        />
        <Button
          className='nav-button save'
          onClick={() => updateSubmit(curSubmit)}
          primary
          icon='save'
          content='Zapisz zmiany'
        />
        <Button
          className='nav-button submit'
          positive
          onClick={() => addNewSubmit(newSubmit)}
          icon='thumbs up'
          content='Złóż'
        />
        <Button
          onClick={() => setActiveItem(activeItem + 1)}
          className='nav-button'
          labelPosition='right'
          icon='right chevron'
          content='Dalej'
        />
      </Button.Group>
    </Wrapper>
  );
};

export default Nav;
