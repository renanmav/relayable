import styled from 'styled-components'

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`

export const MainContentInline = styled.div`
  position: relative;
`

export const HeadlineText = styled.h1`
  align-self: flex-start;
  margin: auto 0 auto 36px;
  z-index: 10;
  color: white;
  max-width: 1200px;
`

export const VectorGraphic = styled.img`
  position: absolute;
  align-self: flex-end;
  max-width: 100%;
  bottom: 0;
  z-index: 10;
`

export const GradientBackdrop = styled.img`
  width: 100%;
  z-index: 1;
`
