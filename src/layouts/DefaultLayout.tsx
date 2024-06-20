import { Outlet } from 'react-router-dom'
import Loader from '@/components/Loader/Loader.tsx'
import Header from '../components/Header/Header.tsx'
import ModalCreateNewTask from '../components/ModalCreateNewTask/ModalCreateNewTask.tsx'
import ContextProvider from '@/utils/contexts/index.tsx'
import { useEffect, useState } from 'react'

export function DefaultLayout () {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false)
    }, 500)
  }, [])

  return (
    <>
      <ContextProvider>
        <Loader show={showLoader} />
        <Header/>
        <ModalCreateNewTask/>
        <Outlet/>
      </ContextProvider>
    </>
  )
}