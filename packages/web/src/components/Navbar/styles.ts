import styled from 'styled-components'

export const Navbar = styled.header`
  display: flex;
  justify-content: center;
  height: 100px;
  background-color: var(--theme-light-grey);
  border-bottom: 0.5px solid var(--theme-dark-grey);
`

export const NavbarInner = styled.nav`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  padding: 0 40px;
`

export const LoginBtn = styled.button`
  border: none;
  text-transform: uppercase;
  font-size: 22px;
  padding: 12px 24px;
  outline: none;
  font-weight: 500;
  color: white;
  cursor: pointer;
  background: var(--theme-pink);
  margin: 20px 0;
  border-radius: 2px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12);

  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  }
`
