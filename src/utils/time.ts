import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import customParseFormat from 'dayjs/plugin/customParseFormat'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

// import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(customParseFormat)
// dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)
dayjs.locale('zh-cn')

export enum DateFormat {
  'MMM DD YYYY',
  'HH:mm',
  'LLLL',
  'H:mm:ss A',
  'YYYY-MM-DD',
  'YYYY-MM-DD dddd',
  'YYYY-MM-DD ddd',
  'MM-DD ddd',
  'YYYY年MM月DD日 HH:mm',
}

export const parseDate = (
  time: string | Date,
  format: keyof typeof DateFormat,
) => dayjs(time).format(format)

export const relativeTimeFromNow = (
  time: Date | number,
  current = new Date(),
) => {
  if (!time) {
    return ''
  }
  time = new Date(time)
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = +current - +time

  if (elapsed < msPerMinute) {
    const gap = Math.ceil(elapsed / 1000)
    return gap <= 0 ? '刚刚' : `${gap}秒前`
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)}分钟前`
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)}小时前`
  } else if (elapsed < msPerMonth) {
    return `${Math.round(elapsed / msPerDay)}天前`
  } else if (elapsed < msPerYear) {
    return `${Math.round(elapsed / msPerMonth)}个月前`
  } else {
    return `${Math.round(elapsed / msPerYear)}年前`
  }
}
export const dayOfYear = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

export function daysOfYear(year?: number) {
  return isLeapYear(year ?? new Date().getFullYear()) ? 366 : 365
}

export function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}

export const secondOfDay = () => {
  const dt = new Date()
  const secs = dt.getSeconds() + 60 * (dt.getMinutes() + 60 * dt.getHours())
  return secs
}

export const secondOfDays = 86400

export function hms(seconds: number): string {
  // @ts-ignore
  // return [3600, 60] // 00:00:00
  return [60]
    .reduceRight(
      // @ts-ignore
      (p, b) => (r) => [Math.floor(r / b)].concat(p(r % b)),
      (r) => [r],
    )(seconds)
    .map((a) => a.toString().padStart(2, '0'))
    .join(':')
}
