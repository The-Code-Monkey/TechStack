const getCommonName = out =>
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
