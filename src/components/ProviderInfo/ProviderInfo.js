import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProviderInfo () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        //get a token from sessionstorage
        const token = sessionStorage.getItem("token");

        if (token) {
            //tell the app user is logged in
            setIsLoggedIn(true);
        }

        const getCurrentUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:8081/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }

        getCurrentUser();

    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setUserData(null);
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return (
            <main> 
                Sorry, you are not logged in.
                <Link to="/login"> Log In</Link>
            </main>
        )
    }

    if (!userData) {
        return (
            <main> 
                loading.....
            </main>
        )
    }

    return (

        
        <main className="dashboard">
           
            <h1> Dashboard </h1>
            
            <p>
                Welcome back, {userData.username}
            </p>

            <p>Your email: {userData.email}</p>

            <button onClick={handleLogout}>
                Log out
            </button>
           

        </main>
    )
}

export default ProviderInfo;