const Mutation = {
    async createItem(parent, args, { prisma }, info) {
        const item = await prisma.mutation.createItem(
            {
                data: {
                    ...args,
                },
            },
            info
        )

        return item
    },
    async updateItem(parent, args, { prisma }, info) {
        const data = {
            ...args,
        }
        delete data.id
        const where = {
            id: args.id,
        }
        const item = await prisma.mutation.updateItem({ data, where }, info)
        return item
    },

    async deleteItem(parent, args, { prisma }, info) {
        const where = {
            id: args.id,
        }

        // Find the item
        const item = await prisma.query.item({ where })

        if (!item) throw new Error('Item not found')

        // checked for permission
        // TODO

        // delete item
        return await prisma.mutation.deleteItem({ where }, info)
    },
}

module.exports = Mutation
