import memo from 'memoize-one';

const forwardPropHelper =
  (styledProps: Array<string>) =>
  (prop: string, defaultValidatorFn: (p: string) => boolean) => {
    const regex = new RegExp(`^(${styledProps.join('|')})$`);

    if (prop === 'autoid') return true;
    return defaultValidatorFn(prop) && !regex.test(prop);
  };

export const shouldForwardProp = memo(forwardPropHelper);
