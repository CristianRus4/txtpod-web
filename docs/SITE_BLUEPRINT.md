# txtpod site blueprint

## Surface map

| Surface | Role | Owner |
| --- | --- | --- |
| `txtpod.app` | Public marketing, product samples, support, privacy, terms, download | This repository |
| `web.txtpod.app` | Authenticated inbox, exploration, playback, saving, and settings | `Apps/txtpod-app/webapp` on Firebase Hosting |
| iOS app | Capture, processing, playback, feed, accounts, purchases | `Apps/txtpod-app` |
| Private podcast feed | User-specific audio delivery into podcast clients | Firebase Functions/backend in the app repository |

Do not blur the public website and signed-in app. Account state, saved content,
private feeds, processing jobs, and premium access do not belong in this static
repository.

## Technical shape

The site is committed HTML, CSS, JavaScript, images, audio samples, a `CNAME`,
robots file, and sitemap. There is no package manifest or build step. Serve it
locally over HTTP for review:

```bash
npx serve .
```

The inspected repository has no website deployment workflow. `CNAME` points at `txtpod.app`, consistent with a GitHub
Pages-style custom domain, but the publishing branch and external hosting
configuration must be confirmed before relying on automatic deployment.

## Page topology

- `/`: product story, audio samples, features, web login, FAQ, and App Store CTA
- `/support/`: feed setup, web use, voices/languages, PDFs, integrations,
  account, premium, and privacy help
- `/privacy/`: data-processing and third-party disclosure
- `/terms/`: public terms
- `/download.html`: direct App Store redirect
- `/audio/`: committed demonstration episodes
- `/images/`: screenshots, sample artwork, icons, and QR asset
- `/robots.txt` and `/sitemap.xml`: crawler discovery

## Product model reflected on the site

txtpod turns an article, document, or saved text into audio and makes it
available in txtpod and through a private podcast feed. Capture can happen from
iOS, extensions, read-later integrations, scheduled news, or the signed-in web
app. Processing is asynchronous and can fail or take time. Public copy must not
imply that every URL, paywalled page, document, language, voice, podcast client,
or integration is always supported.

The iOS app uses Core Data/CloudKit for its device inbox, while the web inbox is
stored in owner-scoped Firestore and reconciled with app flows. Firebase owns
authentication, web inbox, durable TTS jobs, storage, Functions, feeds, and web
hosting. The static site owns none of that data.

## Privacy and security boundary

- A private feed URL is a bearer secret. Never place a real feed URL in a page,
  sample, screenshot, analytics event, log, issue, or search index.
- Do not publish real user articles, PDFs, job identifiers, auth tokens, email
  addresses, read-later credentials, or storage paths.
- Sample media must have documented permission and must not impersonate or
  misleadingly attribute a generated voice.
- Public extraction guidance must respect publisher terms, subscriptions,
  copyright, and access controls.
- Privacy copy must enumerate the services actually used by the current clients
  and backend, including processing, authentication, storage, analytics,
  purchases, and any error monitoring.

The current public privacy page says Sentry handles crash reporting, but the
inspected iOS project does not link Sentry or Firebase Crashlytics. This must be
reconciled against the production web app and backend before the statement is
treated as verified.
