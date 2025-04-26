import { CUSTOMER_ROLE_NAME } from "../constant";

export const getAccessToken = () => {
    const token = localStorage.getItem('token');
    return token || null
}
export const isAdminSession = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.isAdmin || false
}

export const isCustomerSession = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.roles?.includes(CUSTOMER_ROLE_NAME) || false
}
export const getUserSession = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user || null
}