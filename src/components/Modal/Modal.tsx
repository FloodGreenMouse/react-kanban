import { createPortal } from 'react-dom'
import IconClose from './IconClose.tsx'
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface InterfacePopup {
  title?: string,
  show: boolean,
  width?: number,
  children?: ReactNode,
  renderTitle?: ReactNode,
  renderActions?: ReactNode,
  onClose?: () => void
}

export default function Modal ({title, renderTitle, renderActions, show, width, children, onClose}: InterfacePopup) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const titleSectionRef = useRef<HTMLDivElement | null>(null)

  const [showTooltip, setShowTooltip] = useState(false)

  const hideBodyScrollbar = () => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '8px'
  }

  const showBodyScrollbar = () => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }

  const onCloseHandler = () => {
    if (titleSectionRef && titleSectionRef.current) {
      titleSectionRef?.current?.removeEventListener('mousedown', onContainerDrag as unknown as EventListener)
    }
    showBodyScrollbar()
    if (onClose) onClose()
  }

  const onEscPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) onCloseHandler()
  }

  const outsideClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.nativeEvent.target === wrapperRef.current) onCloseHandler()
  }

  const onContainerDrag = (e: MouseEvent) => {
    if (!containerRef?.current) return

    localStorage.setItem('kanban_hide_tooltip', 'true')
    setShowTooltip(false)

    const shiftX = e.clientX - containerRef.current.getBoundingClientRect().left
    const shiftY = e.clientY - containerRef.current.getBoundingClientRect().top

    const moveAt = (pageX: number, pageY: number) => {
      if (!containerRef?.current) return
      containerRef.current.style.left = pageX - shiftX + 'px'
      containerRef.current.style.top = pageY - shiftY + 'px'
    }

    const onMouseMove = (e: MouseEvent) => {
      moveAt(e.pageX, e.pageY)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove as unknown as EventListener)
    }

    moveAt(e.pageX, e.pageY)

    document.addEventListener('mousemove', onMouseMove as unknown as EventListener)
    document.addEventListener('mouseup', onMouseUp as unknown as EventListener)
  }

  useEffect(() => {
    if (show) {
      const hasTooltipFlag = !!localStorage.getItem('kanban_hide_tooltip')
      setShowTooltip(!hasTooltipFlag)
      hideBodyScrollbar()
      document.addEventListener('keydown', onEscPress)


      if (titleSectionRef && titleSectionRef.current) {
        titleSectionRef.current?.addEventListener('mousedown', onContainerDrag as unknown as EventListener)
      }
    }

    return () => {
      if (show) {
        if (titleSectionRef && titleSectionRef.current) {
          titleSectionRef?.current?.removeEventListener('mousedown', onContainerDrag as unknown as EventListener)
        }
      }
    }
  }, [show])

  return createPortal(
    (show && <>
      <ModalComponent ref={modalRef}>
        <ModalWrapper onClick={outsideClose} ref={wrapperRef}>
          <ModalContainer ref={containerRef} width={width}>
            {showTooltip && <TooltipInfo>You can drag windows!</TooltipInfo>}
            <ButtonClose onClick={onCloseHandler}>
              <IconClose/>
            </ButtonClose>

            <ModalContent>
              <TitleSection ref={titleSectionRef}>
                {title && <span>{title}</span>}
                {renderTitle && <span>{renderTitle}</span>}
              </TitleSection>

              {children && <BodySection $hasActions={!!renderActions}>{!!renderActions}{children}</BodySection>}

              {renderActions && <ActionsSection>
                {renderActions}
              </ActionsSection>}
            </ModalContent>
          </ModalContainer>
        </ModalWrapper>
      </ModalComponent>
    </>),
    document.getElementById('modal')!
  )
}

const ModalComponent = styled.div``

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  background-color: rgba(232, 236, 238, 0.8);
  z-index: 99;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(#E8ECEE, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #FFFFFF;
  }
`

const ModalContainer = styled.div<{ width?: number }>`
  position: absolute;
  max-height: 100%;
  max-width: ${props => props.width ? props.width + 'px' : '600px'};
  width: 100%;
  min-width: 300px;
  display: block;
  z-index: 101;
`

const ModalContent = styled.div`
  padding: 8px 0;
`

const TitleSection = styled.div`
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 6px 6px 0 0;
  cursor: move;
  user-select: none;

  span {
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
  }
`

const BodySection = styled.div<{ $hasActions: boolean }>`
  padding: ${props => props.$hasActions ? '0 20px' : '0 20px 20px 20px'};
  border-radius: ${props => props.$hasActions ? '0' : '0 0 6px 6px'};
  background-color: #FFFFFF;
`

const ActionsSection = styled.div`
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 0 0 6px 6px;
`

const ButtonClose = styled.button`
  position: absolute;
  top: 16px;
  right: 8px;
  width: 24px;
  height: 24px;
  color: #BAC5CD;
`

const TooltipInfo = styled.span`
  position: absolute;
  max-width: 200px;
  width: 100%;
  right: calc(100% + 10px);
  top: 20px;
  padding: 8px 16px;
  color: #FFFFFF;
  font-weight: 500;
  background-color: #4094F7;
  text-align: center;
  border-radius: 6px;
  
  &:after {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    margin: auto;
    left: 100%;
    width: 10px;
    height: 10px;
    border: 5px solid;
    border-color: transparent transparent transparent #4094F7;
  }
`