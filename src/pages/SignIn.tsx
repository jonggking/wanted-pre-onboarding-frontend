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
import * as Api from "../api/Api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../components/validate";

const theme = createTheme();

interface SignIn {
  email: string;
  password: string;
}

export default function SignIn() {
  const [signInData, setSignInData] = useState<SignIn>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const isValidEmail = validateEmail(signInData.email);
  const isValidPassword = validatePassword(signInData.password);
  const isSignIn = localStorage.getItem("access_token") !== null;

  useEffect(() => {
    if (isSignIn) {
      navigate("/todo");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!isValidEmail || !isValidPassword) {
        throw Error("validation err");
      }
      const res = await Api.post("auth/signin", signInData);
      if (res.status === 200) {
        const token = res.data.access_token;
        localStorage.setItem("access_token", token);
        navigate("/todo");
      }
    } catch (err) {
      alert("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요");
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
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) =>
                setSignInData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) =>
                setSignInData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <Button
              data-testid="signin-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signup" variant="body2">
                  회원가입하러가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
