# Reviewer's Guide: Kerala Ayurveda PDP Enhancement

Welcome to my submission for the Kerala Ayurveda Product Engineering Hiring Assignment. This guide is designed to help you quickly navigate the codebase and evaluate the project against the provided rubric.

## 1. Product Thinking and Prioritization (15 Points)
**Goal**: Move a customer from confusion to confidence.
- **Solution**: I focused on the "Kumkumadi Tailam" product. Customers often wonder: *“Is this oil right for my skin type?”* and *“How exactly do I use it in my routine?”*
- **Implementation**: I built a 3-step "Is this right for me?" questionnaire. Rather than just returning a static list of benefits, it dynamically scores the user's fit and generates a personalized, step-by-step Ayurvedic routine based on their specific dosha/skin type and familiarity level.

## 2. Frontend Craft & Micro-interactions (25 Points)
**Goal**: Premium, responsive, and considered experience (inspired by seed.com).
- **Where to look**: `src/components/PDPEnhancement.tsx` & `src/components/PDPEnhancement.module.css`
- **Highlights**: 
  - Used `framer-motion` for buttery smooth layout transitions between the questionnaire steps.
  - Included a purposeful loading state ("Personalizing your routine...") to build anticipation.
  - Strict adherence to the constraint of *avoiding* Tailwind CSS; used highly organized CSS Modules instead to ensure tight control over the exact aesthetic, relying on custom CSS variables for the Kerala Ayurveda color palette.

## 3. Backend Feature and API Quality (25 Points)
**Goal**: Meaningful backend-dependent capability with validation and tests.
- **Where to look**: `src/app/api/generate-routine/route.ts` & `src/services/routineService.ts`
- **Highlights**:
  - The API endpoint uses `Zod` for strict input validation, returning proper 400 status codes with details on failure.
  - The core business logic (`routineService.ts`) is cleanly separated from the Next.js API route handler, making it easily testable.
  - The logic dynamically alters the match score, generates specific warnings (e.g., advising patch tests for sensitive skin), and alters the number of routine steps (e.g., adding a morning wash for dry skin).

## 4. Architecture, Maintainability, and Testing (10 Points)
**Goal**: Understandable code, clear boundaries, automated tests.
- **Where to look**: `src/services/routineService.test.ts`
- **Highlights**:
  - Wrote Jest unit tests targeting the core routine generation matrix to ensure the conditional logic holds up under different permutations.
  - The Next.js App Router structure keeps server and client components cleanly separated.

## 5. Shopify Implementation & Configurability (10 Points)
**Goal**: Genuine Shopify approach, merchant editable.
- **Where to look**: `shopify/sections/pdp-decision-support.liquid`
- **Highlights**:
  - This is a production-ready Shopify Theme Section that replicates the frontend logic using zero-dependency Vanilla JS and CSS.
  - Contains a `{% schema %}` allowing merchants to natively configure the section title, subtitle, and primary brand color directly from the Shopify Theme Editor without touching any code.

## 6. AI-First Workflow (3 Points)
**Goal**: Active, directed use of AI tools.
- **Where to look**: `README.md` (under "AI-First Workflow Note").
- **Highlights**: I have documented exactly where AI saved time (scaffolding, React-to-Liquid conversion), where I rejected its suggestions (rejecting Tailwind), and how I verified its output (writing unit tests before visual testing).

---

### How to Test Locally

1. **Frontend & Backend**: Run `npm run dev` to start the Next.js prototype at `http://localhost:3000`. You can click through the "Not sure if this is right for you?" flow to see the full UI and API interaction.
2. **Tests**: Run `npm run test` to execute the Jest suite for the backend logic.
3. **Shopify Liquid**: View the `shopify/sections/pdp-decision-support.liquid` file to review the merchant schema and native DOM implementation.
