const hapi = require('@hapi/hapi')

const server = hapi.server({
  port: 3000,
  host: 'localhost'
})

const init = async () => {
  await server.start()
  console.log(`Server is running at: ${server.info.uri}`)
}
