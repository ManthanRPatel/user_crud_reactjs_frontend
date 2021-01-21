import React,{ useState , useEffect, Fragment } from 'react'
import {Table, Button } from 'react-bootstrap';
import axios from 'axios';
import AddEditUser from './AddEditUser';



function UserTable(props) {

    const [userData, setuserData] = useState([])
    const [isUserDataChanged, setisUserDataChanged] = useState(false);
    const [openModel, setopenModel] = useState(false);

    useEffect(() => {
        axios.get('/').then(res=>{
            setuserData( res.data.data )
        })
        return () => {
            setuserData([])
        }
    }, [])

    useEffect(() => {
        if(isUserDataChanged){
            axios.get('/').then(res=>{
                setuserData( res.data.data )
            })
            setopenModel(false);
            setisUserDataChanged(false);
        }
    }, [isUserDataChanged])

    const deleteUser = ( user_id ) => {
        if( window.confirm('Are You sure you want to delete it ?') ){
            axios.post('deleteUser', { user_id } ).then(res=>{
                let { status , message } = res.data
                if( status ){
                    setisUserDataChanged(true);
                }
            })
        }
    }

    const updateUser = (userdetails) =>{

    }

    return (
        <>
            <AddEditUser setisUserDataChanged={setisUserDataChanged} setopenModel={setopenModel} openModel={openModel}  />
            <Button onClick={()=> setopenModel(true)} style={{ margin:'0.5rem' }} variant="success" >Add User</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && userData.length > 0 && userData.map((ele,id)=>(
                        <Fragment key={ele.user_id} >
                            <tr>
                                <td>{ele.user_id}</td>
                                <td>{ele.user_name}</td>
                                <td>{ele.user_email}</td>
                                <td>{ele.user_phone_number}</td>
                                <td>
                                    <Button variant="info" onClick={()=> updateUser(ele) } >Edit</Button>
                                    <Button variant="danger" onClick={()=> deleteUser(ele.user_id) } >Delete</Button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UserTable
