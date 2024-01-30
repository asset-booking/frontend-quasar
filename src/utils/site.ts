import { Notify } from 'quasar'

export const notifyError = (message: string) => {
  Notify.create({
    color: 'negative',
    position: 'top',
    message,
    icon: 'report_problem'
  })
}
