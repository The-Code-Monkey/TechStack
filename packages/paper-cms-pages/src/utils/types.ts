export const capitalizeFirstLetter = ([first, ...rest]: any) =>
  (first === undefined ? '' : first.toUpperCase()) +
  rest
    .join('')
    .split(/(?=[A-Z])/g)
    .map((str: string, i: number) => {
      if (i === 0) return str;
      return capitalizeFirstLetter(str);
    })
    .join(' ');

export const formatFieldNames = (value: string) => {
  if (value === 'id') return 'ID';

  return value
    .split('_')
    .map(str => capitalizeFirstLetter(str))
    .join(' ');
};

export const getFieldType = (
  value: string
): 'text' | 'textarea' | 'number' | 'object' | 'date' | 'checkbox' => {
  switch (value) {
    case 'int':
    case 'bigint': {
      return 'number';
    }
    case 'json': {
      // if (Array.isArray(value)) {
      //   return 'array';
      // }
      return 'object';
    }
    case 'varchar': {
      return 'textarea';
    }
    // case 'timestamp with time zone': {
    //   return 'time';
    // }
    case 'date': {
      return 'date';
    }
    case 'bool': {
      return 'checkbox';
    }
    default: {
      return 'text';
    }
  }
};

export type ImageRecordType = {
  id?: string;
  type?: 'image' | 'image-text';
  value?: Record<string, unknown>;
  order?: number;
  url?: string | Array<string>;
};

export type CarouselRecordType = {
  id: string;
  order: number;
  type: 'carousel';
  value: {
    images?: Array<string>;
    titles?: Array<string>;
    singleTitle: boolean;
    autoPlay: boolean;
    blur?: string;
    shadow?: string;
    showArrows: boolean;
    showIndicators: boolean;
    showStatus: boolean;
    showThumbs: boolean;
    height: string | number;
  };
};

export type DefaultRecordType = {
  id: string;
  type?: string;
  value?: string;
  order: number;
};

export type InnerSectionType = {
  id: string;
  order: number;
  type: 'inner-section';
  value?: Array<RecordType>;
};

export const isImageRecordType = (
  record: RecordType
): record is ImageRecordType =>
  (record as ImageRecordType).type === 'image' ||
  (record as ImageRecordType).type === 'image-text';

export type RecordType =
  | DefaultRecordType
  | ImageRecordType
  | CarouselRecordType
  | InnerSectionType;
