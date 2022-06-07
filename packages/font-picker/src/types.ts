export type Category =
  | 'sans-serif'
  | 'serif'
  | 'display'
  | 'handwriting'
  | 'monospace';
export type Script =
  | 'arabic'
  | 'bengali'
  | 'chinese-simplified'
  | 'chinese-traditional'
  | 'cyrillic'
  | 'cyrillic-ext'
  | 'devanagari'
  | 'greek'
  | 'greek-ext'
  | 'gujarati'
  | 'gurmukhi'
  | 'hebrew'
  | 'japanese'
  | 'kannada'
  | 'khmer'
  | 'korean'
  | 'latin'
  | 'latin-ext'
  | 'malayalam'
  | 'myanmar'
  | 'oriya'
  | 'sinhala'
  | 'tamil'
  | '​telugu'
  | 'thai'
  | 'vietnamese';
export type SortOption = 'alphabet' | 'popularity';
export type Variant =
  | '100'
  | '100italic'
  | '200'
  | '200italic'
  | '300'
  | '300italic'
  | 'regular'
  | 'italic'
  | '500'
  | '500italic'
  | '600'
  | '600italic'
  | '700'
  | '700italic'
  | '800'
  | '800italic'
  | '900'
  | '900italic';
export interface Font {
  family: string;
  id: string;
  category: Category;
  scripts: Script[];
  variants: Variant[];
  kind?: string;
  version?: string;
  lastModified?: string;
  files?: Record<Variant, string>;
}
export const FONT_FAMILY_DEFAULT = 'Open Sans';
export const OPTIONS_DEFAULTS = {
  pickerId: '',
  families: [],
  categories: [],
  scripts: ['latin'],
  variants: ['regular'],
  filter: () => {
    return true;
  },
  limit: 50,
  sort: 'alphabet',
};
export type FontList = Map<string, Font>;
export interface Options {
  pickerId: string;
  families: string[];
  categories: Category[];
  scripts: Script[];
  variants: Variant[];
  filter: (font: Font) => boolean;
  limit: number;
  sort: SortOption;
}
