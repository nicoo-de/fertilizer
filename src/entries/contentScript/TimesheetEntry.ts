import { Dayjs } from "dayjs"

export interface TimesheetEntry {
  start: Dayjs
  end: Dayjs
  hasNote: boolean
  noteText: string
  element: HTMLElement
  id: string
}
