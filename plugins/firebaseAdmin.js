let admin

if (process.server) {
  admin = require('firebase-admin')
  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: process.env.PROJECTID,
      clientEmail: process.env.CLIENTEMAIL,
      privateKey: process.env.PRIVATEKEY.replace(/\\n/g, "\n"),
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
}

export default admin