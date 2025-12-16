import { useState, useContext } from "react";
import { loginUser, registerUser } from "../../services/auth";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

import {
  Overlay,
  Modal,
  Section,
  Title,
  Input,
  Button,
  Text,
  BrandWrapper,
  BrandSubtitle,
  BrandTitle,
} from "../../styles/AuthModal";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });
      auth?.login(res.data.token, res.data.user);
      onClose();
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        name,
        email: regEmail,
        password: regPassword,
      });
      alert("Registration successful! You can login now.");
      setName("");
      setRegEmail("");
      setRegPassword("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <BrandWrapper>
    <BrandTitle>Budget Flow</BrandTitle>
    <BrandSubtitle>
      Smart expense tracking for everyday life
    </BrandSubtitle>
  </BrandWrapper>
        {/* LOGIN */}
        <Section>
          
          <Title>Login</Title>
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <Button type="submit">Login</Button>
          </form>
          <Text>Access your dashboard and expenses</Text>
        </Section>

        {/* REGISTER */}
        <Section>
          <Title>Sign Up</Title>
          <form onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="register">
              Register
            </Button>
          </form>
          <Text>Create a new account</Text>
        </Section>
      </Modal>
    </Overlay>
  );
};

export default AuthModal;
