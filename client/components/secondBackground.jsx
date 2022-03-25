
import React from 'react';
import NewAccountForm from '../pages/new-account-form';
import Title from './title';

export default function SecondBackground(props) {

  return (
    <>
      <div className="container">
        <div className="new-account-column-title">
          <Title />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="blue-background">
            <div className="gray-background">
              <NewAccountForm />
            </div>
          </div>
        </div>
      </div>
    </>

  );

}
