import app from './app'
import * as Config from './config'

const { IP: HOST_IP, PORT: HOST_PORT } = Config

app.listen(HOST_PORT, () => {
  console.log('Server running - ', HOST_PORT, HOST_IP)
})
