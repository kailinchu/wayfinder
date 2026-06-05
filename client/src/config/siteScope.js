const SITE_SCOPE_ALL = 'all';
const FALLBACK_SITE = 'birchmount';

const normalizeSiteKey = (value) => (value || '').trim().toLowerCase();

export const siteScope = normalizeSiteKey(process.env.REACT_APP_SITE_SCOPE) === FALLBACK_SITE
  || normalizeSiteKey(process.env.REACT_APP_SITE_SCOPE) === SITE_SCOPE_ALL
    ? normalizeSiteKey(process.env.REACT_APP_SITE_SCOPE)
    : FALLBACK_SITE;

export const isSingleSitePreview = siteScope !== SITE_SCOPE_ALL;

export const getDefaultSite = (availableSites) => {
  const normalizedSites = availableSites.map((site) => normalizeSiteKey(site));
  const requestedDefault = normalizeSiteKey(process.env.REACT_APP_DEFAULT_SITE);

  if (isSingleSitePreview && normalizedSites.includes(FALLBACK_SITE)) {
    return FALLBACK_SITE;
  }

  if (requestedDefault && normalizedSites.includes(requestedDefault)) {
    return requestedDefault;
  }

  return normalizedSites[0] || FALLBACK_SITE;
};

export const getAllowedSites = (availableSites) => {
  const normalizedSites = availableSites.map((site) => normalizeSiteKey(site));

  if (!isSingleSitePreview) {
    return normalizedSites;
  }

  return normalizedSites.filter((site) => site === getDefaultSite(availableSites));
};

export const isSiteAllowed = (site, availableSites) => (
  getAllowedSites(availableSites).includes(normalizeSiteKey(site))
);
