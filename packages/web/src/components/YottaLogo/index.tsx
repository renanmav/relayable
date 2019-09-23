import React from 'react'
import { Location } from '@reach/router'

import { YottaLogo } from './styles'

interface IProps {
  img: string
}

const YottaLogoComponent = ({ img }: IProps) => (
  <Location>{({ navigate }) => <YottaLogo src={img} onClick={() => navigate('/')} />}</Location>
)

export default YottaLogoComponent
