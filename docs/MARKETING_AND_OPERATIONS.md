# txtpod marketing and operations

## Message hierarchy

Lead with the outcome: turn something worth reading into an episode the user
can hear in their normal podcast routine. Explain the private feed, iOS capture,
web access, voices/languages, PDF support, and integrations only with the
conditions present in the current product.

Avoid claims that txtpod can extract every page, bypass subscriptions, preserve
all document structure, translate perfectly, clone a real person, work in every
podcast app, or finish instantly. “Private feed” means unlisted and guarded by a
secret URL; it is not a promise that no service processes the content.

## Claim review

For each material claim:

1. Verify the flow in the current iOS app, web app, Firebase Functions, rules,
   and RevenueCat configuration as applicable.
2. Record account, premium, quota, file/type, language/voice, network, extraction,
   and podcast-client limitations.
3. Check every copy of the claim in homepage, FAQ schema, support, privacy,
   terms, metadata, sitemap, samples, and App Store CTA.
4. Update application docs when the product contract changes.

The public site currently describes account creation and premium purchase as
iOS-owned while the web app supports sign-in with the same account. Preserve
that distinction until web onboarding or commerce actually changes.

## Content and SEO quality

- Keep one storefront-consistent App Store ID: `6748379680`.
- Use an absolute canonical URL in source. The homepage currently fills its
  canonical and social URL in JavaScript from the browser location; review this
  because crawlers may evaluate the initial empty value.
- Keep FAQ structured data identical in meaning to visible FAQ answers.
- Update sitemap and robots when routes change.
- Compress screenshots and audio without making samples misleading.
- Verify all sample rights, labels, transcripts/descriptions, keyboard controls,
  and accessible fallbacks.
- Support and legal pages must share navigation, product identity, current dates,
  and contact details.

## Release checklist

Serve the root locally and verify:

- `/`, `/support/`, `/privacy/`, `/terms/`, and `/download.html`;
- App Store and `web.txtpod.app` destinations;
- mobile/desktop layout, keyboard focus, headings, image alternatives, audio
  controls, reduced motion, and console errors;
- sample audio and image paths, case sensitivity, favicon/manifest, sitemap,
  robots, canonical, Open Graph, X metadata, and JSON-LD;
- privacy language against current Firebase, AI/TTS, extraction, analytics,
  RevenueCat, Apple, Google, and monitoring behavior;
- no real feed URLs, user content, credentials, tokens, internal endpoints, or
  unsupported claims.

Because no website deployment workflow is tracked here, document and confirm
the actual hosting source/branch before release. After publishing, check the
custom domain, TLS, redirect, deep pages, sample media, and cache behavior.
Rollback by restoring the last known-good site commit in the configured host.

## Repository documentation

Committed documentation lives in this repository and Context reads it directly.
