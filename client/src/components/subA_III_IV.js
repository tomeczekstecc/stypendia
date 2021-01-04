import React, { useState } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import SubALayout from './subALayout';

const options = [
  { key: 'd', text: 'dolnośląskie', value: 'D' },
  { key: 'c', text: 'kujawsko-pomorskie', value: 'C' },
  { key: 'l', text: 'lubelskie', value: 'L' },
  { key: 'f', text: 'lubuskie', value: 'F' },
  { key: 'e', text: 'łódzkie', value: 'E' },
  { key: 'k', text: 'małopolskie', value: 'K' },
  { key: 'w', text: 'mazowieckie', value: 'W' },
  { key: 'o', text: 'opolskie', value: 'O' },
  { key: 'r', text: 'podkarpackie', value: 'R' },
  { key: 'b', text: 'podlaskie', value: 'B' },
  { key: 'g', text: 'pomorskie', value: 'G' },
  { key: 's', text: 'śląskie', value: 'S' },
  { key: 't', text: 'świętokrzyskie', value: 'T' },
  { key: 'n', text: 'warmińsko-mazurskie', value: 'N' },
  { key: 'p', text: 'wielkopolskie', value: 'P' },
  { key: 'z', text: 'zachodniopomorskie', value: 'Z' },
  { key: 'B', text: 'podlaskie', value: 'B' },
];
const optionsC = [
  { key: 'n', text: 'Nauczyciel', value: 'nauczyciel' },
  { key: 'p', text: 'Pedagog szkolny', value: 'pedagog' },
  { key: 'd', text: 'Doradca zawodowy', value: 'doradca' },
];

const SubA_III_IV = () => {
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
          III. DANE SZKOŁY:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              label='Pełna nazwa szkoły'
              name='schoolName'
              icon='building outline'
              placeholder='Podaj pełną nazwę szkoły'
              iconPosition='left'
            />

            <div className='adress-wrapper'>
              <Header as='h4'>Adres szkoły</Header>
              <Segment>
                <Form.Input
                  className='input'
                  icon='user'
                  iconPosition='left'
                  placeholder='Podaj ulicę'
                  name='schoolStreetName'
                />

                <Form.Input
                  className='input'
                  // label='Adres szkoły (numer domu)'
                  icon='phone'
                  iconPosition='left'
                  placeholder='Podaj numer domu'
                  name='schoolStreetNr'
                />
                <Form.Input
                  className='input'
                  icon='zip'
                  iconPosition='left'
                  // label='Adres szkoły (kod pocztowy)'
                  placeholder='Podaj kod pocztowy w formacie XX-XXX'
                  name='schoolZip'
                />
                <Form.Input
                  className='input'
                  icon='zip'
                  iconPosition='left'
                  // label='Adres szkoły (miejscowość)'
                  placeholder='Podaj miejscowość'
                  name='schoolTown'
                />
                <div className='select-wrapper'>
                  <select
                    name='schoolVoyev'
                    onChange={(e) => handleOnChange(e)}
                  >
                    {options.map((o) => (
                      <option key={o.key} v alue={o.value}>
                        {o.text}
                      </option>
                    ))}
                  </select>
                </div>
              </Segment>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
      <Grid.Column>
        <Header className='sub-header' floated='left' as='h4'>
          IV. DANE OPIEKUNA DYDAKTYCZNEGO:
        </Header>
        <Form className='form'>
          <Form.Group grouped>
            <Form.Input
              className='input'
              icon='user'
              iconPosition='left'
              label='Imię doradcy'
              name='counselorFirstName'
              placeholder='Podaj imię doradcy'
            />
            <Form.Input
              icon='user'
              iconPosition='left'
              className='input'
              label='Nazwisko doradcy'
              name='counselorLastName'
              placeholder='Podaj nazwisko doradcy'
            />

            <div className='select-wrapper'>
              <Header className='select-header' as='h5'>
                Profil doradcy
              </Header>
              <select
                name='counselorProfile'
                onChange={(e) => handleOnChange(e)}
              >
                {optionsC.map((o) => (
                  <option key={o.key} v alue={o.value}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>
          </Form.Group>
        </Form>
      </Grid.Column>
    </SubALayout>
  );
};

export default SubA_III_IV;
