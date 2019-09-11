import { Request, Response } from 'koa'
import passport from 'passport'
import { Strategy as FacebokStrategy } from 'passport-facebook'

const { env } = process

const clientID = env.FACEBOOK_CLIENT_ID as string
const clientSecret = env.FACEBOOK_CLIENT_SECRET as string
const apiUrl = env.API_URL as string

passport.use(new FacebokStrategy({
  clientID,
  clientSecret,
  callbackURL: `${apiUrl}/auth/facebook/callback`
}, (accessToken, refreshToken, profile, callback) => {
  console.log(accessToken, refreshToken, profile, callback)
}))

export const authenticateFacebook = (req: Request, res: Response) => new Promise<{ data: any, info: any }>((resolve, reject) => {
  passport.authenticate('facebook', { session: false }, (err, data, info) => {
    if (err) reject(err)
    resolve({ data, info })
  })(req, res)
})
