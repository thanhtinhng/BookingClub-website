import {CookieOptions} from "express"

const ACCESS_COOKIE='access_token'
const REFRESH_COOKIE='refresh_token'
const CSRF_COOKIE='csrf_cookie'

const COOKIE_SERCURE = process.env.COOKIE_SERCURE
const COOKIE_SAME_SITE = process.env.COOKIE_SAME_SITE

const createCsrfCookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: COOKIE_SERCURE,
  sameSite: COOKIE_SAME_SITE,
  path: '/',
  maxAge
});


