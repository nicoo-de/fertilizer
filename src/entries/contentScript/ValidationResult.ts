import { TimesheetEntry } from "./TimesheetEntry"

export type ValidationResult = { entry: TimesheetEntry; gap: TimesheetEntryGap; note: TimesheetEntryNote }

export type TimesheetEntryGap =
  | TimesheetEntryOverlap
  | TimesheetEntryBreak
  | {
      type: "invalidCharacters"
      invalidCharacters: string
    }
  | {
      type: "ok"
    }

export type TimesheetEntryOverlap = {
  type: "overlap"
  minutes: number
}

export type TimesheetEntryBreak = {
  type: "break"
  minutes: number
}

export type TimesheetEntryNote =
  | {
      type: "missing"
    }
  | { type: "invalidCharacters" }
  | { type: "ok" }
