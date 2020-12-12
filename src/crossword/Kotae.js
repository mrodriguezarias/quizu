import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  top: 700px;
`

const Letters = styled.div`
  display: inline-flex;
  background: black;
  padding: 3px;
  padding-right: 0;
  margin-left: 5px;
`

function Letter({ letter, answer }) {
  return (
    <div style={{ width: 50, height: 50, marginRight: 3 }}>
      <svg viewBox="0 0 100 100">
        <g style={{ cursor: "default", fontSize: 60 }}>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="#DE3163"
            stroke="rgb(0,0,0)"
            stroke-width="0.16666666666666669"
          ></rect>
          <text
            x="50"
            y="60"
            text-anchor="middle"
            dominant-baseline="middle"
            style={{ fill: "rgb(0,0,0)" }}
          >
            {answer}
          </text>
          <text
            x="95"
            y="5"
            text-anchor="end"
            dominant-baseline="hanging"
            style={{ fontSize: "50%", fill: "rgba(0, 0, 0, 0.25)" }}
          >
            {letter}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default function Kotae({ answerA, answerB, answerC, answerD }) {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "150px",
        }}
      >
        <strong>
          <ruby>
            <rb>答</rb>
            <rt>こた</rt>
          </ruby>
          え：
        </strong>
        <Letters>
          <Letter letter="A" answer={answerA} />
          <Letter letter="B" answer={answerB} />
          <Letter letter="C" answer={answerC} />
          <Letter letter="D" answer={answerD} />
        </Letters>
      </div>
    </Wrapper>
  )
}
