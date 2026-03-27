import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// NextAuth required tables
export const users = sqliteTable('users', {
  id               : text('id').primaryKey(),
  name             : text('name'),
  email            : text('email').unique(),
  emailVerified    : integer('email_verified', { mode: 'timestamp' }),
  image            : text('image'),
  googleId         : text('google_id').unique(),
  createdAt        : integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt        : integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  freeCreditsUsed  : integer('free_credits_used').default(0),
})

export const sessions = sqliteTable('sessions', {
  id           : text('id').primaryKey(),
  sessionToken : text('session_token').unique(),
  userId       : text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  expires      : integer('expires', { mode: 'timestamp' }),
})

export const accounts = sqliteTable('accounts', {
  id                : text('id').primaryKey(),
  userId            : text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  type              : text('type'),
  provider          : text('provider'),
  providerAccountId : text('provider_account_id'),
  refresh_token     : text('refresh_token'),
  access_token      : text('access_token'),
  expires_at        : integer('expires_at'),
  token_type        : text('token_type'),
  scope             : text('scope'),
  id_token          : text('id_token'),
  session_state     : text('session_state'),
})

export const verificationTokens = sqliteTable('verification_tokens', {
  identifier : text('identifier'),
  token      : text('token'),
  expires    : integer('expires', { mode: 'timestamp' }),
})

// Application table: life number calculations
export const calculations = sqliteTable('calculations', {
  id          : text('id').primaryKey(),  // UUID v4
  userId      : text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  birthdate   : text('birthdate').notNull(),  // 'YYYY-MM-DD'
  name        : text('name').notNull(),
  lifeNumber  : integer('life_number').notNull(),
  lang        : text('lang').default('zh'),
  reportText  : text('report_text'),
  createdAt   : integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  fingerprint : text('fingerprint'),
  isPaid      : integer('is_paid').default(0),
  question    : text('question'),
  queryYear   : integer('query_year'),
})
