import { createContext, ReactNode, useState } from 'react'

interface Provider {
  children: ReactNode
}

export const CreateTaskModalContext = createContext({
  showCreateTaskModal: false,
  closeModal: () => {},
  openModal: () => {}
})

export default function CreateTaskModalContextProvider ({children}: Provider) {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false)

  const closeModal = () => {
    setShowCreateTaskModal(false)
  }

  const openModal = () => {
    setShowCreateTaskModal(true)
  }

  const value = {
    showCreateTaskModal,
    closeModal,
    openModal
  }

  return (
    <CreateTaskModalContext.Provider value={value}>
      {children}
    </CreateTaskModalContext.Provider>
  )
}