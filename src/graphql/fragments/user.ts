import { gql } from '@apollo/client'

export const FRAGMENT_EXTERNAL_ACCOUNT = gql`
  fragment ExternalAccount on ExternalAccount {
    id
    accountType
    externalUsername
    externalId
    public
  }
`

export const FRAGMENT_USER_ME = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserMe on User {
    id
    username
    imageUrl
    email
    ranking
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
    }
    ownerOf {
      project {
        id
        name
        image
        thumbnailImage
        title
        status
      }
    }
  }
`

export const FRAGMENT_USER_FOR_PROFILE_PAGE = gql`
  ${FRAGMENT_EXTERNAL_ACCOUNT}
  fragment UserForProfilePage on User {
    id
    bio
    username
    imageUrl
    ranking
    isEmailVerified
    externalAccounts {
      ...ExternalAccount
    }
  }
`

export const FRAGMENT_USER_FOR_AVATAR = gql`
  fragment UserForAvatar on User {
    id
    imageUrl
    email
    username
  }
`

export const FRAGMENT_FUNDER_WITH_USER = gql`
  fragment FunderWithUser on Funder {
    amountFunded
    confirmed
    id
    confirmedAt
    timesFunded
    user {
      id
      username
      externalAccounts {
        externalId
        externalUsername
        id
        accountType
      }
      imageUrl
    }
  }
`
