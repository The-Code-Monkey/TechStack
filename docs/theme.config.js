// theme.config.js
export default {
  projectLink: 'https://github.com/The-Code-Monkey/TechStack', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/The-Code-Monkey/TechStack/blob/master', // base URL for the docs repository
  titleSuffix: ' – TechStack',
  nextLinks: true,
  prevLinks: true,
  search: true,
  defaultMenuCollapsed: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Andy Wilson.`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <>
      <span>TechStack Docs</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="TechStack: The complete UI repo" />
      <meta name="og:title" content="TechStack: The complete UI repo" />
    </>
  ),
}