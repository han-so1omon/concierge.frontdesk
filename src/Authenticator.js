import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useField, Formik, Field, Form, ErrorMessage } from 'formik'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import * as Yup from 'yup'

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

var endpointUrl = 'http://192.168.1.23:8000'

export const Authenticator = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['session'])
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        getUserInfo()
    }, [])

    async function onSignIn(values, setSubmitting) {
        try {
            let endpoint = endpointUrl + '/signin'
            let response = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })
            let resp = await response.json()
            if (resp.Code == 200) {
                setUserInfo({email: resp.Response.Email, username: resp.Response.Username})
            }
        } catch(e) {
            console.log(e)
        }
        setSubmitting(false)
    }

    async function onSignUp(values, setSubmitting) {
        try {
            let endpoint = endpointUrl + '/signup'
            let response = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    email: values.email,
                    username: values.username,
                    password: values.password
                })
            })
            let resp = await response.json()
        } catch(e) {
            console.log(e)
        }
        setSubmitting(false)
    }

    async function onSignOut() {
        try {
            let endpoint = endpointUrl + '/signout'
            let response = await fetch(endpoint, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({
                    email: userInfo.email,
                })
            })
            let resp = await response.json()
            if (resp.Code == 200) {
                setUserInfo(undefined)
            }
        } catch(e) {
            console.log(e)
        }
    }

    async function getUserInfo() {
        try {
            let endpoint = new URL(endpointUrl + '/userInfo')
            let response = await fetch(endpoint, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            let resp = await response.json()
            if (resp.Response) {
                setUserInfo({email: resp.Response.Email, username: resp.Response.Username})
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            {userInfo && <h1>hi there {userInfo.username}</h1>}
            <Tabs>
                <TabList>
                    <Tab>Sign In</Tab>
                    <Tab>Sign Up</Tab>
                    <Tab>Sign Out</Tab>
                </TabList>
                <TabPanel>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string()
                                    .required('Required'),
                                password: Yup.string()
                                    .required('Required')
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => onSignIn(values, setSubmitting)}
                    >
                        <Form>
                            <MyTextInput
                                label='Email'
                                name='email'
                                type='email'
                                placeholder='jayn@email.go'
                            />
                            <MyTextInput
                                label='Password'
                                name='password'
                                type='password'
                            />
                            <button type='submit'>Submit</button>
                        </Form>
                    </Formik>
                </TabPanel>
                <TabPanel>
                     <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={
                            Yup.object({
                                username: Yup.string()
                                    .max(21, 'Must be 21 characters or less')
                                    .required('Required'),
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Required'),
                                password: Yup.string()
                                    .required('Required')
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => onSignUp(values, setSubmitting)}
                    >
                        <Form>
                            <MyTextInput
                                label='Username'
                                name='username'
                                type='text'
                                placeholder='jayn'
                            />
                            <MyTextInput
                                label='Email'
                                name='email'
                                type='email'
                                placeholder='jayn@email.go'
                            />
                            <MyTextInput
                                label='Password'
                                name='password'
                                type='password'
                            />
                            <button type='submit'>Submit</button>
                        </Form>
                    </Formik>
                </TabPanel>
                <TabPanel>
                    <button onClick={onSignOut}>Do it</button>
                </TabPanel>
            </Tabs>
        </div>
    )
}
