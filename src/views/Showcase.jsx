import { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  Alert,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import classNames from 'classnames';

import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { STAT_CARDS, ORDERS, TRAFFIC_SOURCES, ACTIVITY_FEED } from '../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const currency = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const REVENUE_BY_PERIOD = {
  today: {
    labels: ['08h', '10h', '12h', '14h', '16h', '18h', '20h'],
    current: [6, 9, 14, 18, 15, 22, 19],
    previous: [4, 7, 10, 12, 11, 15, 14],
  },
  week: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    current: [28, 42, 37, 51, 64, 59, 31],
    previous: [22, 31, 35, 39, 47, 43, 26],
  },
  month: {
    labels: ['S1', 'S2', 'S3', 'S4'],
    current: [140, 186, 174, 221],
    previous: [118, 147, 155, 189],
  },
  year: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'],
    current: [42, 51, 48, 63, 72, 68, 81, 92, 88],
    previous: [33, 39, 41, 47, 53, 58, 60, 64, 70],
  },
};

const EMPTY_ORDER_FORM = {
  id: '',
  name: '',
  email: '',
  total: '',
  status: 'warning',
  createdAt: '',
};

const STATUS_META = {
  success: 'Pago',
  warning: 'Aguardando',
  danger: 'Cancelado',
  info: 'Em separacao',
};

