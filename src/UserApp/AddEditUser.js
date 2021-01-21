import React, { useState, useEffect, Fragment } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';


const initialFormState = {
    user_email: '',
    user_name: '',
    action_type: 'add',
    user_id: '',
    use_phone_number : '',
}

function AddEditUser(props) {

    const { openModel , setopenModel } = props
    const [formActionType, setformActionType] = useState('add');
    const [userForm, setUserForm] = useState(initialFormState)


    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validationSchema = yup.object({
        user_name: yup.string().required('* name is required.'),
        user_email: yup.string().email("*Must be a valid email address").required('*email is required.'),
        user_phone_number: yup.string().matches(phoneRegExp, 'phone number is not valid').required("*phone number is required"),
    });


    const handleSubmit = (values, { setSubmitting, resetForm }) => {

        let userData = {...values}
        axios.post('addEditUser',userData).then(res=>{
            let { status , message } = res.data

            if(status){
                props.setisUserDataChanged(true);
            }
        })
        .catch(err=>{
            console.log("err ",err)
        })
    }


    return (
        <>
            <Modal
                show={props.openModel}
                onHide={() => props.setopenModel(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Formik
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    // validateOnChange={false}
                    // validateOnBlur={false}
                    initialValues={formActionType === 'edit' ? userForm : initialFormState}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors, validateForm, getFieldProps, dirty }) => (
                        <Fragment>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {formActionType === 'edit' ? 'Edit User' : 'Add User'}
                                </Modal.Title>
                            </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={handleSubmit} >
                                <Form.Group className="py-2" controlId="user_name">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        name="user_name"
                                        {...getFieldProps('user_name')}
                                        isInvalid={touched.user_name && errors.user_name}
                                        isValid={touched.user_name && !errors.user_name}
                                    />
                                    <div className="form_error_txt" ><ErrorMessage name="user_name" /></div>
                                </Form.Group>

                                <Form.Group className="py-2" controlId="user_email">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="user_email"
                                        {...getFieldProps('user_email')}
                                        isInvalid={touched.user_email && errors.user_email}
                                        isValid={touched.user_email && !errors.user_email}
                                    />
                                    <div className="form_error_txt" ><ErrorMessage name="user_email" /></div>
                                </Form.Group>

                                <Form.Group className="py-2" controlId="user_phone_number">
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone Number"
                                        name="user_phone_number"
                                        {...getFieldProps('user_phone_number')}
                                        isInvalid={touched.user_phone_number && errors.user_phone_number}
                                        isValid={touched.user_phone_number && !errors.user_phone_number}
                                    />
                                    <div className="form_error_txt" ><ErrorMessage name="user_phone_number" /></div>
                                </Form.Group>
                            </Form>


                        </Modal.Body>
                        <Modal.Footer>
                            <Button 
                                variant="primary" 
                                disabled={!isValid}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                 {formActionType === 'edit' ? 'Edit User' : 'Add User'}</Button>
                            <Button variant="secondary" onClick={()=>props.setopenModel(false)}>Close</Button>
                        </Modal.Footer>
                    </Fragment>
                 )}
                </Formik>
            </Modal>
        </>
    )
}

export default AddEditUser
