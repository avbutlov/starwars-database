import {withRouter} from 'react-router-dom';
import Row from '../row';
import {
    PlanetDetails,
    PlanetList,
  } from "../sw-components";

const PlanetsPage = ({match, history}) => {

    const { id } = match.params;


        return (
            <Row left = {  <PlanetDetails itemId={id} />}
            right = {<PlanetList onItemSelected={(id) => {
                history.push(id);
            }} />}
            />
            
        )

}

export default withRouter(PlanetsPage)