const {
    GraphQLServer
} = require('graphql-yoga')
const {
    Prisma
} = require('prisma-binding')


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
            }, info)
        },
    },
}


const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-graytracker-771/hackernews-node/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})

server.start(() => console.log("Servidor escuchando en http://localhost:4000"))