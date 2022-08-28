import React, {useEffect, useState} from 'react'
import {useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "../../query/user.query";

const Home = () => {
    const {data, loading, error, refetch} = useQuery(GET_USER)
    const [user, setUsers] = useState({})

    useEffect(() => {

        if (!loading) {
            console.log(error)
            console.log(data.user.roles)
            setUsers(data.user)
        }
    }, [data])

    return (
        <div>
            <h1>Home</h1>
            <div>
                <h2>EMAIL:  {user.email}</h2>
                <h2>id:  {user.id}</h2>
                <h2>isActive: {user.isActive?<span>true</span>:<span>false</span>} </h2>
            </div>
        </div>
    )
}

export default Home