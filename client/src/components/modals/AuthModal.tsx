import { useState, useContext } from "react";
import { loginUser, registerUser } from "../../services/auth";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";

import {
  Overlay,
  Modal,
  ImageSection,
  FormSection,
  BrandTitle,
  BrandSubtitle,
  Title,
  Input,
  Button,
  SwitchText,
  CloseButton,
} from "../../styles/AuthModal";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({ email, password });
        auth?.login(res.data.token, res.data.user);
        onClose();
        navigate("/dashboard");
      } else {
        await registerUser({ name, email, password });
        setIsLogin(true);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close modal">
          ×
        </CloseButton>
        <ImageSection />

        <FormSection>
          <BrandTitle>SyncMate</BrandTitle>
          <BrandSubtitle>
            Smart expense tracking for everyday life
          </BrandSubtitle>

          <Title>{isLogin ? "Login" : "Create account"}</Title>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>
          </form>

          <SwitchText>
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign up</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </>
            )}
          </SwitchText>
        </FormSection>
      </Modal>
    </Overlay>
  );
};

export default AuthModal;
