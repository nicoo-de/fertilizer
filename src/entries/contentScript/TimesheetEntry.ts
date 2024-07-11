import { Dayjs } from "dayjs"

export interface TimesheetEntry {
  start: Dayjs
  end: Dayjs
  stillRunning: boolean
  hasNote: boolean
  noteText: string
  element: HTMLElement
  id: string
}
