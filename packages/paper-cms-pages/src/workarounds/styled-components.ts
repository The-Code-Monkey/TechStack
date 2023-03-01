import styled from 'styled-components';

export * from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const defaultStyled = typeof styled === 'function' ? styled : styled.default;

export { defaultStyled as default };
