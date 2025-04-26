import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Spinner, Modal } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getDashboardStats, getRevenueData, getUserRegistrationData, getOrderData } from '../../services/dashboard.service';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
// Import Excel export libraries
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ user }) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        recentOrders: []
    });
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [revenuePeriod, setRevenuePeriod] = useState('month');
    const [userPeriod, setUserPeriod] = useState('month');
    const [orderPeriod, setOrderPeriod] = useState('month');
    const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });
    const [userData, setUserData] = useState({ labels: [], datasets: [] });
    const [orderData, setOrderData] = useState({ labels: [], datasets: [] });
    
    // Add state for export loading
    const [exportLoading, setExportLoading] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        fetchRevenueData(revenuePeriod);
    }, [revenuePeriod]);

    useEffect(() => {
        fetchUserData(userPeriod);
    }, [userPeriod]);

    useEffect(() => {
        fetchOrderData(orderPeriod);
    }, [orderPeriod]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const data = await getDashboardStats();
            setStats(data);

            // Fetch initial chart data
            await Promise.all([
                fetchRevenueData(revenuePeriod),
                fetchUserData(userPeriod),
                fetchOrderData(orderPeriod)
            ]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevenueData = async (period) => {
        try {
            const data = await getRevenueData(period);
            setRevenueData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data.values,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching revenue data:', error);
        }
    };

    const fetchUserData = async (period) => {
        try {
            const data = await getUserRegistrationData(period);
            setUserData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'New Users',
                        data: data.values,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        tension: 0.1
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchOrderData = async (period) => {
        try {
            const data = await getOrderData(period);
            setOrderData({
                labels: data.labels,
                datasets: [
                    {
                        label: 'Orders',
                        data: data.values,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension: 0.1
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart Data',
            },
        },
    };

    if (loading) {
        return (
            <Container fluid className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    // Add function to handle opening the order modal
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowOrderModal(true);
    };

    // Function to export revenue data to Excel
    const exportRevenueToExcel = async () => {
        try {
            setExportLoading(true);
            
            // Get the data from the current period
            const data = await getRevenueData(revenuePeriod);
            
            // Create worksheet data
            const worksheetData = [
                ['Period', 'Revenue Amount'],
                ...data.labels.map((label, index) => [
                    label,
                    data.values[index]
                ])
            ];
            
            // Create a worksheet
            const ws = XLSX.utils.aoa_to_sheet(worksheetData);
            
            // Set column widths
            const wscols = [
                { wch: 20 }, // Period column width
                { wch: 15 }  // Revenue column width
            ];
            ws['!cols'] = wscols;
            
            // Create a workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Revenue Data');
            
            // Generate Excel file
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            
            // Save the file
            const fileName = `Revenue_${revenuePeriod}_${new Date().toISOString().split('T')[0]}.xlsx`;
            saveAs(fileData, fileName);
        } catch (error) {
            console.error('Error exporting revenue data:', error);
            alert('Failed to export revenue data. Please try again.');
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h4>Admin Dashboard</h4>
                        </Card.Header>
                        <Card.Body>
                            <h5>Welcome, {user?.fullName || 'Admin'}</h5>
                            <p>This is your admin control panel. You can manage your site from here.</p>

                            <Row className="mt-4">
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-primary text-white">
                                        <Card.Body>
                                            <h3>{stats.totalUsers}</h3>
                                            <p>Total Users</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-success text-white">
                                        <Card.Body>
                                            <h3>{stats.totalProducts}</h3>
                                            <p>Total Products</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-info text-white">
                                        <Card.Body>
                                            <h3>{stats.totalOrders}</h3>
                                            <p>Total Orders</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Revenue Chart with Export Button */}
                            <Card className="mb-4">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Revenue Overview</h5>
                                    <div className="d-flex align-items-center">
                                        <Form.Select
                                            style={{ width: '150px', marginRight: '10px' }}
                                            value={revenuePeriod}
                                            onChange={(e) => setRevenuePeriod(e.target.value)}
                                        >
                                            <option value="day">Daily</option>
                                            <option value="month">Monthly</option>
                                            <option value="year">Yearly</option>
                                        </Form.Select>
                                        <Button 
                                            variant="success" 
                                            size="sm" 
                                            onClick={exportRevenueToExcel}
                                            disabled={exportLoading}
                                        >
                                            {exportLoading ? (
                                                <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                    <span className="ms-1">Exporting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-file-earmark-excel me-1"></i>
                                                    Export Excel
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Line options={chartOptions} data={revenueData} />
                                </Card.Body>
                            </Card>

                            <Row>
                                {/* User Registration Chart */}
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Header className="d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">User Registrations</h5>
                                            <Form.Select
                                                style={{ width: '150px' }}
                                                value={userPeriod}
                                                onChange={(e) => setUserPeriod(e.target.value)}
                                            >
                                                <option value="day">Daily</option>
                                                <option value="month">Monthly</option>
                                                <option value="year">Yearly</option>
                                            </Form.Select>
                                        </Card.Header>
                                        <Card.Body>
                                            <Line options={chartOptions} data={userData} />
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Order Chart */}
                                <Col md={6}>
                                    <Card className="mb-4">
                                        <Card.Header className="d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Order Statistics</h5>
                                            <Form.Select
                                                style={{ width: '150px' }}
                                                value={orderPeriod}
                                                onChange={(e) => setOrderPeriod(e.target.value)}
                                            >
                                                <option value="day">Daily</option>
                                                <option value="month">Monthly</option>
                                                <option value="year">Yearly</option>
                                            </Form.Select>
                                        </Card.Header>
                                        <Card.Body>
                                            <Line options={chartOptions} data={orderData} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} size="lg">
                                <Modal.Header closeButton>
                                    <Modal.Title>Order Details #{selectedOrder?.id}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {selectedOrder && (
                                        <>
                                            <Row>
                                                <Col md={6}>
                                                    <p><strong>Customer:</strong> {selectedOrder.user?.fullName || 'N/A'}</p>
                                                    <p><strong>Email:</strong> {selectedOrder.user?.email || 'N/A'}</p>
                                                    <p><strong>Phone:</strong> {selectedOrder.user?.phone || 'N/A'}</p>
                                                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.created_at)}</p>
                                                </Col>
                                                <Col md={6}>
                                                    <p><strong>Status:</strong>
                                                        <span className={`badge bg-${selectedOrder.status === 'completed' ? 'success' :
                                                                selectedOrder.status === 'pending' ? 'warning' : 'secondary'
                                                            } ms-2`}>
                                                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                                        </span>
                                                    </p>
                                                    <p><strong>Total Amount:</strong> {formatCurrency(selectedOrder.price)}</p>
                                                </Col>
                                            </Row>

                                            <h5 className="mt-4">Order Items</h5>
                                            {selectedOrder.products && selectedOrder.products.length > 0 ? (
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Quantity</th>
                                                            <th>Price</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedOrder.products.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item?.name || 'Product'}</td>
                                                                <td>{item?.OrderProduct?.quantity}</td>
                                                                <td>{formatCurrency(item?.OrderProduct?.price)}</td>
                                                                <td>{formatCurrency(item?.OrderProduct?.price * item?.OrderProduct?.quantity)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            ) : (
                                                <p>No items found for this order.</p>
                                            )}
                                        </>
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <h5 className="mt-4">Recent Orders</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                        stats.recentOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td>#{order.id}</td>
                                                <td>{order.user?.fullName || 'N/A'}</td>
                                                <td>{formatDate(order.created_at)}</td>
                                                <td>{formatCurrency(order.price)}</td>
                                                <td>
                                                    <span className={`badge bg-${order.status === 'completed' ? 'success' :
                                                            order.status === 'pending' ? 'warning' : 'secondary'
                                                        }`}>
                                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Button
                                                        size="sm"
                                                        variant="outline-primary"
                                                        onClick={() => handleViewOrder(order)}
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center">No recent orders</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <div className="text-end mt-3">
                                <Link to="/admin/orders">
                                    <Button variant="primary">View All Orders</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;