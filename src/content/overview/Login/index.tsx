// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Box, TextField, Button, Typography } from '@mui/material';
// import { useUserContext } from 'src/content/applications/create-user/UserContext'; // Adjust import path as needed

// const Login = () => {
//   const { getUser } = useUserContext();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     const user = getUser(username); // Get user from context
//     if (user && user.password === password) {
//       localStorage.setItem('auth', 'true');
//       localStorage.setItem('role', user.role);
//       localStorage.setItem('username', user.username);

//       if (user.role === 'admin') {
//         navigate('/dashboards/Admin');
//       } else if (user.role === 'user') {
//         navigate('/dashboards/User');
//       }
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 2
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <img height={100} src="/static/logo/tms.svg" />
//       </div>
//       <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Login
//           </Button>
//         </form>
//         <Box mt={2}>
//           <Typography variant="body2">
//             Don't have an account?{' '}
//             <Link to="/signup" color="primary">
//               <Typography component="span" color="primary">
//                 Sign Up
//               </Typography>
//             </Link>
//           </Typography>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Box, TextField, Button, Typography } from '@mui/material';
// import axios from 'axios';

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [step, setStep] = useState('request'); // 'request' or 'verify'
//   const navigate = useNavigate();

//   const handleRequestOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/send-otp', { phoneNumber });
//       console.log('OTP request response:', response);
//       setStep('verify');
//     } catch (err) {
//       console.error('OTP request error:', err);
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/verify-otp', { phoneNumber, otp });
//       console.log('OTP verify response:', response);
//       const user = response.data;
//       localStorage.setItem('auth', 'true');
//       localStorage.setItem('role', user.role);
//       localStorage.setItem('username', user.username);

//       if (user.role === 'admin') {
//         navigate('/dashboards/Admin');
//       } else if (user.role === 'user') {
//         navigate('/dashboards/User');
//       }
//     } catch (err) {
//       console.error('OTP verify error:', err);
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 2
//       }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <img height={100} src="/static/logo/tms.svg" />
//       </div>
//       <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Login
//         </Typography>
//         {step === 'request' ? (
//           <form onSubmit={handleRequestOtp}>
//             <TextField
//               label="Phone Number"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Request OTP
//             </Button>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp}>
//             <TextField
//               label="OTP"
//               variant="outlined"
//               margin="normal"
//               fullWidth
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Verify OTP
//             </Button>
//           </form>
//         )}
//         <Box mt={2}>
//           <Typography variant="body2">
//             Don't have an account?{' '}
//             <Link to="/signup" color="primary">
//               <Typography component="span" color="primary">
//                 Sign Up
//               </Typography>
//             </Link>
//           </Typography>
//         </Box>                                                                                                                                          
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";

// interface LoginProps {
//   onLogin: (userRole: string) => void;
// }

const Login: React.FC = () => {
  const [initialPhone, setInitialPhone] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: initialPhone,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/v2/api/transport/users/get-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(values);
        const data = await response.json();
        if (data.token) {
          sessionStorage.setItem("token", data.token);
          navigate("/otp-verification");
        } else {
          alert(data.error);
        }
        console.log(data);
        if (response.ok) {
          setInitialPhone(data.phone);
        } else {
          console.error("Failed to fetch initial phone number");
        }
      } catch (error) {
        console.error("Error fetching initial phone number:", error);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 6,
            width: "100%",
            borderRadius: 4,
            backgroundColor: "#",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/static/logo/tms.svg"
              alt="Logo"
              style={{
                width: "180px",
                marginTop: "60px",
                marginBottom: "50px",
              }}
            />
            <Typography
              component="h1"
              variant="h6"
              sx={{ fontWeight: 600, fontSize: "1.5rem", marginTop: -8 }}
            >              
            </Typography>
          </Box>
          <br />
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle1"
                align="left"
                gutterBottom
                sx={{ fontSize: "0.9rem", textAlign: "left", color: "grey" }}
              >
                <b>Enter Your phone number</b>
              </Typography>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                size="small"
                placeholder="Your phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="dense"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "grey",
                    },
                    "&:hover fieldset": {
                      borderColor: "skyblue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "skyblue",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "skyblue",
                    },
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 3, textTransform: "none" }}
            >
              Get OTP
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
