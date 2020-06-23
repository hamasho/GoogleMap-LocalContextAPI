import React from 'react';
import { Form } from 'semantic-ui-react';
import { useGlobalState } from '../models/store';
import { PlaceType } from '../models/map';

const ConfigPanel = () => {
    const [state, dispatch] = useGlobalState();
    if ( ! state.ready ) {
        return <div>LOADING...</div>;
    }

    setTimeout(() => dispatch({ zoom: 5 }), 2000);

    state.map.setPlacePreference(PlaceType.Cafe, 10);

    return (
        <Form>
            <Form.Group grouped>
                <Form.Field
                    label='Restaurants'
                    control='input'
                    type='checkbox'
                />
            </Form.Group>
        </Form>
    );
};

export default ConfigPanel;
