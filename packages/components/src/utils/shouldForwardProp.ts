import isPropValid from '@emotion/is-prop-valid';
import memo from '@techstack/memoize';

const forwardPropHelper = (styledProps: Array<string>) => (prop: string) => {
  const regex = new RegExp(`^(${styledProps.join('|')})$`);

  if (prop === 'testid') return true;
  return isPropValid(prop) && !regex.test(prop);
};

export const shouldForwardProp = memo(forwardPropHelper);
