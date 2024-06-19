import { ChangeEvent, FormEvent, useContext, useEffect, useMemo, useState } from 'react'
import { CreateTaskModalContext } from '@/utils/contexts/create-task-modal-context.tsx'
import { TASK_STORAGE_NAME, TASK_PRIORITIES } from '@/utils/constants.ts'
import styled from 'styled-components'
import Modal from '../Modal/Modal.tsx'
import Input from '@/components/Input/Input.tsx'
import Label from '@/components/Label/Label.tsx'
import Button from '@/components/Button/Button.tsx'
import Textarea from '@/components/Textarea/Textarea.tsx'
import Select from '@/components/Select/Select.tsx'
import { TasksContext } from '@/utils/contexts/tasks-context.tsx'

const initForm = {
  id: '',
  name: '',
  description: '',
  status: 'TO_DO',
  priority: 'LOW'
}

export default function ModalCreateNewTask () {
  const { showCreateTaskModal, closeModal } = useContext(CreateTaskModalContext)
  const [form, setForm] = useState(initForm)

  const { updateTasks } = useContext(TasksContext)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const storageData: string | null = localStorage.getItem(TASK_STORAGE_NAME)

    if (!storageData) {
      localStorage.setItem(TASK_STORAGE_NAME, '[]')
    }

    const kanbanTasks = JSON.parse(storageData || '[]')

    kanbanTasks.push(form)

    localStorage.setItem(TASK_STORAGE_NAME, JSON.stringify(kanbanTasks))
    updateTasks()
    closeModal()
  }

  const isFormDisabled = useMemo(() => {
    return !form.name || !form.description
  }, [form])

  useEffect(() => {
    if (showCreateTaskModal) {
      const id = new Date(Date.now()).valueOf().toString()

      setForm({
        ...form,
        id
      })
    }


    if (!showCreateTaskModal) setForm(initForm)
  }, [showCreateTaskModal])

  return (
    <Modal
      show={showCreateTaskModal}
      width={400}
      title="New task"
      onClose={closeModal}
    >
      <form onSubmit={onFormSubmit}>
        <Fields>
          <Field>
            <Label required={true}>Task name</Label>
            <Input value={form.name} name="name" onChange={handleChange}/>
          </Field>
          <Field>
            <Label required={true}>Task description</Label>
            <Textarea value={form.description} name="description" onChange={handleChange}/>
          </Field>
          <Field>
            <Label>Priority</Label>
            <Select onChange={handleChange} name="priority">
              {
                TASK_PRIORITIES
                  .map(priority => <option
                    value={priority.value}
                    key={priority.value}
                  >{priority.name}</option>)
              }
            </Select>
          </Field>
        </Fields>
        <Button disabled={isFormDisabled}>Create</Button>
      </form>
    </Modal>
  )
}

const Fields = styled.div`
  margin-bottom: 16px;
`

const Field = styled.div`
  & + & {
    margin-top: 16px;
  }
`