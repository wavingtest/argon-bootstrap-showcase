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
