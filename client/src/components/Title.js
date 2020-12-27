import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Title = ({ sub, content, }) => {
  return (
    <Header style={styles.main} textAlign='center' dividing size='medium'>
      <Header.Subheader style={styles.block}>{sub} <span style={{opacity: '0'}}>I</span> </Header.Subheader>
      <Header.Content style={styles.block}>{content}</Header.Content>
    </Header>
  );
};

Title.defaultProps = {
  sub: 'Jesteś tutaj: ',
};

Title.propTypes = {
  sub: PropTypes.string,
};


const styles = {
  main: {
    position: 'fixed',
   top: '2rem' ,
    left: '50%',
    transform:'translateX(-8rem)',
    zIndex: '99999',
  },
  block: {
    display: 'inline-block',
  },
};


export default Title;
