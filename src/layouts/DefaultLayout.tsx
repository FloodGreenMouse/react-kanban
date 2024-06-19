import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header.tsx'
import ModalCreateNewTask from '../components/ModalCreateNewTask/ModalCreateNewTask.tsx'
import ContextProvider from '@/utils/contexts/index.tsx'

export function DefaultLayout () {
  return (
    <>
      <ContextProvider>
        <Header/>
        <ModalCreateNewTask/>
        <Outlet/>
      </ContextProvider>
    </>
  )
}