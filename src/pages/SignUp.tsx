import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../components/validate";
import * as Api from "../api/Api";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const [signUpData, setSignUpData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const isValidEmail = validateEmail(signUpData.email);
  const isValidPassword = validatePassword(signUpData.password);
  const isSignIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    if (isSignIn) {
      navigate("/todo");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await Api.post("auth/signup", signUpData);
      if (res.status === 201) {
        alert("회원가입에 성공하셨습니다.");
        navigate("/signin");
      }
    } catch (err) {
      alert("회원가입도중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  data-testid="email-input"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  error={!isValidEmail}
                  helperText={!isValidEmail && "이메일 형식에 맞지 않습니다."}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  data-testid="password-input"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setSignUpData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  error={!isValidPassword}
                  helperText={!isValidPassword && "8글자 이상"}
                />
              </Grid>
            </Grid>
            <Button
              data-testid="signup-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValidEmail || !isValidPassword}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signin" variant="body2">
                  로그인하러가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
