import React from 'react';
const logo = 'images/logo.jpg';

export default function Logo(props) {

  return (
    <img className={props.className} src={logo} />
  );

}
