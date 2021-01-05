import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import SubmitContext from '../../context/submit/submitContext';

const Nav = () => {
  const submitContext = useContext(SubmitContext);
  const { addNewSubmit, currentSubmit } = submitContext;

  return (
    <div>
      <Button onClick={() => addNewSubmit(currentSubmit)}>Dodaj</Button>
    </div>
  );
};

export default Nav;
