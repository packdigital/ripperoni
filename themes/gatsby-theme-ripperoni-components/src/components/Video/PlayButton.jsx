import React from 'react'
import PropTypes from 'prop-types'

export const PlayButton = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 57 57"
      width='57px'
      height='57px'
    >
      <title>Play Icon</title>
      <path
        d="M29.125,57.625a28.5,28.5,0,1,1,28.5-28.5A28.5322,28.5322,0,0,1,29.125,57.625Zm0-55a26.5,26.5,0,1,0,26.5,26.5A26.53,26.53,0,0,0,29.125,2.625Z"
        transform="translate(-0.625 -0.625)"
        fill="#fff"
      />
      <polygon
        points="39.458 28.572 30.486 33.752 21.515 38.932 21.515 28.572 21.515 18.212 30.487 23.393 39.458 28.572"
        fill="#fff"
      />
    </svg>
  )
}

PlayButton.propTypes = {

}
