import React from 'react'
import LoginBtn from '@yotta/web/src/components/LoginBtn'
import YottaLogo from '@yotta/web/src/components/YottaLogo'

import { Navbar, NavbarInner } from './styles'

const NavbarComponent = () => (
  <Navbar>
    <NavbarInner>
      <YottaLogo img='assets/img/yotta-logo.svg' />
      <LoginBtn>Login with GitHub</LoginBtn>
    </NavbarInner>
  </Navbar>
)

export default NavbarComponent
