import {useEffect, useState} from "react";
import users from "../mock/users";

const useFindUser = (userId) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = users.find(u => u._id === userId);
        setUser(user);

        return () => setUser(null);
    }, [userId])

    return user;
}

export default useFindUser;