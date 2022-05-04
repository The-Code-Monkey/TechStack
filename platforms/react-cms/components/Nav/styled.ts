import styled from 'styled-components';

export const StyledNav = styled.nav`
  border-right: ${p => p.theme.borders[1]} ${p => p.theme.colors.neutrals[0]};
  min-width: ${p => p.theme.sizes[16]};
  width: 10vw;
  height: 100%;
`;

export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: ${p => p.theme.colors.neutrals[4]};
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;

  li {
    display: flex;
    flex-flow: column nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    cursor: pointer;
    border-bottom: ${p => p.theme.borders[1]} ${p => p.theme.colors.neutrals[0]};
  }
`;

export const SignoutLi = styled.li`
  margin-top: auto;
  margin-bottom: 0;
  border-top: ${p => p.theme.borders[1]} ${p => p.theme.colors.neutrals[0]};
`;
