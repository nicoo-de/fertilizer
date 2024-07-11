import dayjs from "dayjs"
import { parseTime } from "./parseTime"
import { Timesheet } from "./Timesheet"
import {TimesheetEntry} from "~/entries/contentScript/TimesheetEntry";

function findTimesheetElement() {
  const element = document.getElementById("day-view-entries")
  if (element === null) {
    throw new Error("Failed to find root element for timesheet")
  }
  return element
}

function findTextContent(tableRow: HTMLElement, selector: string) {
  const result = tableRow.querySelector(selector)
  if (result === null || result.textContent === null) {
    throw Error("Failed to find timestamp elements in table row")
  }
  return result.textContent
}

export function findTimesheetInTimeView(): Timesheet {
  const timesheetElement = findTimesheetElement()

  const tableRowElements = Array.from(timesheetElement.querySelectorAll<HTMLElement>(".day-view-entry"))

  const entries = tableRowElements.map((tableRow): TimesheetEntry => {
    const hasNote = tableRow.querySelector(".notes") !== null

    const startTimeText = findTextContent(tableRow, ".entry-timestamp-start")
    const endTimeText = findTextContent(tableRow, ".entry-timestamp-end")
    const noteText = findTextContent(tableRow, ".notes p")

    const start = parseTime(startTimeText)
    const endToday = endTimeText ? parseTime(endTimeText) : dayjs()
    const end = endToday.isBefore(start) ? endToday.add(1, "days") : endToday

    return {
      hasNote: hasNote,
      start: start,
      end: end,
      stillRunning: endTimeText === "",
      noteText: noteText,
      element: tableRow,
      id: `FertilizerEntry${tableRow.id}`,
    }
  })

  return { entries }
}
