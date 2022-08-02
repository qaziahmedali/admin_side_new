import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
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
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  })
  const [result, setResult] = useState('')
  const CreateAccount = async (e) => {
    e.preventDefault()
    let { name, email, password, confirmPassword, phone } = user
    const postedData = {
      name,
      email,
      password,
      role: 'admin',
      phone,
    }
    if (password === confirmPassword) {
      await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postedData),
      })
        .then((res) => res.json())
        .then((res) => {
          setResult(res)
          toast('data Stored successfully')
          console.log(toast)
          if (res.success === true) {
            setUser({
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              phone: '',
            })
            navigate('/login')
          }
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert('confirm password are not matched')
    }
  }
  console.log('....', result)
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="name"
                      placeholder="Username"
                      autoComplete="name"
                      value={user.name}
                      onChange={postData}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={user.email}
                      onChange={postData}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="phone"
                      type="number"
                      placeholder="Phone"
                      autoComplete="phone"
                      value={user.phone}
                      onChange={postData}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={user.password}
                      onChange={postData}
                    />
                    {/* {
                      user?.password.length > 4 
                    } */}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={user.confirmPassword}
                      onChange={postData}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={CreateAccount}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>

              {result?.message == 'This email is already taken.' ? (
                <CAlert color="warning" dismissible>
                  <strong>{result?.message}</strong>
                </CAlert>
              ) : (
                ''
              )}
              {result?.message == '"email" must be a valid email' ? (
                <CAlert color="warning" dismissible>
                  <strong>{result?.message}</strong>
                </CAlert>
              ) : (
                ''
              )}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
