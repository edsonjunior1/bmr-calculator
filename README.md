# 🔬 Metabolic Engine — Evidence-Based BMR, TDEE & Macro Calculator

[![CI Pipeline](https://github.com/edsonjunior1/bmr-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/edsonjunior1/bmr-calculator/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Next.js](<https://img.shields.io/badge/Next.js-15%2B%20(App%20Router)-black?logo=next.js>)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Vitest](https://img.shields.io/badge/Vitest-5.x-green?logo=vitest)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2F4.0-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A high-precision, production-ready metabolic expenditure and macronutrient distribution engine built with **React 19**, **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

The system is architected around **Clean Architecture** and **Domain-Driven Design (DDD) Light** principles, strictly decoupling mathematical and physiological domain models from UI frameworks and delivery mechanisms.

---

## 📌 Table of Contents

- [Scientific Foundations](#-scientific-foundations)
  - [Predictive Equations](#predictive-equations)
  - [Physiological Uncertainty Intervals](#physiological-uncertainty-intervals)
  - [Macronutrient Prescription Framework](#macronutrient-prescription-framework)
- [Architecture & Design Principles](#-architecture--design-principles)
- [Directory Structure](#-directory-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Roadmap & Evolution](#-roadmap--evolution)
- [Scientific References](#-scientific-references)
- [License](#-license)

---

## 📑 Scientific Foundations

In clinical nutrition and exercise physiology, indirect calorimetry serves as the reference standard (_gold standard_) for assessing Basal Metabolic Rate (BMR) and Resting Metabolic Rate (RMR). Predictive equations are statistical population models that carry an intrinsic margin of error of approximately **$\pm 10\%$**.

This application implements only peer-reviewed equations recognized by clinical consensus.

### Predictive Equations

| Equation            | Primary Literature       | Clinical Indication                                               | Relative Accuracy ($\pm 10\%$) |
| :------------------ | :----------------------- | :---------------------------------------------------------------- | :----------------------------- |
| **Mifflin-St Jeor** | _Mifflin et al. (1990)_  | General population without known body composition                 | ~82% non-obese / ~70% obese    |
| **Katch-McArdle**   | _Katch & McArdle (1996)_ | Athletic and resistance-trained individuals with known body fat % | ~85% in trained subjects       |

#### 1. Mifflin-St Jeor (1990)

Recommended by the _Academy of Nutrition and Dietetics_ systematic review (_Frankenfield et al., 2005_):
$$\text{BMR}_{\text{Men}} = 10 \cdot \text{weight (kg)} + 6.25 \cdot \text{height (cm)} - 5 \cdot \text{age (yr)} + 5$$
$$\text{BMR}_{\text{Women}} = 10 \cdot \text{weight (kg)} + 6.25 \cdot \text{height (cm)} - 5 \cdot \text{age (yr)} - 161$$

#### 2. Katch-McArdle (1996)

Calculates basal metabolism directly from Fat-Free Mass (FFM), eliminating sex and age biases:
$$\text{FFM (kg)} = \text{weight (kg)} \cdot \left(1 - \frac{\text{BF}\%}{100}\right)$$
$$\text{BMR} = 370 + 21.6 \cdot \text{FFM (kg)}$$

---

### Physiological Uncertainty Intervals ($\pm 10\%$)

Commercial fitness applications often display point-estimate outputs (e.g., $2,143\text{ kcal}$), giving users a false illusion of precision.

In reality, biological variance—including mitochondrial efficiency, Non-Exercise Activity Thermogenesis (NEAT), and the Thermic Effect of Food (TEF)—warrants confidence bands. This engine computes an explicit **$\pm 10\%$ confidence interval** for both BMR and TDEE.

$$\text{BMR}_{\text{interval}} = [\text{BMR} \times 0.90,\; \text{BMR} \times 1.10]$$
$$\text{TDEE}_{\text{interval}} = [\text{TDEE} \times 0.90,\; \text{TDEE} \times 1.10]$$

> **Methodological Note on PAL:** Physical Activity Level (PAL) multipliers modulate **TDEE**, not BMR. BMR reflects energy expenditure under absolute resting conditions and remains invariant to exercise frequency.

---

### Macronutrient Prescription Framework

Rather than utilizing arbitrary macro splits (e.g., standard $40/30/30\%$), this engine follows the guidelines of the _International Society of Sports Nutrition (ISSN)_:

1. **Protein ($4\text{ kcal/g}$):** Prioritized based on body weight ($g/kg$):
   - _Moderate Deficit:_ $2.0\text{ g/kg}$ (minimizes lean tissue oxidation)
   - _Aggressive Deficit:_ $2.3\text{ g/kg}$
   - _Maintenance / Surplus:_ $1.8\text{ to }2.0\text{ g/kg}$
2. **Fats ($9\text{ kcal/g}$):** Set at a healthy endocrine baseline ($0.8\text{ g/kg}$), with an absolute floor of $20\%$ of target calories.
3. **Carbohydrates ($4\text{ kcal/g}$):** Allocated from the remaining caloric balance to optimize glycogen replenishment and training capacity:
   $$\text{Carbs (g)} = \frac{\text{Target Calories} - [(\text{Protein (g)} \times 4) + (\text{Fat (g)} \times 9)]}{4}$$

---

## 🏛️ Architecture & Design Principles

┌────────────────────────────────────────────────────────┐
│ Presentation Layer │
│ (React 19, Tailwind CSS, next-intl, Client Hooks) │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Application Layer │
│ (Zod Schemas, Discriminated Unions, Mappers) │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Core Domain Layer │
│ (Pure Deterministic Services, Models, Zero Deps) │
└────────────────────────────────────────────────────────┘

- **Core Domain Isolation (`src/core/domain`):** Pure TypeScript functions. No React, Next.js, or external library dependencies. Computes in $O(1)$ time complexity with zero side effects.
- **Type-Safe Boundary Validation (`src/core/application`):** Zod schemas using `z.discriminatedUnion('method', [...])` to dynamically adapt validation contracts according to the calculation method.
- **Presentation Layer (`src/presentation`):** React 19 controlled components, custom hooks managing reactive states, and `next-intl` providing server-driven bilingual support (`pt-BR` and `en-US`).

---

## 📁 Directory Structure

```text
bmr-calculator/
├── .github/
│   └── workflows/
│       └── ci.yml             # Lint, Typecheck, Test Coverage & Build
├── messages/                  # Internationalization catalogs
│   ├── en-US.json
│   └── pt-BR.json
├── src/
│   ├── app/                   # Next.js App Router (Infrastructure)
│   │   ├── [locale]/
│   │   │   ├── layout.tsx     # Root locale layout with next-intl provider
│   │   │   └── page.tsx       # Server component entry point
│   │   └── globals.css
│   ├── core/
│   │   ├── domain/            # Pure Business Logic (Framework-Agnostic)
│   │   │   ├── models/        # Value objects & typed contracts
│   │   │   │   ├── activity.ts
│   │   │   │   ├── calculation.ts
│   │   │   │   └── nutrition.ts
│   │   │   └── services/      # Deterministic computation algorithms
│   │   │       ├── bmr-engine.ts
│   │   │       ├── katch-mcardle.calculator.ts
│   │   │       ├── mifflin-st-jeor.calculator.ts
│   │   │       └── nutrition-engine.ts
│   │   └── application/       # Application boundaries
│   │       ├── mappers/       # DTO-to-Domain translators
│   │       └── schemas/       # Zod validation schemas
│   ├── presentation/          # User Interface (React 19)
│   │   ├── components/
│   │   │   ├── bmr/           # Domain-specific components
│   │   │   └── ui/            # Reusable UI primitives (Input, Select)
│   │   └── hooks/             # Reactive state orchestration
│   ├── i18n/                  # Routing & request resolution config
│   └── proxy.ts               # Next.js 16+ Edge proxy convention
├── tests/
│   └── unit/
│       └── core/
│           ├── domain/        # Domain unit test suites
│           └── application/   # Schema validation tests
├── vitest.config.mts          # Vitest native ESM configuration
├── tsconfig.json              # Strict TypeScript compiler options
└── package.json


🛠️ Tech Stack

⚬ Framework: Next.js 15+ (App Router, Turbopack, Partial Prerendering)
⚬ UI Library: React 19
⚬ Language: TypeScript 5+ (strict: true)
⚬ Styling: Tailwind CSS
⚬ Validation: Zod v4
⚬ Internationalization: next-intl
⚬ Test Runner: Vitest 5+ (Native V8 runtime execution)
⚬ Icons: Lucide React

🚀 Getting Started

Prerequisites

⚬ Node.js >= 20.19.0 (Node 22 LTS recommended)
⚬ npm >= 10.0.0

Installation

# Clone the repository
git clone [https://github.com/edsonjunior1/bmr-calculator.git](https://github.com/edsonjunior1/bmr-calculator.git)

# Navigate to project directory
cd bmr-calculator

# Install dependencies
npm install


Development Server

npm run dev


Open http://localhost:3000 in your browser. The application will detect your browser language and redirect to /pt-BR or /en-US.

Production Build

# Typecheck and build the static/PPR production bundles
npm run build

# Start production server
npm run start


🧪 Testing & Quality Assurance

Unit test suites target the pure domain engine and validation boundaries, executing in milliseconds without DOM overhead:

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate code coverage report
npm run test:coverage


Continuous Integration (GitHub Actions)

Every pull request and push to main triggers .github/workflows/ci.yml, running:

1. npm run lint (ESLint analysis)
2. npm run typecheck (tsc --noEmit validation)
3. npm run test:coverage (Vitest test suite)
4. npm run build (Next.js production build verification)

🗺️ Roadmap & Evolution

See PLAN.md for detailed technical specifications on upcoming milestones:

⚬ [ ] Full-Stack API Layer: Route Handlers (POST /api/v1/metabolism/calculate) & Server Actions.
⚬ [ ] Deep Linking: Type-safe URL query synchronization using nuqs.
⚬ [ ] Local-First Persistence: Persistent user anthropometric profiles via decoupled hooks.
⚬ [ ] Clinical PDF Export: Print-ready CSS summary reports (@media print).
⚬ [ ] Adaptive TDEE Algorithm: Longitudinal expenditure tracking via Exponential Moving Average (EMA).

📚 Scientific References

1. Mifflin, M. D., St Jeor, S. T., Hill, L. A., Scott, B. J., Daugherty, S. A., & Koh, Y. O. (1990). A new predictive equation for resting energy expenditure in healthy individuals. The American Journal of Clinical Nutrition, 51(2), 241-247.
2. Frankenfield, D., Roth-Yousey, L., & Compher, C. (2005). Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review. Journal of the American Dietetic Association, 105(5), 775-789.
3. Katch, F. I., & McArdle, W. D. (1996). Introduction to Nutrition, Exercise, and Health (4th ed.). Lea & Febiger.
4. Cunningham, J. J. (1991). Body composition as a determinant of energy expenditure: a synthetic review and a proposed general prediction equation. The American Journal of Clinical Nutrition, 54(6), 963-969.
5. Morton, R. W., et al. (2018). A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. British Journal of Sports Medicine, 52(6), 376-384.

📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
```
