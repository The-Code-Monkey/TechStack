const getCommonName = (out: { isIE: boolean; isSafari: boolean; isFirefox: boolean; isChrome: boolean; isChromium: boolean; isOpera: boolean; identity?: string; isBlink?: boolean; isWebkit?: boolean; commonName?: string; isEdge?: boolean; }) =>
  out.isEdge
    ? 'edge'
    : out.isIE
    ? 'ie'
    : out.isFirefox
    ? 'firefox'
    : out.isChrome
    ? 'chrome'
    : out.isChromium
    ? 'chromium'
    : out.isOpera
    ? 'opera'
    : out.isSafari
    ? 'safari'
    : 'unknown';

export default getCommonName;
