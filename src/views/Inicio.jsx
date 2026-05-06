import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardBody>
        <h1 className="page-title mb-3">Início</h1>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Objetivo do ambiente</h3>
        <p className="mb-2">
          Este site privado simula o comportamento de componentes da biblioteca Argon Dashboard
          Pro React para validacao do WT.
        </p>
        <p className="mb-4">
          Para testar o fluxo principal de cadastro e consulta, navegue no menu lateral em
          {' '}<strong>Pagina de teste</strong>{' '}ou clique no botao abaixo.
        </p>
        <Button color="primary" onClick={() => navigate('/components')}>
          Ir para pagina de teste
        </Button>
      </CardBody>
    </Card>
  );
}
