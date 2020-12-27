import { Link, graphql } from 'gatsby'
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export const pageQuery = graphql`
  query BlogIndexPageQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        pageType
        title
      }
      body
    }
    allMdx(filter: {fileAbsolutePath: {regex: "/(posts)/"  }}) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default function Page({ data: { mdx, allMdx } }) {
  return (
    <div>
      <MDXRenderer>{mdx.body}</MDXRenderer>
      
      {allMdx.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
        </li>
      ))}
    </div>
  );
}
