import React,{ useState , useEffect, Fragment } from 'react'
import {Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UserTable from './UserTable';
import './app.css';

axios.defaults.baseURL = 'http://localhost:5000'

function MainApp() {

    


    return (
        <div>
            <h1 style={{ margin:'1rem' }} >User Application</h1>
            <UserTable />
        </div>
    )
}

export default MainApp
