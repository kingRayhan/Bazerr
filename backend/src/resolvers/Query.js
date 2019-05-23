const { forwardTo } = require('prisma-binding')

const Query = {
    async items(parent, args, { prisma }, info) {
        const items = await prisma.query.items(null, info)
        return [...items].reverse()
    },
    item: forwardTo('prisma'),
}

module.exports = Query
