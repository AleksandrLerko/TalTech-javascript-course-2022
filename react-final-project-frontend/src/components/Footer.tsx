import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () =>
    <footer className="border-top footer text-muted">
        <div className="container">
            &copy; 2022 - Online shopping system - <Link to="/">Home page</Link>
        </div>
    </footer>;

export default Footer;