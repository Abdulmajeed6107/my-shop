// src/utils/auth.js  (or wherever you put it, just fix the import path)
export function getAdmin() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export function getAdminToken() {
    return localStorage.getItem("token");
}

export function isAdminLoggedIn() {
    return !!(getAdmin() && getAdminToken());
}

export function adminLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
}