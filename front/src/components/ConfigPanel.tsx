import React from 'react';
import { Form } from 'semantic-ui-react';
import MapModel, { PlaceType } from '../models/map';

type Props = {
    map: MapModel,
};

const ConfigPanel = ({ map }: Props) => {
    map.setPlacePreference(PlaceType.Cafe, 10);

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
