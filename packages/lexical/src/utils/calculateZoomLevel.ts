export const IS_FIREFOX = /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(
  navigator.userAgent
);

export function calculateZoomLevel(element: Element | null): number {
  if (IS_FIREFOX) {
    return 1;
  }
  let zoom = 1;
  while (element) {
    zoom *= Number(window.getComputedStyle(element).getPropertyValue('zoom'));
    element = element.parentElement;
  }
  return zoom;
}
