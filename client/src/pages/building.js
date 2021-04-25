import { Button } from 'semantic-ui-react';
import { Wrapper } from './styles/404.styles';
import { Link } from 'react-router-dom';

const Building = () => {
  return (
    <Wrapper>
      <h2>Przepraszamy</h2>
      <h3>Strona jeszcze w budowie... Zapraszamy już niedługo :)</h3>
      <Link to='/login'>
      <Button className = 'btn' primary size='big'>
        Wróć na stronę główną
      </Button></Link>
    </Wrapper>
  );
};

export default Building;
