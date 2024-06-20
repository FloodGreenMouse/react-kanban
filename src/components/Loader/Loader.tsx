import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import styled, { keyframes } from 'styled-components'


interface Loader {
  show?: boolean
}

export default function Loader ({show}: Loader) {
  const nodeRef = useRef<HTMLDivElement | null>(null)

  return createPortal(
    (<>
      <CSSTransition nodeRef={nodeRef} in={show} timeout={200} classNames="fade" unmountOnExit>
        <LoaderComponent ref={nodeRef}>
          <Logo>
            <span>Kanban</span>
            <Spinner/>
          </Logo>
        </LoaderComponent>
      </CSSTransition>
    </>),

    document.getElementById('loader')!
  )
}

const LoaderComponent = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  z-index: 999;
`

const Logo = styled.div`
  position: relative;
  user-select: none;

  span {
    font-size: 40px;
    font-weight: 700;
  }
`

const spinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  position: absolute;
  right: -25px;
  top: -25px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 4px solid;
  border-color: transparent #333333 #333333;
  animation: ${spinnerAnimation} 0.9s linear forwards infinite;
`