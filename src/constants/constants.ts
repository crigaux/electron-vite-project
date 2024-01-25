export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h2-primary'
  | 'h3'
  | 'text'
  | 'text-light'
  | 'tiny-text'
  | 'span'
  | 'cta'

const BASE_ROUTE_API = 'https://back-rently.mathieudacheux.fr'

const ROUTE_API = {
  // Auth
  AUTH: `${BASE_ROUTE_API}/authentifications`,
  // Role
  ROLE: `${BASE_ROUTE_API}/roles`,
  // User by mail
  USER_BY_MAIL: `${BASE_ROUTE_API}/users/users_filter?mail=`,
  // Users filters
  USERS: `${BASE_ROUTE_API}/users/users_filter?`,
  // Property filters
  PROPERTY_FILTERS: `${BASE_ROUTE_API}/properties/properties_filter?`,
  // Property types
  PROPERTY_STATUS: `${BASE_ROUTE_API}/statuses`,
  // All images
  IMAGES: `${BASE_ROUTE_API}/file/img/`,
  // Address
  ADDRESS: `${BASE_ROUTE_API}/addresses/`,
  // Chat
  GET_CHAT: `${BASE_ROUTE_API}/messages`,
  POST_CHAT: `${BASE_ROUTE_API}/messages`,
}

const MONTHS = [
  'months.january',
  'months.february',
  'months.march',
  'months.april',
  'months.may',
  'months.june',
  'months.july',
  'months.august',
  'months.september',
  'months.october',
  'months.november',
  'months.december',
]

export { BASE_ROUTE_API, MONTHS, ROUTE_API }

export type TypographyColors = 'primary' | 'secondary' | 'textLight'
