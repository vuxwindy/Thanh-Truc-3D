import React from 'react';
import Banner from './Partials/Banner';
import { Container } from 'react-bootstrap';
import Category from './Partials/Category';
import AboutUs from './Partials/AboutUs';

const Dashboard = () => {
    return (
        <Container fluid>
            <Banner />
            <Category/>
            <AboutUs/>
        </Container>
    )
}

export default Dashboard;