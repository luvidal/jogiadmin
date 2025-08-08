import { OAuth2Client } from 'google-auth-library'
import { jwtVerify, createRemoteJWKSet } from 'jose'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const microsoftJWKS = createRemoteJWKSet(
  new URL('https://login.microsoftonline.com/common/discovery/v2.0/keys')
)

export async function verifyGoogleToken(token: string) {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  return ticket.getPayload()
}

export async function verifyMicrosoftToken(token: string) {
  const { payload } = await jwtVerify(token, microsoftJWKS, {
    issuer: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0`,
    audience: process.env.AZURE_AD_CLIENT_ID,
  })
  return payload
}

export async function verifyCredentialToken(token: string) {
  try {
    return await verifyGoogleToken(token)
  } catch {
    return await verifyMicrosoftToken(token)
  }
}