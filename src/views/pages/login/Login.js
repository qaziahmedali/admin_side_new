import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [result, setResult] = useState('')
  const SigninUser = async (e) => {
    e.preventDefault()

    let { email, password } = user
    const postedData = {
      email,
      password,
    }
    await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postedData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.message === 'success') {
          setUser({
            email: '',
            password: '',
          })
          navigate('/dashboard')
        }
        setResult(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  let name, value
  const postData = (event) => {
    name = event.target.name
    value = event.target.value
    setUser({ ...user, [name]: value })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={user.email}
                        onChange={postData}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={user.password}
                        onChange={postData}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={SigninUser}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Once someone has signed up for a service, they can access their account by
                      logging in.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
            {result?.message == 'success' ? (
              <CToast
                autohide={false}
                visible={true}
                color="primary"
                className="text-white align-items-center"
              >
                <div className="d-flex">
                  <CToastBody>Login successfully</CToastBody>
                  <CToastClose className="me-2 m-auto" white />
                </div>
              </CToast>
            ) : (
              ''
            )}
            {result?.message == 'Username or password is wrong!' ? (
              <CAlert color="warning" dismissible>
                <strong>Email and Password is wrong</strong>
              </CAlert>
            ) : (
              ''
            )}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
