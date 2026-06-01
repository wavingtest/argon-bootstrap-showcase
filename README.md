# WT Private - Argon-style Showcase UI

Showcase de uma dashboard inspirada no Argon Dashboard Pro React
(stack: Bootstrap + reactstrap), com paleta neutra e componentes comuns de admin.

## Stack

- Vite 5 + React 18
- Bootstrap 5 + reactstrap 9
- Chart.js 4 + react-chartjs-2 5
- Font Awesome 6 Free
- SCSS custom (look and feel argon-like)

## Componentes da pagina

### Pagina de teste (`/components`)

Componentes presentes na pagina principal (`/components`):

- `Sidebar` (menu lateral com secoes, links e estado de colapso)
- `AdminNavbar` (topbar principal com busca, acoes e menu de usuario)
- `StatCard` (renderizado via `STAT_CARDS.map`)
- `RevenueLineChart` (Chart.js `Line` + `Nav pills` para `today/week/month/year`)
- `OrdersBarChart` (Chart.js `Bar` para volume de pedidos por dia)
- `TrafficSourcesDoughnutChart` (Chart.js `Doughnut` para distribuicao de origem)
- `ActivityFeedList` (renderizado via `ACTIVITY_FEED.map`)
- `DataTable` (`Pedidos recentes`) com busca, ordenacao, paginacao, filtro por status e acao `onAdd`
- `CreateOrderModal` (`Modal` + `Form`) com submit front-only para incluir registro em `orders`
- `AdvancedActionTopbar` (`Dropdown` de IA, notificacoes e conta + estado de feedback)
- `OperationsGridCard` (toolbar com `opsConfigOpen`/`opsColumnsOpen`, `reorderMode`, `visibleOpsColumns`, `opsSort`)
- `SupervisorTelephonyPanel` (tabela de agentes com acoes inline e estado `selectedSupervisorAgent`)
- `SplitPanelPreview` (painel lateral com estado `splitPanelText`)
- `ButtonsShowcaseCard` (variantes de botoes `primary/secondary/outline/success/warning/danger`)
- `BadgesAndStatusPillsCard` (variantes de `Badge` + `status-pill`)
- `AlertsShowcaseCard` (variantes de `Alert` informativo/sucesso/aviso/erro)
- `FaqAccordionCard` (reactstrap `Accordion`)

**Catalogo prioridade alta** (final da mesma pagina, blocos `[WT]` isolados):

- `NAV TABS` (Nav + TabContent)
- `DROPDOWN`
- `MODAL` (padrao + confirmacao)
- `TABLE` (hover + acoes + Tooltip)
- `PAGINATION`
- `PROGRESS` (simples + multi)
- `SPINNER`
- `TOOLTIP` (UncontrolledTooltip)
- `POPOVER`
- `BREADCRUMB`
- `HEADER` (faixa estilo Argon)
- `INPUT GROUP`
- `SELECT`
- `SWITCH`
- `CHECKBOX`
- `RADIO GROUP`
- `LIST GROUP`
- `TIMELINE`
- `ALERT` (referencia)

**Catalogo prioridade media** (apos o catalogo alta, mesma pagina):

- `OFFCANVAS` (painel lateral de filtros)
- `COLLAPSE` (secao recolhivel)
- `BUTTON GROUP` (filtros segmentados)
- `BADGE` (variantes, pill, dot no icone)
- `AVATAR` (tamanhos, imagem, status online)
- `MEDIA OBJECT` (avatar + metadados)
- `CARD` (header com acoes + footer)
- `FORM VALIDATION` (valid/invalid + FormFeedback)
- `TEXTAREA` / `FILE INPUT`
- `DATE RANGE` (De / Ate)
- `TOAST` (feedback pos-acao)
- `TYPOGRAPHY` (titulos, labels, muted)
- `CHART VARIANT` (mini bar sparkline)
- `EMPTY STATE` (lista sem dados)
- `PAGINATION + PAGE SIZE`
- `SKELETON` (placeholder de carregamento)

**Catalogo prioridade baixa** (apos o catalogo media, mesma pagina):

- `CAROUSEL` (slides com controles)
- `JUMBOTRON / HERO`
- `NAVBAR VARIANT` (transparente, mock)
- `PRICING TABLE`
- `LOCK SCREEN`
- `REGISTER`
- `ERROR 404`
- `MAINTENANCE`
- `MAP` (placeholder sem API)
- `FULL CALENDAR` (grade mensal mock)
- `KANBAN` (colunas de status)
- `WIZARD` (passos com navegacao)
- `SORTABLE TABLE` (reordenar colunas)
- `ICONS GALLERY` (amostra Font Awesome)
- `ANIMATIONS` (microinteracao CSS)

**React Select** (final da pagina, apos catalogos):

- `REACT SELECT` (`react-select` combobox com clear, busca e valor padrao Crescente)
- `MULTISELECT ATENDENTE` (filtro multivalor: busca, Selecionar todos, checkboxes)
- `DATE PICKER` (`react-datetime` + calendario PT-BR, Data/Hora inicial e final)

Componentes presentes na pagina de perfil (`/profile`):

- `ProfileHeader` (`page-header` com `page-title`/`page-subtitle`)
- `ProfileSummaryCard` (avatar, `PROFILE.role`, metricas e acao `Trocar foto`)
- `ProfileFormCard` (card principal contendo formulario e mensagem de sucesso)
- `ProfileSuccessAlert` (render condicional via estado `saved`)
- `ProfileForm` (`Form` + `handleSubmit` + `validate`)
- `ProfileNameField` (`Input` + `FormFeedback`)
- `ProfileEmailField` (`InputGroup` + `InputGroupText` + `FormFeedback`)
- `ProfilePhoneField` (`Input` + `FormFeedback`)
- `ProfileLanguageSelectField` (`Input type="select"`)
- `ProfileCityField` (`Input` de texto para cidade)
- `ProfileCountrySelectField` (`Input type="select"`)
- `ProfileBioTextareaField` (`Input type="textarea"` + `FormText`)
- `ProfileNotificationsGroup` (`notifyEmail`, `notifyPush`, `twoFactor` com `Input type="switch"`)
- `ProfileFormActions` (`Cancelar` / `Salvar alteracoes`)

Componentes presentes na pagina de login (`/login`):

- `AuthCard` (`auth-card`)
- `AuthBrand` (`auth-card__brand`)
- `LoginErrorAlert` (render condicional via estado `error`)
- `LoginForm` (`Form` + `handleSubmit`)
- `LoginEmailField` (`InputGroup` + `InputGroupText`)
- `LoginPasswordField` (`InputGroup` + `InputGroupText`)
- `RememberMeCheckbox` (`Input type="checkbox"`)
- `ForgotPasswordLink` (`a[href="#forgot"]`)
- `LoginSubmitButton` (acao principal de autenticacao)
- `SignupLink` (`Link to="#signup"`)

## Como rodar

```bash
npm install
npm run dev
```

App local: <http://localhost:3000>

Build de producao:

```bash
npm run build
npm run preview
```
