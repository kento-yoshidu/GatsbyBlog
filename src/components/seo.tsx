import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
  title: string,
  pagepath: string
}

const Seo: React.VFC<Props> = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            lang
            description
            siteUrl
            locale
          }
        }
      }
    `
  )

  const title = props.title
    ? `${props.title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title

  const description = props.description || site.siteMetadata.description

  const url = props.pagepath
      ? `${site.siteMetadata.siteUrl}${props.pagepath}`
      : site.siteMetadata.siteUrl

  return (
    <Helmet>
      <html lang={site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={site.siteMetadata.locale} />

    </Helmet>
  )
}

/*
Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
*/

export default Seo
