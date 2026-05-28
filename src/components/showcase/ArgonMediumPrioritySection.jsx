import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';

import WtShowcaseBlock from './WtShowcaseBlock';

const MINI_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { display: false },
    y: { display: false },
  },
};

export default function ArgonMediumPrioritySection() {
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [filterGroup, setFilterGroup] = useState('todas');
  const [toastVisible, setToastVisible] = useState(false);
  const [validationTouched, setValidationTouched] = useState(false);
  const [formName, setFormName] = useState('');
  const [notes, setNotes] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [pageSize, setPageSize] = useState('10');
  const [catalogPage, setCatalogPage] = useState(1);

  const nameInvalid = validationTouched && formName.trim().length < 3;

  const miniChartData = useMemo(
    () => ({
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      datasets: [
        {
          data: [12, 19, 8, 14, 22],
          backgroundColor: '#232a36',
          borderRadius: 4,
        },
      ],
    }),
    [],
  );

  const totalPages = 3;

  return (
    <div className="wt-catalog-page wt-catalog-page--medium section-spacer">
      <div className="wt-catalog-shell">
        <div className="wt-catalog-grid">
          <WtShowcaseBlock name="OFFCANVAS" hint="Painel lateral para filtros ou detalhe">
            <Button color="primary" size="sm" onClick={() => setOffcanvasOpen(true)}>
              Abrir painel lateral
            </Button>
            <Offcanvas
              direction="end"
              isOpen={offcanvasOpen}
              toggle={() => setOffcanvasOpen(false)}
            >
              <OffcanvasHeader toggle={() => setOffcanvasOpen(false)}>
                Filtros avancados
              </OffcanvasHeader>
              <OffcanvasBody>
                <FormGroup>
                  <Label for="offcanvas-fila">Fila</Label>
                  <Input id="offcanvas-fila" type="select">
                    <option>Todas</option>
                    <option>Suporte</option>
                    <option>Comercial</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="offcanvas-status">Status</Label>
                  <Input id="offcanvas-status" type="select">
                    <option>Online</option>
                    <option>Pausa</option>
                    <option>Offline</option>
                  </Input>
                </FormGroup>
                <Button color="primary" size="sm" onClick={() => setOffcanvasOpen(false)}>
                  Aplicar filtros
                </Button>
              </OffcanvasBody>
            </Offcanvas>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="COLLAPSE" hint="Secoes recolhiveis para filtros">
            <Button color="secondary" size="sm" onClick={() => setCollapseOpen((v) => !v)}>
              {collapseOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            </Button>
            <Collapse isOpen={collapseOpen}>
              <Card className="mt-3 mb-0 border">
                <CardBody className="py-3">
                  <Row className="g-2">
                    <Col sm={6}>
                      <Input placeholder="Buscar agente" />
                    </Col>
                    <Col sm={6}>
                      <Input type="select">
                        <option>Todas as filas</option>
                        <option>Suporte</option>
                      </Input>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Collapse>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="BUTTON GROUP" hint="Filtros segmentados">
            <ButtonGroup size="sm">
              {['todas', 'lidas', 'nao-lidas'].map((key) => (
                <Button
                  key={key}
                  color={filterGroup === key ? 'primary' : 'secondary'}
                  outline={filterGroup !== key}
                  onClick={() => setFilterGroup(key)}
                >
                  {key === 'todas' ? 'Todas' : key === 'lidas' ? 'Lidas' : 'Nao lidas'}
                </Button>
              ))}
            </ButtonGroup>
            <small className="text-muted d-block mt-2">Filtro ativo: {filterGroup}</small>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="BADGE" hint="Variantes, pills e dot">
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Badge color="primary">Primary</Badge>
              <Badge color="success" pill>
                Online
              </Badge>
              <Badge color="warning">3 pendentes</Badge>
              <Badge color="danger">Urgente</Badge>
              <span className="wt-badge-dot" title="Notificacao">
                <i className="fa-solid fa-bell" />
                <span className="wt-badge-dot__indicator" />
              </span>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="AVATAR" hint="Iniciais, imagem e tamanhos">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <span className="wt-avatar wt-avatar--sm">GC</span>
              <span className="wt-avatar">LO</span>
              <span className="wt-avatar wt-avatar--lg wt-avatar--img">
                <img src="https://i.pravatar.cc/80?u=wt-agent" alt="" />
              </span>
              <span className="wt-avatar wt-avatar--online">TS</span>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="MEDIA OBJECT" hint="Avatar + metadados em linha">
            <div className="wt-media-list">
              <div className="wt-media">
                <span className="wt-avatar wt-avatar--sm">AB</span>
                <div className="wt-media__body">
                  <div className="wt-media__title">Ana Beatriz</div>
                  <div className="wt-media__meta">Ramal 1718 · Fila Suporte</div>
                </div>
                <Badge color="success" pill>
                  Online
                </Badge>
              </div>
              <div className="wt-media">
                <span className="wt-avatar wt-avatar--sm">MR</span>
                <div className="wt-media__body">
                  <div className="wt-media__title">Marcos Ribeiro</div>
                  <div className="wt-media__meta">Ramal 1022 · Pausa 4 min</div>
                </div>
                <Badge color="warning">Pausa</Badge>
              </div>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="CARD" hint="Header com acoes, footer e tabs internas">
            <Card className="mb-0">
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h5" className="mb-0">
                  Resumo da fila
                </CardTitle>
                <Button color="primary" size="sm" outline>
                  Exportar
                </Button>
              </CardHeader>
              <CardBody>
                <p className="text-muted small mb-2">12 agentes logados · 4 em pausa</p>
                <div className="d-flex gap-2">
                  <Badge color="secondary">Suporte</Badge>
                  <Badge color="secondary">Comercial</Badge>
                </div>
              </CardBody>
              <CardFooter className="text-muted small">Atualizado ha 2 minutos</CardFooter>
            </Card>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="FORM VALIDATION" hint="Estados valido, invalido e feedback">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setValidationTouched(true);
              }}
            >
              <FormGroup>
                <Label for="catalog-valid-name">Nome da campanha</Label>
                <Input
                  id="catalog-valid-name"
                  invalid={nameInvalid}
                  valid={validationTouched && !nameInvalid}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Minimo 3 caracteres"
                />
                <FormFeedback>Informe pelo menos 3 caracteres.</FormFeedback>
                <FormFeedback valid>Nome valido.</FormFeedback>
              </FormGroup>
              <Button color="primary" size="sm" type="submit">
                Validar
              </Button>
            </Form>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TEXTAREA / FILE INPUT" hint="Texto longo e upload">
            <FormGroup>
              <Label for="catalog-notes">Observacoes</Label>
              <Input
                id="catalog-notes"
                type="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas sobre a fila ou campanha..."
              />
              <FormText>{notes.length} caracteres</FormText>
            </FormGroup>
            <FormGroup className="mb-0">
              <Label for="catalog-file">Lista de contatos (CSV)</Label>
              <Input id="catalog-file" type="file" accept=".csv" />
            </FormGroup>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="DATE RANGE" hint="Intervalo De / Ate">
            <Row className="g-2 align-items-end">
              <Col sm={5}>
                <Label for="catalog-date-from">De</Label>
                <Input
                  id="catalog-date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </Col>
              <Col sm={5}>
                <Label for="catalog-date-to">Ate</Label>
                <Input
                  id="catalog-date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </Col>
              <Col sm={2}>
                <Button color="primary" size="sm" className="w-100">
                  Filtrar
                </Button>
              </Col>
            </Row>
            {(dateFrom || dateTo) && (
              <small className="text-muted d-block mt-2">
                Periodo: {dateFrom || '...'} ate {dateTo || '...'}
              </small>
            )}
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TOAST" hint="Feedback rapido pos-acao">
            <Button color="success" size="sm" onClick={() => setToastVisible(true)}>
              Disparar toast
            </Button>
            <div className="wt-toast-stack">
              <Toast isOpen={toastVisible} className="show">
                <ToastHeader toggle={() => setToastVisible(false)}>
                  <i className="fa-solid fa-circle-check text-success me-2" />
                  Sucesso
                </ToastHeader>
                <ToastBody>Agente pausado com sucesso.</ToastBody>
              </Toast>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TYPOGRAPHY" hint="Titulos, labels e texto muted">
            <h3 className="wt-typo-section">Filas de atendimento</h3>
            <p className="text-muted mb-2">
              Subtitulo descritivo com <code>text-muted</code> para contexto secundario.
            </p>
            <Label className="form-label text-uppercase small text-muted mb-1">
              Label de secao
            </Label>
            <p className="mb-0">
              Corpo padrao com <strong>destaque</strong> e <a href="#typo">link de acao</a>.
            </p>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="CHART VARIANT" hint="Mini bar chart (sparkline)">
            <div className="wt-mini-chart">
              <Bar data={miniChartData} options={MINI_CHART_OPTIONS} />
            </div>
            <small className="text-muted">Volume de chamadas — ultimos 5 dias</small>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="EMPTY STATE" hint="Tabela ou lista sem dados">
            <div className="wt-empty-state">
              <i className="fa-solid fa-inbox wt-empty-state__icon" />
              <h4 className="wt-empty-state__title">Nenhum registro encontrado</h4>
              <p className="wt-empty-state__text">
                Ajuste os filtros ou crie um novo item para popular esta lista.
              </p>
              <Button color="primary" size="sm">
                Criar registro
              </Button>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="PAGINATION + PAGE SIZE" hint="Tabelas longas estilo discador">
            <div className="d-flex flex-wrap align-items-center gap-3 mb-2">
              <FormGroup className="mb-0">
                <Label for="catalog-page-size" className="me-2 small">
                  Por pagina
                </Label>
                <Input
                  id="catalog-page-size"
                  type="select"
                  bsSize="sm"
                  style={{ width: 80, display: 'inline-block' }}
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Input>
              </FormGroup>
              <small className="text-muted">Exibindo {pageSize} por pagina</small>
            </div>
            <Pagination className="mb-0">
              <PaginationItem disabled={catalogPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => setCatalogPage((p) => Math.max(1, p - 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p} active={p === catalogPage}>
                  <PaginationLink onClick={() => setCatalogPage(p)}>{p}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={catalogPage === totalPages}>
                <PaginationLink
                  next
                  onClick={() => setCatalogPage((p) => Math.min(totalPages, p + 1))}
                />
              </PaginationItem>
            </Pagination>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="SKELETON" hint="Placeholder de carregamento">
            <div className="wt-skeleton-demo">
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-7" />
              </div>
              <div className="placeholder-glow mb-2">
                <span className="placeholder col-4" />
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-10" />
              </div>
            </div>
          </WtShowcaseBlock>
        </div>
      </div>
    </div>
  );
}
