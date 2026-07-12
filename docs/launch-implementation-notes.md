# SHN WayFinder Launch Implementation Notes

## Assumptions

- The attached `WayFinder Updated Maps S26` zip is the launch source for Centenary maps.
- The attached Birchmount and Centenary CSV files are the launch source for directory data.
- The website launch pass excludes Google Form and slide-deck edits.
- Centenary map matches use exact filenames or approved aliases only; weak fuzzy matches are documented instead of rendered.
- For Centenary entries that require Tower elevators and are not on floors 1 or 2, the Floor 1 main-copy map is used as the Step 1 elevator map.

## Required Vercel Environment Changes

- `REACT_APP_SITE_SCOPE=all`
- `REACT_APP_DEFAULT_SITE=birchmount`

## Preview Deployment

- Branch: `shlok/launch-two-site-wayfinder`
- Commit SHA: `a88d1d49244bde8466433b5a5264a0bf98d4a8f2`
- SHN Vercel preview: `https://shn-wayfinder-live-m8xjt4iyv-shn-wayfinder.vercel.app`
- Vercel deployment dashboard: `https://vercel.com/shn-wayfinder/shn-wayfinder-live/6rZTNsuF7va9YwWKWekPGibpxAGC`
- Note: direct unauthenticated preview requests currently redirect to Vercel SSO, so preview review requires Vercel access unless deployment protection is changed.

## Completed Checks

- Production build succeeded with launch env variables.
- CRA test command completed with `--passWithNoTests`; the repo has no test files.
- Static image reference audit passed for Birchmount and Centenary directory CSVs.
- Centenary floor browser map paths all resolve to files in `client/public/images/centenary-maps`.
- Built app route smoke test returned HTTP 200 for `/`, all Birchmount routes, and all Centenary routes through the Express static server.
- SHN Vercel preview deployment completed successfully.

## Manual Verification Still Required

- Vercel preview URL and production-domain behavior after push.
- Browser console and network-panel checks on deployed preview.
- Desktop Chrome, mobile Chrome, and mobile Safari visual checks.
- Keyboard walkthrough of accordions, floor controls, and large map view.
- Arabic and Urdu translation layout checks.
- Vercel Analytics event confirmation for read-aloud events.
