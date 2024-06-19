import axios from "../api/axios";
import useAuth from "./useAuth";
import { useDispatch } from 'react-redux';
import { resetProducts } from '../features/productSlice.js';

// Inside your component or wherever you want to reset the state


// Dispatch the resetProducts action

const useLogout = () => {
    const dispatch = useDispatch();
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios.post('/logout', {
                withCredentials: true
            });

            dispatch(resetProducts());
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout