# WT Private - Argon-style Showcase

Showcase de uma dashboard inspirada no Argon Dashboard Pro React
(stack: Bootstrap + reactstrap), com paleta neutra e componentes comuns de admin.

## Stack

- Vite 5 + React 18
- Bootstrap 5 + reactstrap 9
- Chart.js 4 + react-chartjs-2 5
- Font Awesome 6 Free
- SCSS custom (look and feel argon-like)

## Componentes da pagina

Componentes presentes na pagina principal (`/`):

- Sidebar (menu lateral) com opcao de colapsar/expandir
- Topbar com busca, notificacoes e menu de usuario
- Topbar avancada de acoes (dropdowns de IA, notificacoes e conta)
- Date picker de intervalo (campos De e Ate)
- Cards KPI (estatisticas)
- Grafico de linha (Receita) com seletor Hoje/Semana/Mes/Ano
- Grafico de barras (Pedidos por dia)
- Grafico doughnut (Origem do trafego)
- Tabela de pedidos (DataTable) com:
  - Busca
  - Ordenacao por colunas
  - Paginacao
  - Filtro por status
  - Botao de exportar
  - Botao de novo pedido
- Grid operacional de monitoramento (Filas) com:
  - Configuracoes de reordenacao (Shift/Swap)
  - Limpar memoria
  - Visualizacao de colunas com checkboxes
  - Tabela com colunas dinamicas (mostrar/ocultar)
- Painel do supervisor de telefonia:
  - Tabela com acoes por linha (deslogar, pausar, alterar, espionar)
  - Formularios inline por linha
- Layout split panel (conteudo principal + painel lateral de sistema/embed)
- Modal de criacao de pedido com formulario:
  - Codigo, cliente, email, total, status e data
  - Insercao imediata do novo registro na tabela (front-only)
- Lista de atividade recente
- Secao de badges e status pills
- Secao de botoes
- Secao de alertas
- Accordion (FAQ rapido)

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