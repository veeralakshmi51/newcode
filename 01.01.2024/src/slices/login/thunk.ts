import axios from 'axios';
import { endLoading, saveLoginData, saveOrganization, saveUserDetails, saveUserType, startLoading } from './reducer'

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const handleLogin = async (dispatch: any, body: any, navigate: (p: string) => void) => {
    dispatch(startLoading())
    try {
        const response = await axios.post(`${baseURL}/user/signin`, body);
        console.log("Login response:", response);
        if (response.data.message.code === successCode) {
            const { jwt, session, userType,organization} = response.data.data;
            dispatch(saveLoginData(jwt.jwtToken));
            dispatch(saveUserType(userType[0]));
            dispatch(saveUserDetails(session.username));
            dispatch(saveOrganization(organization));     
                   navigate('/secret-key');
        } else {
            alert("Login failed: " + response.data.message.description);
            dispatch(endLoading())
        }
    } catch (error) {
        console.error("Error during login:", error);
        dispatch(endLoading())
    }
};

export const handleLogout = async(body: any, navigate: (p: string) => void) => {
    
    try {
        const response = await axios.post(`${baseURL}/user/signout`,body);
        console.log("Logout :" , response);

        if(response.data.message.code === successCode) {
            localStorage.clear()
            navigate('/login')
        }else {
            alert("Login failed: " + response.data.message.description);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}