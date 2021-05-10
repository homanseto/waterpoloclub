import React from 'react';
import Carousels from './Carousels/Carousels';
import Introduction from './Introduction/Introduction';
import CallToAction from './CallToAction/CallToAction';
import LatestNews from './LatestNews/LatestNews';
import { carouselsLists } from '../../container/data';

const HomePage = (props) => {
  const { carouselsLists } = props;

  return (
    <div>
      <Carousels carouselsLists={carouselsLists} />
      <Introduction />
      <CallToAction />
      <LatestNews />
    </div>
  );
};

export default HomePage;
