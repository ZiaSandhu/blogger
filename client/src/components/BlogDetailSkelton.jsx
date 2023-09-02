import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={700}
    height={500}
    viewBox="0 0 700 500"
    backgroundColor="#c0c0c0"
    foregroundColor="#aaaaaa"
    {...props}
  >
    <rect x="115" y="5" rx="0" ry="0" width="390" height="20" /> 
    <rect x="115" y="40" rx="0" ry="0" width="97" height="20" /> 
    <rect x="115" y="75" rx="0" ry="0" width="98" height="20" /> 
    <rect x="441" y="75" rx="0" ry="0" width="65" height="20" /> 
    <rect x="115" y="112" rx="0" ry="0" width="390" height="300" />
  </ContentLoader>
)

export default MyLoader

