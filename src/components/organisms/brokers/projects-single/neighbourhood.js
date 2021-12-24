import React from 'react';
import { Row } from '../../../atoms';
import mapDummyImage from '../../../../assets/images/map_dummy_image.png';

const Neighbourhood = () => {
  return (
    <Row>
      <img src={mapDummyImage} alt='map' style={{ width: '100%' }} />
    </Row>
  );
};

export default Neighbourhood;
