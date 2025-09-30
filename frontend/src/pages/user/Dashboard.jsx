import React from 'react';
import Banner from './Partials/Banner';
import { Container } from 'react-bootstrap';
import Category from './Partials/Category';
import AboutUs from './Partials/AboutUs';
import Describe from './Partials/Describe';
import ProductsHot from './Partials/ProductsHot';

const Dashboard = () => {
    return (
        <Container fluid style={{backgroundColor: '#1a1a1a'}}>
            <Banner />
            {/* <Describe/> */}
            <Category/>
            <ProductsHot/>
            <AboutUs/>
        </Container>
    )
}

export default Dashboard;