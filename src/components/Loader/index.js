import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader radious={20} height={60} speed={1}>
    {/* Only SVG shapes */}

    <circle cx="30" cy="30" r="18" width="35" height="35" />

    <rect x="60" y="17" rx="4" ry="4" width="300" height="5" />

    <rect x="60" y="33" rx="3" ry="3" width="250" height="5" />
  </ContentLoader>
)

export default Loader
