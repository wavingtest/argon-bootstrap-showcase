import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import WtShowcaseBlock from './WtShowcaseBlock';

const CAROUSEL_ITEMS = [
  { title: 'Painel operacional', text: 'Visao unificada de filas e agentes.' },
  { title: 'Relatorios', text: 'Exporte metricas por periodo.' },
  { title: 'Configuracoes', text: 'Ajuste filas, pausas e permissoes.' },
];

const PRICING_PLANS = [
  { name: 'Basico', price: 'R$ 0', features: ['1 fila', '5 agentes', 'Relatorio diario'] },
  { name: 'Pro', price: 'R$ 199', features: ['10 filas', '50 agentes', 'API'], highlight: true },
  { name: 'Enterprise', price: 'Sob consulta', features: ['Ilimitado', 'SLA', 'Suporte dedicado'] },
];

const KANBAN_COLUMNS = [
  { id: 'todo', title: 'A fazer', cards: ['Configurar fila WhatsApp', 'Revisar script IVR'] },
  { id: 'doing', title: 'Em andamento', cards: ['Treinamento equipe'] },
  { id: 'done', title: 'Concluido', cards: ['Migrar ramais', 'Atualizar logo'] },
];

const ICON_SAMPLES = [
  'fa-house',
  'fa-user',
  'fa-phone',
  'fa-chart-line',
  'fa-gear',
  'fa-bell',
  'fa-envelope',
  'fa-lock',
];

const WIZARD_STEPS = ['Dados', 'Filas', 'Confirmacao'];

const SORTABLE_ROWS = [
  { id: 1, col: 'Agente', width: '30%' },
  { id: 2, col: 'Ramal', width: '20%' },
  { id: 3, col: 'Status', width: '25%' },
  { id: 4, col: 'Acoes', width: '25%' },
];

const CALENDAR_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

