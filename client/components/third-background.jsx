import React from 'react';
import MainMenu from '../pages/main-menu';
import Title from './title';

export default function ThirdBackground(props) {

  return (
   <>
   <div className="container">
    <div className="new-account-column-title">
      <Title />
    </div>
   </div>

  <div className="container">
        <div className="row-reverse blue-background-only">
      <MainMenu />
    </div>
  </div>

   </>
  );
}
