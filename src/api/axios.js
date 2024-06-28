import axios from 'axios';
const BASE_URL = ` https://5500-andrewmta-seedleybacken-80dth4pna3v.ws-us114.gitpod.io`;
//const BASE_URL = :3500/';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

