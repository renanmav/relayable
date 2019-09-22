import styled from 'styled-components'

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Open Sans';
  color: var(--theme-pink);
  flex-grow: 1;
`

export const HeadlineText = styled.h1`
  align-self: flex-start;
  margin: auto 0 auto 36px;
`

export const VectorGraphic = styled.img`
  position: absolute;
  align-self: flex-end;
  max-width: 100%;
  bottom: 0;
`

export const GradientBackdrop = styled.img`
  height: 40vh;
`
