import memo from '@techstack/memoize';

const forwardPropHelper =
  (styledProps: Array<string>) =>
  (prop: string, defaultValidatorFn: (p: string) => boolean) => {
    const regex = new RegExp(`^(${styledProps.join('|')})$`);

    if (prop === 'testid') return true;
    return defaultValidatorFn(prop) && !regex.test(prop);
  };

export const shouldForwardProp = memo(forwardPropHelper);
