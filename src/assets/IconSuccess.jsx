import * as React from "react"

const IconSuccess = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 24 24"
    className={props.classes}
    stroke="currentColor"
    strokeWidth={3}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
  </svg>
)

export { IconSuccess }
