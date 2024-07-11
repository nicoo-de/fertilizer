import dayjs from "dayjs"
import { TimesheetEntry } from "./TimesheetEntry"

function findTimesheetElement() {
  const element = document.getElementById("day-view-entries")
  if (element === null) {
    throw new Error("Failed to find root element for timesheet")
  }
  return element
}

function parseTime(text: string | null) {
  if(text == null){
    throw Error("Failed to find timestamp elements in table row")
  }
  return dayjs(text, "HH:mm")
}

function findTextContent(tableRow: HTMLElement, selector: string): string | null {
  const result = tableRow.querySelector(selector)
  return result?.textContent ?? null
}

export function findTimesheetEntries(): TimesheetEntry[] {
  const timesheetElement = findTimesheetElement()

  const tableRowElements = Array.from(timesheetElement.querySelectorAll<HTMLElement>(".day-view-entry"))

  return tableRowElements.map((tableRow) => {
    const hasNote = tableRow.querySelector(".notes") !== null

    const startTimeText = findTextContent(tableRow, ".entry-timestamp-start")
    const nodeText = findTextContent(tableRow, ".notes p")
    const endTimeText = findTextContent(tableRow, ".entry-timestamp-end")

    const start = parseTime(startTimeText)
    const endToday = endTimeText ? parseTime(endTimeText) : dayjs()
    const end = endToday.isBefore(start) ? endToday.add(1, "days") : endToday

    return {
      hasNote: hasNote,
      noteText: nodeText,
      start: start,
      end: end,
      timerRunning: endTimeText == "",
      element: tableRow,
      id: `FertilizerEntry${tableRow.id}`,
    }
  })
}
