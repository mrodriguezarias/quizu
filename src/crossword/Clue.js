import React, { useCallback, useContext } from "react"
import PropTypes from "prop-types"

import styled, { ThemeContext } from "styled-components"
import { Furigana } from "gem-furigana"

import { CrosswordContext } from "./context"

const ClueWrapper = styled.div.attrs((props) => ({
  className: `clue${props.correct ? " correct" : ""}`,
}))`
  font-size: 1.1em;
  cursor: default;
  background-color: ${(props) =>
    props.highlight ? props.highlightBackground : "transparent"};
`

export default function Clue({
  direction,
  number,
  children,
  correct,
  ...props
}) {
  const { highlightBackground } = useContext(ThemeContext)
  const {
    focused,
    selectedDirection,
    selectedNumber,
    onClueSelected,
  } = useContext(CrosswordContext)

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()
      if (onClueSelected) {
        onClueSelected(direction, number)
      }
    },
    [direction, number, onClueSelected],
  )

  const setInnerHtml = useCallback(() => {
    const ruby = new Furigana(children).ReadingHtml
    const html = `<strong>${number}.</strong> ${ruby}`
    return { __html: html }
  }, [number, children])

  return (
    <ClueWrapper
      highlightBackground={highlightBackground}
      highlight={
        focused && direction === selectedDirection && number === selectedNumber
      }
      correct={correct}
      {...props}
      onClick={handleClick}
      aria-label={`clue-${number}-${direction}`}
      dangerouslySetInnerHTML={setInnerHtml()}
    ></ClueWrapper>
  )
}

Clue.propTypes = {
  /** direction of the clue: "across" or "down"; passed back in onClick */
  direction: PropTypes.string.isRequired,
  /** number of the clue (the label shown); passed back in onClick */
  number: PropTypes.string.isRequired,
  /** clue text */
  children: PropTypes.node,
  /** whether the answer/guess is correct */
  correct: PropTypes.bool,
}

Clue.defaultProps = {
  children: undefined,
  correct: undefined,
}
