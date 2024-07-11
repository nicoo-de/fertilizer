import { TimesheetEntry } from "./TimesheetEntry"
import { TimesheetEntryGap, TimesheetEntryNote, ValidationResult } from "./ValidationResult"

export function validateEntries(entries: TimesheetEntry[]): ValidationResult[] {
  return entries
    .slice()
    .sort((a, b) => a.start.diff(b.start))
    .map((currentEntry, index, entries) => {
      const containsInvalidCharacters = validateNoteText(currentEntry.noteText)
      const gap = validateGap(currentEntry, containsInvalidCharacters, entries[index + 1])
      const note: TimesheetEntryNote = currentEntry.hasNote ?
          { type: containsInvalidCharacters ? "invalidCharacter" : "ok" } :
          { type: "missing" }
      return {
        entry: currentEntry,
        gap,
        note,
      }
    })
}

function validateNoteText(noteText: string | null): boolean {
    return noteText ? RegExp(/\p{Extended_Pictographic}/u).test(noteText) : false
}

function validateGap(firstEntry: TimesheetEntry, containsInvalidCharacters: boolean, secondEntry?: TimesheetEntry): TimesheetEntryGap {
  if (containsInvalidCharacters) return {type: "invalidCharacter"};
  if (!secondEntry || !firstEntry.end) return { type: "ok" }

  const timeDiff = secondEntry.start.diff(firstEntry.end, "minutes")

  if (timeDiff < -1) {
    return {
      type: "overlap",
      minutes: -timeDiff,
    }
  }

  if (timeDiff > 1) {
    return {
      type: "break",
      minutes: timeDiff,
    }
  }

  return { type: "ok" }
}
