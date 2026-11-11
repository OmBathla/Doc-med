<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b626173a-ae39-4e94-a322-483417dccc4c

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Hallmark design skill

DocMed includes the [Hallmark](https://github.com/Nutlope/hallmark) design skill for Codex and other compatible coding agents. The skill lives in `.agents/skills/hallmark` and includes its prompts, references, themes, and helper scripts.

In Codex, invoke it with `$hallmark` when creating a new page or component. To redesign an existing part of DocMed, explicitly name the target, for example `$hallmark redesign src/components`.

Hallmark is MIT licensed; see `.agents/skills/hallmark/LICENSE`. Hallmark's photo catalog refers to external Wikimedia Commons images; each image retains its own license and should be credited if used.

### Current Hallmark redesign

The dashboard, report upload dialog, and shared app chrome use Hallmark's Dose theme: warm paper surfaces, restrained pharmacy green, Schibsted Grotesk headings, and Instrument Sans body text. The existing report ledger, upload flow, navigation, handlers, and medical copy are retained. The theme tokens are in `src/tokens.css` and `src/base.css`.
