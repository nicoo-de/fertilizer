import { Dayjs } from "dayjs"

export interface TimesheetEntry {
  start: Dayjs
  end: Dayjs
  timerRunning: boolean
  hasNote: boolean
  noteText: string | null
  element: HTMLElement
  id: string
}
