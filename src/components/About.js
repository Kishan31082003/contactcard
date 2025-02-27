import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export const About = () => {
  return (
    <div className="about">
        <br></br>
        <br></br>
        <br></br>
      <h1>About the Contact Card App</h1>
      <p>This app allows you to create personal contact cards that only you can see, while admins can view all contacts.</p>
      <p>
        <Link to="/" className="go-home-link">SEE CONTACTS</Link>
        
      </p>
      <img className= 'image' src='https://tse1.mm.bing.net/th?id=OIP.BPgtwE3hFlFno3_JweXMWgHaE8&pid=Api&P=0&h=180'></img>
    </div>
  );
};
