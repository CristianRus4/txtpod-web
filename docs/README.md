# txtpod website documentation

This directory documents the public `txtpod.app` marketing and support site.
The signed-in web application is a separate surface owned by the app repository.

## Start here

| Work | Read |
| --- | --- |
| Domains, pages, architecture, or system boundaries | [Site blueprint](SITE_BLUEPRINT.md) |
| Copy, SEO, legal/support changes, release, or incident work | [Marketing and operations](MARKETING_AND_OPERATIONS.md) |
| iOS, web-app, Firebase, feed, and processing behavior | [txtpod app blueprint](../../../Apps/txtpod-app/docs/APP_BLUEPRINT.md) |
| Product direction | [txtpod product strategy](../../../Apps/txtpod-app/docs/PRODUCT_STRATEGY.md) |
| Nexus ownership | [Nexus project](nexus/PROJECT.md) and [website operations](nexus/WEBSITE.md) |

## Identity and surfaces

- Product: **txtpod**
- Public site: `https://txtpod.app`
- Signed-in web app: `https://web.txtpod.app`
- App Store ID: `6748379680`
- iOS bundle identifier: `cr.txtpod`
- Marketing source: this repository
- iOS, web app, feed, processing, and Firebase source: `Apps/txtpod-app`

## Ownership contract

This repository is authoritative for public marketing, support, privacy, terms,
download redirects, crawler metadata, and sample media. The application
repository is authoritative for shipped behavior and service architecture.
Neither site copy nor support prose may define a capability the product does
not implement.

The Nexus manifest includes `docs/**/*.md`; committed documentation syncs after
a push to main.
