const path = require("path")

async function createPages({ graphql, actions, reporter }) {
  const { createPage, createRedirect } = actions

  const { data, errors } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
              pageType
              redirect
            }
            frontmatter {
              blogIndex
            }
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog index page
  const { edges } = data.allMdx
  edges.forEach(({ node }) => {
    if (node.frontmatter.blogIndex !== null) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(
          __dirname,
          `./templates/blog-index.js`,
        ),
        context: {
          id: node.id
        }
      })
    }
  })
}

module.exports = {
  createPages,
}
