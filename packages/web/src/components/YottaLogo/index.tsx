import React from 'react'

import { YottaLogo } from './styles'

interface IProps {
  img: string
}

const YottaLogoComponent = ({ img }: IProps) => <YottaLogo src={img} />

export default YottaLogoComponent
