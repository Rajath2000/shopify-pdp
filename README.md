# Kerala Ayurveda - PDP Enhancement

This project implements a Shopify Product Detail Page (PDP) Enhancement for Kerala Ayurveda's "Kumkumadi Tailam", focusing on a premium user experience to move customers from confusion to confidence.

## Deliverables Included

1. **React Prototype (Next.js)**: A standalone frontend demonstrating the micro-interactions, responsive design, and backend logic.
2. **Shopify Liquid Implementation**: A ready-to-use section file `shopify/sections/pdp-decision-support.liquid` with merchant configurability.
3. **Backend API**: Next.js App Router API `src/app/api/generate-routine/route.ts` with business logic separated in `src/services/routineService.ts`.
4. **Automated Tests**: Unit tests for the core routine generation logic.

## Architecture & Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS Modules (to meet the strict requirement of avoiding TailwindCSS unless requested).
- **Animations**: Framer Motion for subtle, premium micro-interactions inspired by seed.com.
- **Validation**: Zod for API input validation.
- **Testing**: Jest & TS-Jest.
- **Shopify**: Custom Liquid section containing Vanilla JS and native Schema for merchant configurability.

## Setup & Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the Next.js development server:
   ```bash
   npm run dev
   ```
3. Run the unit tests:
   ```bash
   npm run test
   ```

## Shopify Installation & Merchant Configuration

To add this to a Shopify store:
1. Copy the contents of `shopify/sections/pdp-decision-support.liquid` into a new Section file in your Shopify Theme Editor (e.g., `decision-support.liquid`).
2. Add this section to your Default Product template via the Theme Customizer.
3. **Configurability**: The merchant can edit:
   - **Section Title** (default: "Not sure if this is right for you?")
   - **Section Subtitle** (default: "Take our 3-step routine finder")
   - **Primary Color** (default: Kerala Ayurveda Green `#2C4C3B`)

*Note: The script block in the `.liquid` file is currently mocking the API response for standalone demonstration. In a real environment, you would point `API_URL` to your hosted Next.js endpoint or use an App Proxy.*

## AI-First Workflow Note

As an AI-first product engineer, I actively utilized AI tools (primarily Antigravity powered by Gemini, and Claude) to accelerate boilerplate creation, iterate on UI interactions, and manage context across the stack. Here is a breakdown of my AI workflow for this assignment:

- **Tools Used & Time Saved**: 
  - **Antigravity / Gemini / Claude**: Saved significant time scaffolding the Next.js App Router boilerplate and generating the initial structure for the `PDPEnhancement.module.css`. They were also highly effective in writing the initial Jest test scaffolding and automating the browser-based testing of the React UI.
  - **Image Generation**: Used for rapidly prototyping a high-quality, premium product hero image for Kumkumadi Tailam without needing to source stock photos.

- **Rejected AI Suggestion**: 
  - The AI strongly suggested initializing the Next.js project with Tailwind CSS (which is the default). I rejected this and opted for vanilla CSS Modules. While Tailwind is fast, using CSS Modules gave me much tighter control over the specific, custom micro-interactions and made translating the CSS into the final Shopify Liquid file cleaner and more portable.

- **Material Corrections**: 
  - When generating the `routineService.ts` business logic, the AI initially produced a static 2-step routine for all users. I materially corrected the logic to dynamically inject specific steps (like morning hydration or toning) based on the complex matrix of the user's skin type (e.g., oily vs. dry) and Ayurvedic familiarity, ensuring the domain logic was authentic and not just a generic output.

- **Example Prompt Workflow**: 
  - *Prompt*: "Generate a React component for a Shopify PDP enhancement. The layout should be split: sticky product image on the left, and a Framer Motion-powered interactive questionnaire on the right. Use CSS Modules. The transitions between questions should feel premium and subtle, similar to seed.com." 
  - *Follow-up*: "Now, abstract the state logic so it can handle a dynamic number of questions and gracefully handle loading/error states before showing the result."

- **Verification Process**: 
  - **Code**: I wrote isolated Jest unit tests (`routineService.test.ts`) to verify that the scoring matrix and routine generation algorithms functioned correctly under various input permutations.
  - **Product**: I ran local browser tests and Next.js builds to ensure the micro-interactions felt smooth (60fps) and that there were no TypeScript or hydration errors.

- **React-to-Liquid Conversion**: 
  - AI was instrumental in accelerating the conversion of the React prototype to the Liquid section (`shopify/sections/pdp-decision-support.liquid`). I used it to map the React `useState` logic and Framer Motion animations into efficient, dependency-free Vanilla JS and CSS transitions that would run natively in a Shopify Theme environment.

- **Future Improvements**: 
  - **Backend**: I would replace the deterministic scoring logic with an actual integration to an LLM (e.g., OpenAI API) to generate highly personalized, context-aware copywriting for the routine tips.
  - **Shopify**: I would build out Shopify Metaobjects to allow the merchant to define the questionnaire questions, answers, and routine mappings entirely from the Shopify Admin panel.
