import { redirect, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { fetchToken } from "@shared/apis/interceptors";
import { LoginCredentials } from "@types/Login";
import { Txt } from "@contexts/texts.context";
import { useToast } from "@contexts/toast.context";
import {
  AuthorizationWrapper,
  CommercialContentWrapper,
  StyledForm,
  StyledButton,
  LoginContent,
} from "./login.styles";

export const loginLoader = async () => {
  if (localStorage.getItem("token")) {
    return redirect("/dashboard");
  }
  return null;
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const { addToast } = useToast();

  const submitLogin = async (loginPayload: LoginCredentials) => {
    try {
      await fetchToken(loginPayload);
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      addToast({ txtKey: error.data.message });
    }
  };

  return (
    <AuthorizationWrapper>
      <CommercialContentWrapper />
      <LoginContent>
        <Txt txtKey="login.welcomeBack" variant="h3" mb={6} />
        <Txt txtKey="login.loginTo" variant="h6" mb={6} />
        <StyledForm onSubmit={handleSubmit(submitLogin)}>
          <TextField
            label="Email"
            variant="outlined"
            {...register("email", { required: true })}
            error={!!errors.email}
            helperText={errors.email ? "Enter a valid email" : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            {...register("password", { required: true })}
            error={!!errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <StyledButton type="submit" variant="contained">
            <Txt txtKey="login.login" variant="button" />
          </StyledButton>
        </StyledForm>
      </LoginContent>
    </AuthorizationWrapper>
  );
};

export default Login;
