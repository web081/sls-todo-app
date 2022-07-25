// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'rhkpxmf85m'
export const apiEndpoint = `https://rhkpxmf85m.execute-api.us-east-1.amazonaws.com/dev/todos`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-nm345ymz.us.auth0.com',            // Auth0 domain
  clientId: 'pIkX8sqLICdCdjxITkB9Cc9xoy6R7bF1',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
