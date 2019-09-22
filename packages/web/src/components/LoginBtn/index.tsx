import React from 'react'

import { LoginBtn } from './styles'

interface IProps {
  children: string
}

const LoginBtnComponent = ({ children }: IProps) => (
  <LoginBtn>{children}</LoginBtn>
)

export default LoginBtnComponent
