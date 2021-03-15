import {withRouter} from 'react-router-dom';
import Row from '../row';
import {
    StarshipDetails,
    StarshipList,
  } from "../sw-components";

const StarshipsPage = ({match, history}) => {

    const { id } = match.params;


        return (
            <Row left = {  <StarshipDetails itemId={id} />}
            right = {<StarshipList onItemSelected={(id) => {
                history.push(id);
            }} />}
            />
            
        )

}

export default withRouter(StarshipsPage)