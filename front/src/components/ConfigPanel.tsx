import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useGlobalState } from '../models/store';
import actions from '../models/actions';
import { PlaceType } from '../models/map';

import './ConfigPanel.css';

const ConfigPanel = () => {
    const [state, dispatch] = useGlobalState();

    if ( ! state.ready ) {
        return <div>LOADING...</div>;
    }

    const handleWeightChange = (pt: PlaceType, e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            action: actions.CHANGE_WEIGHT,
            payload: {
                placeType: pt,
                weight: parseInt(e.target.value, 10),
            }
        })
    };

    const gridRows = [];
    let gridColumns = [];
    const columns = 3;
    const placeTypes = Object.values(PlaceType);

    for (let i = 0; i < placeTypes.length; i++) {
        const pt = placeTypes[i];
        const weight = state.typeWeights[pt];
        gridColumns.push(
            <Grid.Column width={5} key={i}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <label>{pt}</label>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <input type="range" min={0} max={5} value={weight}
                                onChange={(e) => handleWeightChange(pt, e)} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        )

        if (gridColumns.length % columns === 0) {
            gridRows.push(
                <Grid.Row key={i}>
                    {gridColumns}
                </Grid.Row>
            );
            gridColumns = [];
        }
    }
    if (gridColumns.length > 0) {
        gridRows.push(
            <Grid.Row key={100}>
                {gridColumns}
            </Grid.Row>
        );
    }

    return (
        <div className="main-config">
            <Grid centered>
                {gridRows}
            </Grid>
        </div>
    );
};

export default ConfigPanel;
