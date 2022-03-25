import React from 'react';
import MainMenu from '../pages/main-menu';
import Title from './title';

export default function ThirdBackground(props) {
  console.log('this is main third background');

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
