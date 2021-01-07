import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import SubmitContext from '../context/submit/submitContext';

const Nav = () => {
  const submitContext = useContext(SubmitContext);
  const { addNewSubmit, newSubmit } = submitContext;

  return (
    <div className='nav-wrapper'>
      <Button.Group size='big'>
        <Button className = 'nav-button' labelPosition='left' icon='left chevron' content='Wróć' />
        <Button className = 'nav-button' primary icon='save' content='Zapisz' />
        <Button className = 'nav-button' positive icon='thumbs up' content='Złóż' />
        <Button className = 'nav-button' labelPosition='right' icon='right chevron' content='Dalej' />
      </Button.Group>
    </div>
  );
};

export default Nav;
