import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please log in first.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default Dashboard;

