import React from "react"
import { graphql } from "gatsby"
import { Layout, Listing } from "../components"
import Section from "../components/Section"
import website from "../../config"
import SEO from "../components/SEO"

const Category = ({
  pageContext: { category },
  data: {
    posts: { nodes, totalCount },
  },
  location,
}) => (
  <Layout customSEO>
    <SEO
      title={`Категория: ${category} | ${website.titleAlt}`}
      pathname={location.pathname}
    />
    <Section
      dark={true}
      id="category"
      name={`Категория: ${category}`}
      masthead={true}
    />
    <Section id="category_count" name={`Постов в категории: ${totalCount}`}>
      <Listing posts={nodes} />
    </Section>
  </Layout>
)

export default Category

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    posts: allPrismicPost(
      sort: { fields: [data___date], order: DESC }
      filter: {
        data: {
          categories: {
            elemMatch: {
              category: {
                document: { elemMatch: { data: { name: { eq: $category } } } }
              }
            }
          }
        }
      }
    ) {
      totalCount
      nodes {
        uid
        data {
          title {
            text
          }
          date(formatString: "DD.MM.YYYY")
          categories {
            category {
              document {
                data {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
