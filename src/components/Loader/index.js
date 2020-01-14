import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader radious={20} height={40} speed={1}>
    {/* Only SVG shapes */}
    <rect x="5" y="17" rx="4" ry="4" width="300" height="5" />
    <rect x="5" y="33" rx="3" ry="3" width="50" height="3" />
  </ContentLoader>
)

export default Loader
