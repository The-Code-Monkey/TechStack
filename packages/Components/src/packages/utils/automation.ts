export const generateAutomationId = (string: string) =>
  string
    .toLowerCase()
    .replace(/-|\s/g, '_')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
