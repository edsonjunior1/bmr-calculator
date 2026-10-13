# 🔬 Metabolic Engine: BMR, TDEE & Macro Calculator

Aplicação de alta precisão para estimativa de gasto energético basal, gasto diário total e distribuição de macronutrientes, fundamentada estritamente em literatura científica revisada por pares (_peer-reviewed_).

Construída sobre princípios de **Clean Architecture** e **Domain-Driven Design (DDD) Light**, desacoplando as regras matemáticas e fisiológicas de qualquer dependência de framework ou infraestrutura de UI.

---

## 📑 Fundamentação Científica

Diferente de calculadoras convencionais que aplicam coeficientes arbitrários, este projeto implementa apenas modelos preditivos com respaldo clínico:

| Modelo              | Referência                              | Indicação Clínica                                    | Acurácia Relativa ($\pm 10\%$)         |
| :------------------ | :-------------------------------------- | :--------------------------------------------------- | :------------------------------------- |
| **Mifflin-St Jeor** | _Mifflin et al. (1990), Am J Clin Nutr_ | População geral sem bioimpedância/DEXA               | ~82% em não-obesos / ~70% em obesos    |
| **Katch-McArdle**   | _Katch & McArdle (1996), Sports Nutr_   | Indivíduos com percentual de gordura (BF%) conhecido | ~85% em atletas e praticantes de força |

### Diretrizes de Prescrição Nutricional:

- **Taxa Metabólica Basal (TMB):** Invariante ao nível de atividade física (PAL). Representa estritamente o custo energético em repouso absoluto.
- **Intervalo de Incerteza ($\pm 10\%$):** Reflete a dispersão estatística de eficiência mitocondrial, efeito térmico alimentar (TEF) e NEAT (_Non-Exercise Activity Thermogenesis_).
- **Macronutrientes por Massa Corporal ($g/kg$):** Segue as diretrizes da _International Society of Sports Nutrition (ISSN)_, fixando proteínas ($1{,}8\text{ a }2{,}3\text{ g/kg}$) e gorduras ($0{,}8\text{ g/kg}$ mínimo), alocando carboidratos sobre o balanço calórico restante.

---

## 🏛️ Arquitetura do Software

A estrutura adota separação estrita de camadas:

```text
src/
├── core/
│   ├── domain/              # Regras de Negócio Puras (Zero dependências externas)
│   │   ├── models/          # Entidades, Value Objects e Tipos Estritos
│   │   └── services/        # Motores de Cálculo Determinísticos (BMR & Nutrição)
│   └── application/         # Casos de Uso, Schemas Zod e Mappers de DTO
├── presentation/            # Camada de Interface (React 19 & Tailwind CSS)
│   ├── components/ui/       # Primitivas de UI acessíveis
│   ├── components/bmr/      # Componentes de Domínio da Aplicação
│   └── hooks/               # Custom Hooks reativos e orquestração de estado
├── i18n/                    # Configurações de Internacionalização (next-intl)
└── app/                     # Next.js App Router (Infraestrutura e Rotas)

🛠️ Stack Tecnológica
Runtime & Framework: Next.js 15+ (App Router, Turbopack, Partial Prerendering)
Biblioteca de UI: React 19
Tipagem Estrita: TypeScript 5+ (strict: true)
Estilização: Tailwind CSS
Internacionalização: next-intl (Português Brasileiro e Inglês)
Validação de Contratos: Zod v4 (Discriminated Unions)
Test Runner: Vitest (Execução ultrarrápida no runtime V8 nativo)
🚀 Como Executar
Pré-requisitos
Node.js >= 20.19.0 (Recomendado: Node 22 LTS)
npm >= 10.0.0
```

# Instalar dependências

npm install

# Executar suíte de testes unitários

npm run test

# Executar testes em modo watch

npm run test:watch

# Rodar servidor de desenvolvimento (Turbopack)

npm run dev

# Compilar para produção

npm run build

🧪 Testes Unitários
A camada de domínio e validação conta com cobertura unitária completa:
npm run test:coverage
✓ tests/unit/core/domain/mifflin-st-jeor.calculator.test.ts (2 tests)
✓ tests/unit/core/domain/katch-mcardle.calculator.test.ts (1 test)
✓ tests/unit/core/domain/bmr-engine.test.ts (2 tests)
✓ tests/unit/core/domain/nutrition-engine.test.ts (2 tests)
✓ tests/unit/core/application/bmr-form.schema.test.ts (5 tests)

---

### 3. Pipeline de Integração Contínua (`.github/workflows/ci.yml`)

Para garantir a integridade de qualquer PR ou commit na `main`, o pipeline valida:

1. **Linter** (`next lint`)
2. **Typecheck estrito** (`tsc --noEmit`)
3. **Testes Unitários + Cobertura** (`vitest run --coverage`)
4. **Build de Produção do Next.js** (`next build`)

#### Adicione o script `typecheck` ao `package.json`

Em `package.json`, certifique-se de ter o script `"typecheck"`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```
