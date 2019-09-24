import styled, { keyframes, css } from 'styled-components'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

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

export const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const smoothBlink = keyframes`
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 0.8;
  }
`

export const Avatar = styled.img<{ loading?: number }>`
  height: 64px;
  width: 64px;
  border-radius: 50%;
  margin-left: 22px;
  cursor: pointer;
  ${({ loading }) =>
    loading === 1 &&
    css`
      animation: ${smoothBlink} 1.5s infinite;
    `}
`

export const useStyles = makeStyles((theme: Theme) => {
  const { primary } = theme.palette
  return createStyles({
    root: { flexGrow: 1 },
    appBar: { display: 'flex', flexDirection: 'row', justifyContent: 'center' },
    toolBar: { maxWidth: 1000, flex: 1 },
    btn: {
      background: primary.main,
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        background: primary.dark,
      },
    },
    avatar: {
      height: 54,
      width: 54,
    },
  })
})
