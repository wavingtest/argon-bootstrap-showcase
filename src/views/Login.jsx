import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Alert,
} from 'reactstrap';

export default function Login() {
  const [email, setEmail] = useState('alex.morgan@demo.dashboard');
  const [password, setPassword] = useState('demo123');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha e-mail e senha.');
      return;
    }
    setError('');
    navigate('/');
  };

  return (
    <div className="auth-card">
      <div className="auth-card__brand">
        <span className="brand-mark">DD</span>
        <strong>Demo Dashboard</strong>
      </div>

      <h2>Acessar a conta</h2>
      <span className="text-muted">Use suas credenciais para continuar</span>

      {error && (
        <Alert color="danger" className="mb-3">
          <i className="fa-solid fa-triangle-exclamation" />
          <div>{error}</div>
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label for="email">E-mail</Label>
          <InputGroup>
            <InputGroupText>
              <i className="fa-regular fa-envelope" />
            </InputGroupText>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@empresa.com"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for="password">Senha</Label>
          <InputGroup>
            <InputGroupText>
              <i className="fa-solid fa-lock" />
            </InputGroupText>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </InputGroup>
        </FormGroup>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <FormGroup check className="mb-0">
            <Input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <Label check for="remember">Lembrar-me</Label>
          </FormGroup>
          <a href="#forgot" className="small text-muted">Esqueci minha senha</a>
        </div>

        <Button color="primary" className="w-100" type="submit">
          Entrar
        </Button>

        <div className="text-center text-muted small mt-3">
          Ainda não tem conta?{' '}
          <Link to="#signup" className="text-dark fw-semibold">
            Criar agora
          </Link>
        </div>
      </Form>
    </div>
  );
}
