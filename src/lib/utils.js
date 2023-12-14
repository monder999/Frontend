import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const baseURL = 'http://54.198.214.82:5000/api/v1'

const startYear = 1900
const endYear = 2100

export const yearLists = []
for (let year = startYear; year <= endYear; year++) {
  yearLists.push(year)
}

export const headers = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`,
  }
}
