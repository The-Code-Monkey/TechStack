import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export type Props = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const Link = ({ children, ...rest }: Props) => {
  return <a {...rest}>{children}</a>;
};

export default Link;
