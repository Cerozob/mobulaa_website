import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'mobulaa'

const routes = [
    {
        type: 'banner',
        path: '/:uid',

    },
    {
        type: 'product',
        path: '/:uid',
    }
]

export const client = prismic.createClient(repositoryName, { routes })

/**
 * @param {string} type, must be one of the following: "Smartphone", "Smartwatch", "Basicphone". Defaults to "Smartphone"
 * @param {number} page, defaults to 1
 * @param {number} pageSize, defaults to 100
 */
export async function findProductsByType(type = "Smartphone", page = 1, pageSize = 100) {

    return await client
        .get({
            pageSize: pageSize,
            page: page,
            predicates: [
                prismic.predicate.at("document.type", "product"),
                prismic.predicate.at("my.product.type", type)
            ],
        })
}