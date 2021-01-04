import React, { useState } from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import SubALayout from './subALayout';

const options = [
  { key: 'p', text: 'Rodzic/Opiekun prawny', value: 'parent' },
  { key: 'u', text: 'Pełnoletni uczeń', value: 'pupil' },
];

const SubA_I_II = () => {
  const [body, setBody] = useState({});

  const handleOnChange = (e) => {
    e.preventDefault();
    setBody((prevBody) => ({
      ...prevBody,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <SubALayout leadHeader='CZĘŚĆ A – INFORMACJE DOTYCZĄCE UCZNIA/UCZENNICY'>
      <Grid.Column className='column'>
        <Header className='sub-header' floated='left' as='h4'>
          I. DANE OSOBOWE WNIOSKODAWCY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              label='Imię wnioskodawcy'
              name='firstName'
            />
            <Form.Input
              className='input'
              label='Nazwisko wnioskoodawcy'
              name='lastName'
            />
            <Form.Input
              className='input'
              label='Numer telefonu wnioskodawcy'
              name='lastName'
            />
            <Form.Select
              className='input'
              label='Status wnioskodawcy'
              options={options}
              placeholder='status'
              name='status'
            />
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Header className='sub-header' floated='left' as='h4'>
          II. DANE OSOBOWE UCZNIA:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              label='Imię ucznia'
              placeholder='First name'
            />
            <Form.Input
              className='input'
              label='Last name'
              placeholder='Last name'
            />
            <Form.Select
              className='input'
              label='Gender'
              options={options}
              placeholder='Gender'
            />
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_I_II;
