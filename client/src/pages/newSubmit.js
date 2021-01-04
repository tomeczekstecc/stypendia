import React, { useState } from 'react';
import { Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import SubA_I_II from '../components/subA_I_II';
import Title from '../components/Title';
import { Wrapper } from './styles/submit.styles';



const NewSubmit = () => {

const [part, setPart] = useState(1)



switch (part) {
  case 1:
return <SubA_I_II/>
  default:
    break;
}

};


export default NewSubmit;
