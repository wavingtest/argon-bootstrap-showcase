import { useState } from 'react';
import classNames from 'classnames';
import {
  Alert,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Popover,
  PopoverBody,
  Progress,
  Row,
  Spinner,
  TabContent,
  TabPane,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import WtShowcaseBlock from './WtShowcaseBlock';

const TIMELINE_ITEMS = [
  { icon: 'fa-user-plus', label: 'Novo agente logado na fila Suporte', time: 'ha 2 min' },
  { icon: 'fa-phone', label: 'Chamada encerrada no ramal 1718', time: 'ha 15 min' },
  { icon: 'fa-chart-line', label: 'Relatorio de filas atualizado', time: 'ha 1 h' },
];

export default function ArgonHighPrioritySection() {
  const [activeTab, setActiveTab] = useState('a');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [catalogConfirmOpen, setCatalogConfirmOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [progress, setProgress] = useState(62);
  const [switchOn, setSwitchOn] = useState(true);
  const [radio, setRadio] = useState('opcao-a');
  const [checks, setChecks] = useState({ email: true, push: false });
  const [selectVal, setSelectVal] = useState('');
  const [page, setPage] = useState(2);

  return (
    <div className="wt-catalog-page section-spacer">
      <div className="wt-catalog-shell">
        <div className="wt-catalog-grid">
          <WtShowcaseBlock name="NAV TABS" hint="reactstrap Nav + TabContent">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classNames({ active: activeTab === 'a' })}
                  onClick={() => setActiveTab('a')}
                  href="#"
                >
                  Aba A
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({ active: activeTab === 'b' })}
                  onClick={() => setActiveTab('b')}
                  href="#"
                >
                  Aba B
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({ active: activeTab === 'c' })}
                  onClick={() => setActiveTab('c')}
                  href="#"
                >
                  Aba C
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="pt-3">
              <TabPane tabId="a">Conteudo da Aba A (NavTabs).</TabPane>
              <TabPane tabId="b">Conteudo da Aba B (NavTabs).</TabPane>
              <TabPane tabId="c">Conteudo da Aba C (NavTabs).</TabPane>
            </TabContent>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="DROPDOWN" hint="DropdownMenu sm e acoes">
            <div className="d-flex flex-wrap gap-2">
              <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen((v) => !v)}>
                <DropdownToggle caret color="secondary" size="sm">
                  Acoes
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Menu</DropdownItem>
                  <DropdownItem>Editar</DropdownItem>
                  <DropdownItem>Duplicar</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem className="text-danger">Excluir</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown direction="end">
                <DropdownToggle color="primary" size="sm" caret>
                  Notificacoes
                </DropdownToggle>
                <DropdownMenu end style={{ minWidth: 220 }}>
                  <DropdownItem>Nova mensagem na fila</DropdownItem>
                  <DropdownItem>Relatorio disponivel</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="MODAL" hint="Modal padrao e confirmacao">
            <div className="d-flex flex-wrap gap-2">
              <Button color="primary" size="sm" onClick={() => setCatalogModalOpen(true)}>
                Abrir Modal
              </Button>
              <Button color="danger" size="sm" onClick={() => setCatalogConfirmOpen(true)}>
                Abrir confirmacao
              </Button>
            </div>
            <Modal isOpen={catalogModalOpen} toggle={() => setCatalogModalOpen(false)} centered>
              <ModalHeader toggle={() => setCatalogModalOpen(false)}>Modal padrao</ModalHeader>
              <ModalBody>Conteudo de exemplo para validacao do componente Modal.</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setCatalogModalOpen(false)}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={() => setCatalogModalOpen(false)}>
                  Confirmar
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={catalogConfirmOpen}
              toggle={() => setCatalogConfirmOpen(false)}
              centered
              size="sm"
            >
              <ModalHeader toggle={() => setCatalogConfirmOpen(false)}>Confirmar acao</ModalHeader>
              <ModalBody>Deseja realmente executar esta operacao?</ModalBody>
              <ModalFooter>
                <Button color="secondary" size="sm" onClick={() => setCatalogConfirmOpen(false)}>
                  Nao
                </Button>
                <Button color="danger" size="sm" onClick={() => setCatalogConfirmOpen(false)}>
                  Sim, confirmar
                </Button>
              </ModalFooter>
            </Modal>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TABLE" hint="Table hover + acoes por linha">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Agente</th>
                    <th>Ramal</th>
                    <th>Status</th>
                    <th className="text-end">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>teste02</td>
                    <td>1718</td>
                    <td>
                      <span className="status-pill is-success">Online</span>
                    </td>
                    <td className="text-end">
                      <Button color="primary" size="sm" className="me-1">
                        Pausar
                      </Button>
                      <Button color="secondary" size="sm" outline id="catalog-table-tip-1">
                        <i className="fa-solid fa-circle-info" />
                      </Button>
                      <UncontrolledTooltip target="catalog-table-tip-1">
                        Detalhes da fila
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>Laura Oliveira</td>
                    <td>1010</td>
                    <td>
                      <span className="status-pill is-warning">Pausa</span>
                    </td>
                    <td className="text-end">
                      <Button color="primary" size="sm">
                        Retomar
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="PAGINATION" hint="Pagination com estado">
            <Pagination className="mb-0">
              <PaginationItem disabled={page === 1}>
                <PaginationLink previous onClick={() => setPage((p) => Math.max(1, p - 1))} />
              </PaginationItem>
              {[1, 2, 3].map((p) => (
                <PaginationItem key={p} active={p === page}>
                  <PaginationLink onClick={() => setPage(p)}>{p}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={page === 3}>
                <PaginationLink next onClick={() => setPage((p) => Math.min(3, p + 1))} />
              </PaginationItem>
            </Pagination>
            <small className="text-muted d-block mt-2">Pagina ativa: {page}</small>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="PROGRESS" hint="Progress + controle">
            <Progress value={progress} className="mb-2" />
            <div className="d-flex gap-2">
              <Button size="sm" color="secondary" onClick={() => setProgress((v) => Math.max(0, v - 10))}>
                -10%
              </Button>
              <Button size="sm" color="secondary" onClick={() => setProgress((v) => Math.min(100, v + 10))}>
                +10%
              </Button>
              <span className="small text-muted align-self-center">{progress}%</span>
            </div>
            <Progress multi className="mt-3" style={{ height: 8 }}>
              <Progress bar value={35} />
              <Progress bar color="success" value={25} />
              <Progress bar color="info" value={15} />
            </Progress>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="SPINNER" hint="Spinner sizes e cores">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <Spinner size="sm" />
              <Spinner />
              <Spinner color="primary" />
              <Spinner color="success" />
              <Button color="primary" size="sm" disabled>
                <Spinner size="sm" className="me-2" /> Salvando...
              </Button>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TOOLTIP" hint="UncontrolledTooltip">
            <div className="d-flex gap-2">
              <Button id="catalog-tip-1" color="secondary" size="sm">
                Hover info
              </Button>
              <Button id="catalog-tip-2" color="primary" size="sm" outline>
                <i className="fa-solid fa-gear" />
              </Button>
              <UncontrolledTooltip target="catalog-tip-1">Tooltip informativo</UncontrolledTooltip>
              <UncontrolledTooltip target="catalog-tip-2">Configuracoes da fila</UncontrolledTooltip>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="POPOVER" hint="Popover com toggle">
            <Button
              id="catalog-popover-btn"
              color="primary"
              size="sm"
              onClick={() => setPopoverOpen((v) => !v)}
            >
              Abrir Popover
            </Button>
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="catalog-popover-btn"
              toggle={() => setPopoverOpen((v) => !v)}
            >
              <PopoverBody>
                Conteudo rapido sem abrir modal. Util em acoes contextuais.
              </PopoverBody>
            </Popover>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="BREADCRUMB" hint="BreadcrumbItem">
            <Breadcrumb>
              <BreadcrumbItem>
                <a href="#home">Inicio</a>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <a href="#config">Configuracoes</a>
              </BreadcrumbItem>
              <BreadcrumbItem active>Filas</BreadcrumbItem>
            </Breadcrumb>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="HEADER" hint="Faixa header-dark estilo Argon">
            <div className="wt-argon-header-demo d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h2 className="wt-argon-header-demo__title">Monitoramento unificado</h2>
              <div className="wt-argon-header-demo__actions">
                <Button color="light" size="sm" outline>
                  Filtro
                </Button>
                <Button color="light" size="sm">
                  Criar
                </Button>
              </div>
            </div>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="INPUT GROUP" hint="InputGroup + InputGroupText">
            <Row className="g-2">
              <Col md={6}>
                <InputGroup>
                  <InputGroupText>
                    <i className="fa-solid fa-magnifying-glass" />
                  </InputGroupText>
                  <Input placeholder="Buscar agente, fila ou ramal" />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroupText>R$</InputGroupText>
                  <Input type="number" placeholder="0,00" />
                  <InputGroupText>,00</InputGroupText>
                </InputGroup>
              </Col>
            </Row>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="SELECT" hint="Input type select (mock combobox)">
            <Input
              type="select"
              value={selectVal}
              onChange={(e) => setSelectVal(e.target.value)}
              style={{ maxWidth: 320 }}
            >
              <option value="">Selecione uma fila</option>
              <option value="suporte">Suporte</option>
              <option value="comercial">Comercial</option>
              <option value="whatsapp">Whatsapp</option>
            </Input>
            {selectVal && (
              <small className="text-muted d-block mt-2">Selecionado: {selectVal}</small>
            )}
          </WtShowcaseBlock>

          <WtShowcaseBlock name="SWITCH" hint="Input type switch">
            <FormGroup switch>
              <Input
                type="switch"
                id="catalog-switch-1"
                checked={switchOn}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
              <Label check for="catalog-switch-1">
                Habilitar discador: {switchOn ? 'ligado' : 'desligado'}
              </Label>
            </FormGroup>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="CHECKBOX" hint="Input type checkbox">
            <FormGroup check>
              <Input
                type="checkbox"
                id="catalog-chk-email"
                checked={checks.email}
                onChange={(e) => setChecks((c) => ({ ...c, email: e.target.checked }))}
              />
              <Label check for="catalog-chk-email">Notificar por e-mail</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="checkbox"
                id="catalog-chk-push"
                checked={checks.push}
                onChange={(e) => setChecks((c) => ({ ...c, push: e.target.checked }))}
              />
              <Label check for="catalog-chk-push">Push no navegador</Label>
            </FormGroup>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="RADIO GROUP" hint="Input type radio">
            <FormGroup check>
              <Input
                type="radio"
                name="catalog-radio"
                id="catalog-radio-a"
                checked={radio === 'opcao-a'}
                onChange={() => setRadio('opcao-a')}
              />
              <Label check for="catalog-radio-a">Opcao A</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="radio"
                name="catalog-radio"
                id="catalog-radio-b"
                checked={radio === 'opcao-b'}
                onChange={() => setRadio('opcao-b')}
              />
              <Label check for="catalog-radio-b">Opcao B</Label>
            </FormGroup>
            <FormGroup check>
              <Input
                type="radio"
                name="catalog-radio"
                id="catalog-radio-c"
                checked={radio === 'opcao-c'}
                onChange={() => setRadio('opcao-c')}
              />
              <Label check for="catalog-radio-c">Opcao C</Label>
            </FormGroup>
            <small className="text-muted">Selecionado: {radio}</small>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="LIST GROUP" hint="ListGroup + ListGroupItem">
            <ListGroup>
              <ListGroupItem active>Fila Suporte — 12 em espera</ListGroupItem>
              <ListGroupItem>
                Fila Comercial <Badge color="secondary" pill className="float-end">3</Badge>
              </ListGroupItem>
              <ListGroupItem disabled>Fila Chatbot (offline)</ListGroupItem>
              <ListGroupItem action tag="button" type="button">
                Logar em novas filas
              </ListGroupItem>
            </ListGroup>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="TIMELINE" hint="Lista cronologica de atividade">
            <ul className="wt-timeline">
              {TIMELINE_ITEMS.map((item) => (
                <li key={item.label} className="wt-timeline__item">
                  <span className="wt-timeline__icon">
                    <i className={`fa-solid ${item.icon}`} />
                  </span>
                  <div className="wt-timeline__content">
                    <div>{item.label}</div>
                    <div className="wt-timeline__time">{item.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </WtShowcaseBlock>

          <WtShowcaseBlock name="ALERT" hint="Variantes informativas (referencia)">
            <Alert color="info" className="mb-2">
              <i className="fa-solid fa-circle-info" />
              <div>Mensagem inline de exemplo para validacao do Alert.</div>
            </Alert>
            <Alert color="danger" className="mb-0">
              <i className="fa-solid fa-triangle-exclamation" />
              <div>Variante destrutiva para cenarios de erro.</div>
            </Alert>
          </WtShowcaseBlock>
        </div>
      </div>
    </div>
  );
}
