# 🗺️ Roadmap de Evolução Técnica (PLAN.md)

Este documento documenta os passos evolutivos planejados para o ecossistema da aplicação, dividido em quatro trilhas técnicas.

---

## 📍 Status Atual (Fase 1 - MVP Científico Concluído)

- [x] Arquitetura Hexagonal / DDD Light isolando o `core/domain`.
- [x] Implementação pura dos modelos Mifflin-St Jeor e Katch-McArdle.
- [x] Cálculo determinístico de TDEE e bandas de incerteza ($\pm 10\%$).
- [x] Motor de prescrição de macronutrientes baseado em literatura esportiva ($g/kg$).
- [x] Validação rigorosa de esquemas Zod (Discriminated Unions).
- [x] Internacionalização bilíngue nativa (`pt-BR` e `en-US`).
- [x] Cobertura de testes unitários com Vitest em runtime nativo.

---

## 🚀 Trilha 1: Camada Full-Stack & Expansão de API

> **Objetivo:** Expor os motores de domínio para clientes externos sem acoplamento.

- [ ] **Next.js Route Handlers (`POST /api/v1/metabolism/calculate`):**
  - Exposição de endpoint REST tipado consumindo diretamente o `computeEnergyMetrics`.
  - Retorno com contratos OpenAPI / Swagger.
- [ ] **Next.js Server Actions:**
  - Permitir submissões progressivas com suporte a cenários sem JavaScript ativo.
- [ ] **Microsserviço em Go ou Python (FastAPI) [Opcional/Monorepo]:**
  - Implementar o mesmo contrato de domínio em Go para comparação de performance (benchmarking de latência e consumo de memória sob carga).

---

## 🎨 Trilha 2: Engenharia de Frontend & Experiência de Uso (UX)

> **Objetivo:** Explorar os recursos mais avançados do ecossistema React 19 e padrões modernos de web apps.

- [ ] **Deep Linking com Type-Safe Search Params (`nuqs`):**
  - Refletir o estado da calculadora diretamente na URL (ex: `/?method=katch&w=80&bf=15&pal=moderate`).
  - Permitir compartilhamento direto de simulações entre treinadores e alunos.
- [ ] **Persistência Local (Local-First):**
  - Custom hook de sincronização desacoplada com `localStorage` para reidratação instantânea dos dados do usuário.
- [ ] **Exportação de Relatório Clínico (PDF / Impressão):**
  - Estilização via `@media print` para geração de relatório limpo contendo metas energéticas e divisão de macros em página única A4.

---

## 🧪 Trilha 3: Qualidade de Engenharia & Testes Avançados

> **Objetivo:** Blindar a interface contra regressões e garantir acessibilidade (a11y).

- [ ] **Testes de Integração de UI (React Testing Library + Vitest + happy-dom):**
  - Cobrir fluxos de interação: digitação, alternância de rádio, feedback de validação em tela e troca de idioma.
- [ ] **Testes End-to-End (Playwright):**
  - Cenários de navegação entre rotas de idioma e regressão visual (Visual Regression Testing).
- [ ] **Acessibilidade (WCAG 2.1 AA):**
  - Validação automatizada de contraste, navegação por teclado e tags ARIA nos seletores customizados.

---

## 🔬 Trilha 4: Fisiologia Avançada & Metabolismo Adaptativo

> **Objetivo:** Elevar a sofisticação matemática do algoritmo para além de fórmulas estáticas.

- [ ] **Algoritmo de TDEE Adaptativo (Feedback Loop):**
  - Implementação de modelo baseado em dados longitudinais (registro diário de ingestão calórica vs. peso corporal ao longo de 2 a 4 semanas).
  - Aplicação de média móvel exponencial (EMA) para estimar o gasto calórico real do usuário eliminando flutuações hídricas.
- [ ] **Equações Adicionais para Atletas:**
  - Adicionar as equações de **Cunningham (1991)** e **Tinsley (2018)** como métodos selecionáveis.
