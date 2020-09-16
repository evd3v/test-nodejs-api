const hapi = require('@hapi/hapi')
const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-hapi');

const schema = require('./graphql/schema')

const Painting = require('./models/Painting')


mongoose.connect('mongodb+srv://evd3v:evgen57ruS@cluster0.09bej.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
  console.info('connected to db')
})

const init = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.applyMiddleware({
    app,
  });

  await server.installSubscriptionHandlers(app.listener);


  server.route([
    {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      return `<h1>Hello from test API</h1>`
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (req, res) => {
        return Painting.find()
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (req, res) => {
        const { name, url, techniques } = req.payload
        const painting = new Painting({
          name,
          url,
          techniques
        })

        return painting.save()
      }
    },
  ])

  await server.start()
  console.log(`Server is running at: ${server.info.uri}`)
}

init().catch((e) => console.error(e))