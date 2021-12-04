import React from "react"
import PropTypes from 'prop-types'
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      location: props.location,
      posts: props.data.allMarkdownRemark.nodes,
      postsPerPage: 7,
      siteTitle: props.data.site.siteMetadata?.title || `LC`
    };
    this.paginate = this.paginate.bind(this);
  }

  paginate = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  render() {
    const { location, siteTitle, posts, currentPage, postsPerPage } = this.state;

    //logic for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginatedPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    //logic for page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    //building page numbers element
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className = {currentPage === number ? 'selected' : ''}
          onClick={this.paginate}
        >
          {number}
        </li>
      )
    })
    
    if (posts.length === 0) {
      return (
        <Layout location={location} title={siteTitle}>
          <SEO title="All recipes" />
          <Bio />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        </Layout>
      )
    }
  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All recipes" />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {paginatedPosts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    {/* <small>{post.frontmatter.date}</small> */}
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
      </Layout>
    )
  }
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object,
    allMarkdownRemark: PropTypes.object
  })
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
