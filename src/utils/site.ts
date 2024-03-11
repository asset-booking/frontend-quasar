import { AxiosError } from 'axios'
import { Notify } from 'quasar'

export const notifyErrorMessage = (message: string) => {
  Notify.create({
    color: 'negative',
    position: 'top',
    message,
    icon: 'report_problem'
  })
}

export const notifyError = (err: unknown) => {
  if (err instanceof AxiosError) {
    if (err.response?.data?.message) {
      notifyErrorMessage(err.response.data.message)
    } else {
      notifyErrorMessage('Some error occured.')
    }
  } else if (err instanceof Error) {
    notifyErrorMessage(err.message)
  }
}

export const notifySuccessMessage = (message: string) => {
  Notify.create({
    color: 'green',
    position: 'top',
    message,
    icon: 'done'
  })
}