export default function Showcase() {
  const [pill, setPill] = useState('today');
  const [accordionOpen, setAccordionOpen] = useState('1');
  const [modalOpen, setModalOpen] = useState(false);
  const [orders, setOrders] = useState(ORDERS);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '2026-04-01',
    end: '2026-04-30',
  });
  const [orderForm, setOrderForm] = useState({
    ...EMPTY_ORDER_FORM,
    createdAt: new Date().toISOString().slice(0, 10),
  });

  const selectedSeries = REVENUE_BY_PERIOD[pill];

  const lineData = useMemo(
    () => ({
      labels: selectedSeries.labels,
      datasets: [
        {
          label: 'Periodo atual',
          data: selectedSeries.current,
          borderColor: '#131822',
          backgroundColor: 'rgba(19, 24, 34, 0.08)',
          tension: 0.35,
          fill: true,
          pointRadius: 3,
          pointBackgroundColor: '#131822',
        },
        {
          label: 'Periodo anterior',
          data: selectedSeries.previous,
          borderColor: '#9aa1ad',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    }),
    [selectedSeries],
  );

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: (v) => `${v}k` },
      },
    },
  };

  const barData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [
      {
        label: 'Pedidos',
        data: [42, 58, 71, 64, 80, 92, 36],
        backgroundColor: '#374151',
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
    },
  };

  const doughnutData = {
    labels: TRAFFIC_SOURCES.labels,
    datasets: [
      {
        data: TRAFFIC_SOURCES.values,
        backgroundColor: ['#131822', '#374151', '#6b7280', '#9aa1ad', '#cdd2da'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } },
    },
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === 'all') return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const tableColumns = [
    { key: 'id', label: 'Pedido', width: 120 },
    {
      key: 'customer',
      label: 'Cliente',
      sortable: false,
      render: (customer) => (
        <div className="cell-user">
          <span className="avatar">
            {customer.name
              .split(' ')
              .map((p) => p[0])
              .slice(0, 2)
              .join('')}
          </span>
          <div className="meta">
            <div>{customer.name}</div>
            <small>{customer.email}</small>
          </div>
        </div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      width: 130,
      render: (total) => <strong>{currency(total)}</strong>,
    },
    {
      key: 'statusLabel',
      label: 'Status',
      width: 150,
      render: (label, row) => (
        <span className={classNames('status-pill', `is-${row.status}`)}>{label}</span>
      ),
    },
    { key: 'createdAt', label: 'Criado em', width: 130 },
    {
      key: '__actions',
      label: '',
      sortable: false,
      width: 80,
      render: () => (
        <div className="d-flex gap-1 justify-content-end">
          <button className="icon-btn" aria-label="Visualizar">
            <i className="fa-regular fa-eye" />
          </button>
          <button className="icon-btn" aria-label="Mais opcoes">
            <i className="fa-solid fa-ellipsis-vertical" />
          </button>
        </div>
      ),
    },
  ];

  const toggleAccordion = (id) =>
    setAccordionOpen((current) => (current === id ? '' : id));

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!orderForm.id || !orderForm.name || !orderForm.email || !orderForm.total) return;

    const newOrder = {
      id: orderForm.id,
      customer: { name: orderForm.name, email: orderForm.email },
      total: Number(orderForm.total),
      status: orderForm.status,
      statusLabel: STATUS_META[orderForm.status],
      createdAt: orderForm.createdAt || new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setModalOpen(false);
    setOrderForm({ ...EMPTY_ORDER_FORM, createdAt: new Date().toISOString().slice(0, 10) });
    setStatusFilter('all');
  };

  return (
    <>
      <div className="page-header d-flex flex-wrap justify-content-between align-items-end gap-3">
        <div>
          <h1 className="page-title">Visao geral</h1>
          <p className="page-subtitle">
            Showcase de componentes baseado em estilo Argon Pro / Bootstrap.
          </p>
        </div>
        <div className="d-flex align-items-end gap-2 flex-wrap">
          <div>
            <label className="form-label mb-1">De</label>
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
            />
          </div>
          <div>
            <label className="form-label mb-1">Ate</label>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
            />
          </div>
          <Button color="primary" className="btn-icon" onClick={() => setModalOpen(true)}>
            <i className="fa-solid fa-plus" /> Novo pedido
          </Button>
        </div>
      </div>

      <Row className="g-3">
        {STAT_CARDS.map((stat) => (
          <Col key={stat.label} xs={12} sm={6} xl={3}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row className="g-3 section-spacer">
        <Col xs={12} xl={8}>
          <Card>
            <CardHeader>
              <h3>Receita</h3>
              <span className="text-muted">
                {dateRange.start} ate {dateRange.end}
              </span>
              <div className="header-actions">
                <Nav pills>
                  {[
                    { id: 'today', label: 'Hoje' },
                    { id: 'week', label: 'Semana' },
                    { id: 'month', label: 'Mes' },
                    { id: 'year', label: 'Ano' },
                  ].map((item) => (
                    <NavItem key={item.id}>
                      <NavLink
                        href="#"
                        active={pill === item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setPill(item.id);
                        }}
                      >
                        {item.label}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={lineData} options={lineOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} xl={4}>
          <Card className="h-100">
            <CardHeader>
              <h3>Origem do trafego</h3>
              <span className="text-muted">Ultimos 7 dias</span>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper" style={{ height: 260 }}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 section-spacer">
        <Col xs={12} xl={8}>
          <Card>
            <CardHeader>
              <h3>Pedidos por dia</h3>
              <span className="text-muted">esta semana</span>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper" style={{ height: 260 }}>
                <Bar data={barData} options={barOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} xl={4}>
          <Card className="h-100">
            <CardHeader>
              <h3>Atividade recente</h3>
            </CardHeader>
            <CardBody style={{ paddingTop: '0.5rem' }}>
              <ul className="list-unstyled m-0">
                {ACTIVITY_FEED.map((item) => (
                  <li
                    key={item.id}
                    className="d-flex align-items-start gap-3 py-2 border-bottom"
                  >
                    <span
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: '#eef0f3',
                        color: '#374151',
                        flexShrink: 0,
                      }}
                    >
                      <i className={`fa-solid ${item.icon}`} />
                    </span>
                    <div className="flex-grow-1">
                      <div style={{ fontSize: '0.875rem', color: '#374151' }}>{item.label}</div>
                      <small className="text-muted">{item.time}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 section-spacer">
        <Col xs={12}>
          <DataTable
            columns={tableColumns}
            data={filteredOrders}
            searchableKeys={['id', 'statusLabel', 'createdAt']}
            toolbarTitle="Pedidos recentes"
            onAdd={() => setModalOpen(true)}
            pageSize={6}
            filterOptions={Object.entries(STATUS_META).map(([value, label]) => ({ value, label }))}
            filterValue={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </Col>
      </Row>

      <Row className="g-3 section-spacer">
        <Col xs={12} lg={6}>
          <Card>
            <CardHeader>
              <h3>Botoes</h3>
            </CardHeader>
            <CardBody className="d-flex flex-wrap gap-2">
              <Button color="primary">Primario</Button>
              <Button color="secondary">Secundario</Button>
              <Button outline color="primary">Outline</Button>
              <Button color="success">Sucesso</Button>
              <Button color="warning">Aviso</Button>
              <Button color="danger">Erro</Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <CardHeader>
              <h3>Badges & status</h3>
            </CardHeader>
            <CardBody className="d-flex flex-wrap gap-2 align-items-center">
              <Badge color="primary">Primary</Badge>
              <Badge color="secondary">Secondary</Badge>
              <Badge color="success">Success</Badge>
              <Badge color="warning">Warning</Badge>
              <Badge color="danger">Danger</Badge>
              <Badge color="info">Info</Badge>
              <Badge color="light" pill>Pill</Badge>
              <span className="status-pill is-success">Ativo</span>
              <span className="status-pill is-warning">Pendente</span>
              <span className="status-pill is-danger">Bloqueado</span>
              <span className="status-pill is-info">Em revisao</span>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 section-spacer">
        <Col xs={12} lg={6}>
          <Card>
            <CardHeader>
              <h3>Alertas</h3>
            </CardHeader>
            <CardBody>
              <Alert color="info"><i className="fa-solid fa-circle-info" /> <div>Ambiente de demonstracao do dashboard.</div></Alert>
              <Alert color="success"><i className="fa-solid fa-circle-check" /> <div>Configuracoes salvas.</div></Alert>
              <Alert color="warning"><i className="fa-solid fa-triangle-exclamation" /> <div>Backup pendente.</div></Alert>
              <Alert color="danger" className="mb-0"><i className="fa-solid fa-circle-xmark" /> <div>Falha ao processar 2 pedidos.</div></Alert>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card>
            <CardHeader><h3>FAQ rapido</h3></CardHeader>
            <CardBody>
              <Accordion open={accordionOpen} toggle={toggleAccordion}>
                <AccordionItem>
                  <AccordionHeader targetId="1">Como exporto os dados da tabela?</AccordionHeader>
                  <AccordionBody accordionId="1">Use o botao Exportar no topo da tabela.</AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">Posso customizar os widgets?</AccordionHeader>
                  <AccordionBody accordionId="2">Sim. Este projeto e base para evolucao.</AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">O tema escuro esta disponivel?</AccordionHeader>
                  <AccordionBody accordionId="3">Nao nesta build.</AccordionBody>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen((v) => !v)} centered>
        <Form onSubmit={handleCreateOrder}>
          <ModalHeader toggle={() => setModalOpen(false)}>Novo pedido</ModalHeader>
          <ModalBody>
            <Row className="g-2">
              <Col md={6}>
                <FormGroup>
                  <Label for="order-id">Codigo</Label>
                  <Input
                    id="order-id"
                    value={orderForm.id}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, id: e.target.value }))}
                    placeholder="PED-1050"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="order-total">Total</Label>
                  <Input
                    id="order-total"
                    type="number"
                    min="0"
                    step="0.01"
                    value={orderForm.total}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, total: e.target.value }))}
                    placeholder="199.90"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="order-name">Cliente</Label>
                  <Input
                    id="order-name"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do cliente"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="order-email">E-mail</Label>
                  <Input
                    id="order-email"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="cliente@email.com"
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="order-status">Status</Label>
                  <Input
                    id="order-status"
                    type="select"
                    value={orderForm.status}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    {Object.entries(STATUS_META).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="order-date">Data</Label>
                  <Input
                    id="order-date"
                    type="date"
                    value={orderForm.createdAt}
                    onChange={(e) => setOrderForm((prev) => ({ ...prev, createdAt: e.target.value }))}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="primary" type="submit">
              Criar pedido
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
