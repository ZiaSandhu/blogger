import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={552}
    height={151}
    viewBox="0 0 552 151"
    backgroundColor="#c0c0c0"
    foregroundColor="#aaaaaa"
    {...props}
  >
    <rect x="2" y="12" rx="0" ry="0" width="151" height="152" />
    <rect x="165" y="109" rx="0" ry="0" width="456" height="23" /> 
    <rect x="165" y="28" rx="0" ry="0" width="461" height="23" /> 
    <rect x="165" y="68" rx="0" ry="0" width="456" height="23" /> 
  </ContentLoader>
)

export default MyLoader

