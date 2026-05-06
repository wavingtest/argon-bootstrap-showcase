import { useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
  InputGroup,
  InputGroupText,
  Alert,
} from 'reactstrap';
import { PROFILE } from '../data/mockData';

const initialErrors = { fullName: '', email: '', phone: '' };

export default function Profile() {
  const [form, setForm] = useState({
    fullName: PROFILE.fullName,
    email: PROFILE.email,
    phone: PROFILE.phone,
    bio: PROFILE.bio,
    city: PROFILE.city,
    country: PROFILE.country,
    language: PROFILE.language,
    notifyEmail: true,
    notifyPush: false,
    twoFactor: true,
  });
  const [errors, setErrors] = useState(initialErrors);
  const [saved, setSaved] = useState(false);

  const update = (key) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const validate = () => {
    const next = { ...initialErrors };
    if (!form.fullName.trim()) next.fullName = 'Informe seu nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'E-mail inválido.';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10)
      next.phone = 'Telefone com no mínimo 10 dígitos.';
    setErrors(next);
    return !next.fullName && !next.email && !next.phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSaved(true);
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Meu perfil</h1>
        <p className="page-subtitle">
          Showcase de formulário com inputs, selects, validação e seleção múltipla.
        </p>
      </div>

      <Row className="g-3">
        <Col xs={12} lg={4}>
          <Card>
            <CardBody className="text-center">
              <div
                className="mx-auto"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  background: '#232a36',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 700,
                  marginBottom: '1rem',
                }}
              >
                {PROFILE.fullName
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <h4 className="mb-1">{form.fullName || 'Sem nome'}</h4>
              <div className="text-muted small">{PROFILE.role}</div>
              <div className="divider" />
              <div className="d-flex justify-content-around small text-muted">
                <div>
                  <div className="fw-bold text-dark">128</div>
                  <div>Tarefas</div>
                </div>
                <div>
                  <div className="fw-bold text-dark">42</div>
                  <div>Times</div>
                </div>
                <div>
                  <div className="fw-bold text-dark">7</div>
                  <div>Projetos</div>
                </div>
              </div>
              <Button color="secondary" block className="mt-3 w-100 btn-icon">
                <i className="fa-regular fa-image" /> Trocar foto
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} lg={8}>
          <Card>
            <CardHeader>
              <h3>Informações da conta</h3>
              <span className="text-muted">Atualize seus dados pessoais</span>
            </CardHeader>
            <CardBody>
              {saved && (
                <Alert color="success" className="mb-3">
                  <i className="fa-solid fa-circle-check" />
                  <div>Perfil atualizado com sucesso (demo).</div>
                </Alert>
              )}
              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="fullName">Nome completo</Label>
                      <Input
                        id="fullName"
                        value={form.fullName}
                        onChange={update('fullName')}
                        invalid={!!errors.fullName}
                      />
                      <FormFeedback>{errors.fullName}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <InputGroup>
                        <InputGroupText>
                          <i className="fa-regular fa-envelope" />
                        </InputGroupText>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={update('email')}
                          invalid={!!errors.email}
                        />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={update('phone')}
                        invalid={!!errors.phone}
                        placeholder="(11) 99999-0000"
                      />
                      <FormFeedback>{errors.phone}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="language">Idioma preferido</Label>
                      <Input
                        type="select"
                        id="language"
                        value={form.language}
                        onChange={update('language')}
                      >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="city">Cidade</Label>
                      <Input id="city" value={form.city} onChange={update('city')} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="country">País</Label>
                      <Input
                        type="select"
                        id="country"
                        value={form.country}
                        onChange={update('country')}
                      >
                        <option>Brasil</option>
                        <option>Argentina</option>
                        <option>Portugal</option>
                        <option>Estados Unidos</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col xs={12}>
                    <FormGroup>
                      <Label for="bio">Bio</Label>
                      <Input
                        id="bio"
                        type="textarea"
                        rows={4}
                        value={form.bio}
                        onChange={update('bio')}
                      />
                      <FormText>
                        Aparece no seu cartão público. Mantenha curto e direto.
                      </FormText>
                    </FormGroup>
                  </Col>

                  <Col xs={12}>
                    <Label className="d-block mb-2">Notificações</Label>
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        id="notifyEmail"
                        checked={form.notifyEmail}
                        onChange={update('notifyEmail')}
                      />
                      <Label check for="notifyEmail">Por e-mail</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        type="checkbox"
                        id="notifyPush"
                        checked={form.notifyPush}
                        onChange={update('notifyPush')}
                      />
                      <Label check for="notifyPush">Push no navegador</Label>
                    </FormGroup>
                    <FormGroup switch className="mt-2">
                      <Input
                        type="switch"
                        role="switch"
                        id="twoFactor"
                        checked={form.twoFactor}
                        onChange={update('twoFactor')}
                      />
                      <Label check for="twoFactor">
                        Autenticação em 2 fatores
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button type="button" color="secondary">
                    Cancelar
                  </Button>
                  <Button type="submit" color="primary">
                    Salvar alterações
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
