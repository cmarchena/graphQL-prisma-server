function feed(parent, args, context, info) {
    return context.prisma.query.links({}, info)
}

module.exports = {
    feed
}