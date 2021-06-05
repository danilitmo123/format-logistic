import React from 'react';

import MainPage from "../MainPage";
import AdvantagesPage from "../AdvantagesPage";
import DeliveryPage from "../DeliveryPage";
import HowWeWorkPage from "../HowWeWorkPage";
import MoreAdvantages from "../MoreAdvantagesPage";
import Contacts from "../Contacts"
import Footer from '../Footer'

const InfoPage = () => {
  return (
      <div>
        <MainPage/>
        <AdvantagesPage/>
        <DeliveryPage/>
        <HowWeWorkPage/>
        <MoreAdvantages/>
        <Contacts/>
        <Footer/>
      </div>
  );
};

export default InfoPage;