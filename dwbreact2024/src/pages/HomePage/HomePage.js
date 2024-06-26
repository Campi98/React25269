import React from 'react';
import HeroHeader from '../../Components/GeneralComponents/HeroHeader'
import ContactSection from '../../Components/GeneralComponents/ContactSection';
import MiddleSection from '../../Components/GeneralComponents/MiddleSection';
import MainNavbar from '../../Components/GeneralComponents/MainNavbar';

function HomePage() {
  return (
  <>
    <MainNavbar></MainNavbar>
    <HeroHeader></HeroHeader>
    <MiddleSection></MiddleSection>
    <ContactSection></ContactSection>
  </>
  )
}

export default HomePage
