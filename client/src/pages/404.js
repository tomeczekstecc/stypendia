import { Button } from 'semantic-ui-react';
import { Wrapper } from './styles/404.styles';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <Wrapper>
      <h2>UPS!</h2>
      <h3>Nie znaleziono strony....</h3>
      <Link to='/login'>
      <Button className = 'btn' primary size='big'>
        Wróć na stronę główną
      </Button></Link>
    </Wrapper>
  );
};

export default Page404;
