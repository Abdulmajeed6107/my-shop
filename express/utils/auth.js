// src/utils/auth.js
export function getAdmin() {
    const admin = localStorage.getItem("admin");
    return admin ? JSON.parse(admin) : null;
}

export function getAdminToken() {
    return localStorage.getItem("adminToken");
}

export function isAdminLoggedIn() {
    return !!(getAdmin() && getAdminToken());
}

export function adminLogout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
}