export default function ArgonLowPrioritySection() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [wizardStep, setWizardStep] = useState(0);
  const [sortableCols, setSortableCols] = useState(SORTABLE_ROWS);
  const [animating, setAnimating] = useState(false);

  const moveColumn = (index, direction) => {
    const next = [...sortableCols];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSortableCols(next);
  };

  return (
    <div className="wt-catalog-page wt-catalog-page--low section-spacer">
      <div className="wt-catalog-shell">
        <div className="wt-catalog-grid">
          <WtShowcaseBlock name="CAROUSEL" hint="Carousel com indicadores e controles">
            <Carousel
              activeIndex={carouselIndex}
              next={() => setCarouselIndex((i) => (i + 1) % CAROUSEL_ITEMS.length)}
              previous={() =>
                setCarouselIndex((i) => (i - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length)
              }
              className="wt-carousel-demo"
            >
              <CarouselIndicators
                items={CAROUSEL_ITEMS}
                activeIndex={carouselIndex}
                onClickHandler={setCarouselIndex}
              />
              {CAROUSEL_ITEMS.map((item, idx) => (
                <CarouselItem key={item.title}>
                  <div className="wt-carousel-demo__slide">
                    <CarouselCaption captionText="" captionHeader={item.title}>
                      <p className="mb-0">{item.text}</p>
                    </CarouselCaption>
                  </div>
                </CarouselItem>
              ))}
              <CarouselControl direction="prev" directionText="Anterior" />
              <CarouselControl direction="next" directionText="Proximo" />
            </Carousel>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="JUMBOTRON / HERO" hint="Faixa hero para landing ou onboarding">
            <div className="wt-jumbotron-demo">
              <h2 className="wt-jumbotron-demo__title">WT Private Showcase</h2>
              <p className="wt-jumbotron-demo__text">
                Valide componentes do ecossistema Argon Dashboard Pro React em ambiente neutro.
              </p>
              <Button color="light" size="sm">
                Comecar tour
              </Button>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="NAVBAR VARIANT" hint="Navbar transparente / fixa (mock)">
            <div className="wt-navbar-variant-demo">
              <span className="wt-navbar-variant-demo__brand">WT</span>
              <span className="wt-navbar-variant-demo__link">Dashboard</span>
              <span className="wt-navbar-variant-demo__link">Relatorios</span>
              <Button color="light" size="sm" className="ms-auto">
                Entrar
              </Button>
            </div>
            <small className="text-muted d-block mt-2">Variante escura transparente sobre fundo gradiente</small>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="PRICING TABLE" hint="Cards de planos (demo Argon)">
            <Row className="g-3">
              {PRICING_PLANS.map((plan) => (
                <Col md={4} key={plan.name}>
                  <Card className={`h-100 mb-0 ${plan.highlight ? 'border-primary' : ''}`}>
                    <CardHeader className="text-center fw-semibold">{plan.name}</CardHeader>
                    <CardBody className="text-center">
                      <div className="h4 mb-3">{plan.price}</div>
                      <ul className="list-unstyled small text-start mb-0">
                        {plan.features.map((f) => (
                          <li key={f} className="mb-1">
                            <i className="fa-solid fa-check text-success me-2" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="LOCK SCREEN" hint="Tela de bloqueio (auth Argon)">
            <div className="wt-auth-preview wt-auth-preview--lock">
              <span className="wt-avatar wt-avatar--lg">GC</span>
              <p className="mb-2 fw-semibold">Gabriel Coimbra</p>
              <Input type="password" placeholder="Senha para desbloquear" bsSize="sm" className="mb-2" />
              <Button color="primary" size="sm" block>
                Desbloquear
              </Button>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="REGISTER" hint="Formulario de cadastro (auth Argon)">
            <Form className="wt-auth-preview">
              <FormGroup>
                <Label for="reg-name">Nome</Label>
                <Input id="reg-name" placeholder="Seu nome" />
              </FormGroup>
              <FormGroup>
                <Label for="reg-email">E-mail</Label>
                <Input id="reg-email" type="email" placeholder="voce@empresa.com" />
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="reg-pass">Senha</Label>
                <Input id="reg-pass" type="password" />
              </FormGroup>
              <Button color="primary" size="sm">
                Criar conta
              </Button>
            </Form>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="ERROR 404" hint="Pagina nao encontrada">
            <div className="wt-error-page">
              <div className="wt-error-page__code">404</div>
              <h3 className="wt-error-page__title">Pagina nao encontrada</h3>
              <p className="text-muted">O recurso solicitado nao existe ou foi movido.</p>
              <Button color="primary" size="sm" outline>
                Voltar ao inicio
              </Button>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="MAINTENANCE" hint="Pagina de manutencao">
            <div className="wt-error-page wt-error-page--maintenance">
              <i className="fa-solid fa-screwdriver-wrench wt-error-page__icon" />
              <h3 className="wt-error-page__title">Em manutencao</h3>
              <p className="text-muted mb-0">Retornamos em breve. Previsao: 14:00.</p>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="MAP" hint="Placeholder de mapa (sem API)">
            <div className="wt-map-placeholder">
              <i className="fa-solid fa-map-location-dot" />
              <span>Mapa vetorial / Google Maps — mock visual</span>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="FULL CALENDAR" hint="Grade mensal estatica (mock)">
            <div className="wt-calendar-mock">
              <div className="wt-calendar-mock__header">Maio 2026</div>
              <div className="wt-calendar-mock__grid">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d) => (
                  <span key={d} className="wt-calendar-mock__weekday">
                    {d}
                  </span>
                ))}
                {CALENDAR_DAYS.map((day) => (
                  <span
                    key={day}
                    className={`wt-calendar-mock__day ${day === 28 ? 'is-today' : ''}`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="KANBAN" hint="Colunas de status (mock)">
            <div className="wt-kanban">
              {KANBAN_COLUMNS.map((col) => (
                <div key={col.id} className="wt-kanban__col">
                  <div className="wt-kanban__title">{col.title}</div>
                  {col.cards.map((card) => (
                    <Card key={card} className="wt-kanban__card mb-2">
                      <CardBody className="py-2 px-3 small">{card}</CardBody>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="WIZARD" hint="Passos de configuracao">
            <div className="wt-wizard">
              <div className="wt-wizard__steps">
                {WIZARD_STEPS.map((label, idx) => (
                  <span
                    key={label}
                    className={`wt-wizard__step ${idx === wizardStep ? 'is-active' : ''} ${idx < wizardStep ? 'is-done' : ''}`}
                  >
                    {idx + 1}. {label}
                  </span>
                ))}
              </div>
              <p className="small text-muted mb-2">
                Conteudo do passo: <strong>{WIZARD_STEPS[wizardStep]}</strong>
              </p>
              <div className="d-flex gap-2">
                <Button
                  size="sm"
                  color="secondary"
                  outline
                  disabled={wizardStep === 0}
                  onClick={() => setWizardStep((s) => s - 1)}
                >
                  Voltar
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  disabled={wizardStep === WIZARD_STEPS.length - 1}
                  onClick={() => setWizardStep((s) => Math.min(WIZARD_STEPS.length - 1, s + 1))}
                >
                  Proximo
                </Button>
              </div>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="SORTABLE TABLE" hint="Reordenar colunas (mock sem drag)">
            <Table size="sm" className="mb-2">
              <thead>
                <tr>
                  {sortableCols.map((col, idx) => (
                    <th key={col.id} style={{ width: col.width }}>
                      <span className="wt-sortable-col">
                        <i className="fa-solid fa-grip-vertical text-muted me-1" />
                        {col.col}
                        <span className="wt-sortable-col__actions">
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0"
                            onClick={() => moveColumn(idx, -1)}
                            disabled={idx === 0}
                            aria-label="Mover coluna para esquerda"
                          >
                            <i className="fa-solid fa-chevron-left" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0"
                            onClick={() => moveColumn(idx, 1)}
                            disabled={idx === sortableCols.length - 1}
                            aria-label="Mover coluna para direita"
                          >
                            <i className="fa-solid fa-chevron-right" />
                          </button>
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={sortableCols.length} className="text-muted small">
                    Use as setas para simular reordenacao de colunas.
                  </td>
                </tr>
              </tbody>
            </Table>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="ICONS GALLERY" hint="Font Awesome (amostra)">
            <div className="wt-icons-gallery">
              {ICON_SAMPLES.map((icon) => (
                <span key={icon} className="wt-icons-gallery__item" title={icon}>
                  <i className={`fa-solid ${icon}`} />
                  <code>{icon.replace('fa-', '')}</code>
                </span>
              ))}
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="ANIMATIONS" hint="Transicoes CSS de microinteracao">
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                setAnimating(true);
                setTimeout(() => setAnimating(false), 600);
              }}
            >
              Disparar animacao
            </Button>
            <div className={`wt-anim-box mt-3 ${animating ? 'is-animating' : ''}`}>
              <i className="fa-solid fa-bolt" />
            </div>
          </WtShowcaseBlock>
        </div>
      </div>
    </div>
  );
}
