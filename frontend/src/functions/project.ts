import { Task, TaskMin, TaskWorkWithUser } from "../models";
import { addLeadingZeros } from "./timerController";

export function readableDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  date = new Date(date);
  return (date.getDate().toString() + '. ' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString());
}

export function isClose(date: Date | undefined) {
  if (!date) {
    return ""
  }
  date = new Date(date);
  //432000000 milliseconds = 5 days
  return (date.getTime() - Date.now()) < 432000000;
}

export function projectProgress(tasks: Task[] | TaskMin[] | undefined) {
  if (tasks && tasks.length > 0) {
    let done: number = 0;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (!task.active) { done++ };
    }
    return ((done / tasks.length) * 100).toFixed(0);
  }
  return 0;
}

export function projectTotalTime(tasks: Task[] | undefined) {
  if (tasks) {
    let total: number = 0;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.workHistory) {
        for (let j = 0; j < task.workHistory.length; j++) {
            total += task.workHistory[j].secondsSpent;
        }
      }
    }
    let hours: number = Math.floor(total / 3600);
    total %= 3600;
    let minutes: number = Math.floor(total / 60);
    total %= 60;
    let seconds: number = total;
    return addLeadingZeros(hours, 0) + 'h ' + addLeadingZeros(minutes, 0) + 'm ' + addLeadingZeros(seconds, 0) + 's';
  }
  return 0;
}

export function calcutalTotalTime(work: TaskWorkWithUser[]) {
  let total: number = 0;
  for (let i = 0; i < work.length; i++) {
    total += work[i].secondsSpent;
  }
  return formatSecondsToTime(total);
}

export function formatSecondsToTime(total: number) {
  let hours: number = Math.floor(total / 3600);
  total %= 3600;
  let minutes: number = Math.floor(total / 60);
  total %= 60;
  let seconds: number = total;
  return addLeadingZeros(hours, 2) + 'h ' + addLeadingZeros(minutes, 2) + 'm ' + addLeadingZeros(seconds, 2) + 's';
}