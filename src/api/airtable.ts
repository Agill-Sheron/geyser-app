import { VITE_APP_AIR_TABLE_KEY } from '../constants'

export const createCreatorRecord = async (data: any) => {
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Subscribers%20(Funders%2BCreators)', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const createApplicantRecord = async (data: any) => {
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Applicants', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json())
}

export const createApplicantRecordRound2 = async (data: any) =>
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Applicants', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => res)

export const createGrantContributionRecord = async (data: any) =>
  fetch('https://api.airtable.com/v0/appyM7XlNIWVypuP5/Grant%20Contributors', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${VITE_APP_AIR_TABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => res)
