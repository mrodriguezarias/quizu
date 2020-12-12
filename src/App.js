// import React, { useCallback, useRef, useState } from "react"
import React, { useCallback, useRef, useState } from "react"
import Crossword, { Kotae } from "./crossword"
import styled from "styled-components"

const data = {
  across: {
    4: {
      answer: "タテマエ",
      row: 1,
      col: 8,
      clue:
        "本[ほん]音[ね]ではなく、外[がい]面[めん]的[てき]に表[ひょう]現[げん]された考[かんが]え",
    },
    5: {
      answer: "ツンドク",
      row: 2,
      col: 5,
      clue: "本[ほん]を買[か]って読[よ]んでない",
    },
    7: {
      answer: "トウキョウスカイツリー",
      row: 4,
      col: 0,
      clue:
        "高[たか]さ634メートル、日[に]本[ほん]で一[いち]番[ばん]高[たか]い建[けん]造[ぞう]物[ぶつ]",
    },
    9: {
      answer: "メイジ",
      row: 6,
      col: 0,
      clue:
        "＿＿時[じ]代[だい]けいおうじだいの後[あと]、たいしょうじだいの前[まえ]でした",
    },
    10: {
      answer: "アキハバラ",
      row: 6,
      col: 4,
      clue:
        "アニメが好[す]きなら、日[に]本[ほん]でこの場[ば]所[しょ]に行[い]かなければなりません",
    },
  },
  down: {
    1: {
      answer: "オタク",
      row: 0,
      col: 8,
      clue:
        "アニメ・ゲーム・漫[まん]画[が]などのポップカルチャーの愛[あい]好[こう]者[しゃ]",
    },
    2: {
      answer: "モエ",
      row: 0,
      col: 11,
      clue:
        "アニメキャラクターかアイドルへの可愛[かわい]らしさの感[かん]情[じょう]",
    },
    3: {
      answer: "マンガカ",
      row: 1,
      col: 6,
      clue: "漫[まん]画[が]を描[か]く人[ひと]",
    },
    6: {
      answer: "コウハイ",
      row: 3,
      col: 1,
      clue:
        "私[わたし]はあなたの先[せん]輩[ぱい]なら、あなたは私[わたし]の＿＿＿です",
    },
    8: {
      answer: "イケバナ",
      row: 4,
      col: 7,
      clue: "花[はな]でアレンジを作[つく]る",
    },
  },
}

const Page = styled.div`
  padding: 2em;
  font-size: 2.3vh;
  position: relative;
`

const Header = styled.h1`
  margin-top: 0;
  margin-bottom: 0.5em;
`

// const Commands = styled.div``

// const Command = styled.button`
//   margin-right: 1em;
// `

const CrosswordWrapper = styled.div`
  margin-top: 2em;
  height: 80%;
  // max-width: 50em;

  /* and some fun making use of the defined class names */
  .crossword.correct {
    rect {
      stroke: rgb(100, 200, 100) !important;
    }
    svg > rect {
      fill: rgb(100, 200, 100) !important;
    }
    text {
      fill: rgb(100, 200, 100) !important;
    }
  }

  .clue.correct {
    ::before {
      content: "\u2713"; /* a.k.a. checkmark: ✓ */
      display: inline-block;
      text-decoration: none;
      color: rgb(100, 200, 100);
      margin-right: 0.25em;
    }

    text-decoration: line-through;
    color: rgb(130, 130, 130);
  }
`

// const Messages = styled.pre`
//   background-color: rgb(230, 230, 230);
//   margin: 1em 0;
//   padding: 1em;
// `

// in order to make this a more-comprehensive example, and to vet Crossword's
// features, we actually implement a fair amount...

function App() {
  const crossword = useRef()
  const [answerA, setAnswerA] = useState()
  const [answerB, setAnswerB] = useState()
  const [answerC, setAnswerC] = useState()
  const [answerD, setAnswerD] = useState()

  // const focus = useCallback((event) => {
  //   crossword.current.focus()
  // }, [])

  // const fillAllAnswers = useCallback((event) => {
  //   crossword.current.fillAllAnswers()
  // }, [])

  // const reset = useCallback((event) => {
  //   crossword.current.reset()
  // }, [])

  // We don't really *do* anything with callbacks from the Crossword component,
  // but we can at least show that they are happening.  You would want to do
  // something more interesting than simply collecting them as messages.
  // const [messages, setMessages] = useState([])

  const addMessage = useCallback((message) => {
    // setMessages((m) => m.concat(`${message}\n`))
  }, [])

  // onCorrect is called with the direction, number, and the correct answer.
  const onCorrect = useCallback(
    (direction, number, answer) => {
      addMessage(`onCorrect: "${direction}", "${number}", "${answer}"`)
    },
    [addMessage],
  )

  // onLoadedCorrect is called with an array of the already-correct answers,
  // each element itself is an array with the same values as in onCorrect: the
  // direction, number, and the correct answer.
  const onLoadedCorrect = useCallback(
    (answers) => {
      addMessage(
        `onLoadedCorrect:\n${answers
          .map(
            ([direction, number, answer]) =>
              `    - "${direction}", "${number}", "${answer}"`,
          )
          .join("\n")}`,
      )
    },
    [addMessage],
  )

  // onCrosswordCorrect is called with a truthy/falsy value.
  const onCrosswordCorrect = useCallback(
    (isCorrect) => {
      addMessage(`onCrosswordCorrect: ${JSON.stringify(isCorrect)}`)
    },
    [addMessage],
  )

  // onCellChange is called with the row, column, and character.
  const onCellChange = useCallback(
    (row, col, char) => {
      addMessage(`onCellChange: "${row}", "${col}", "${char}"`)
      if (row === 6 && col === 4) {
        setAnswerA(char)
      } else if (row === 5 && col === 7) {
        setAnswerB(char)
      } else if (row === 0 && col === 8) {
        setAnswerC(char)
      } else if (row === 6 && col === 0) {
        setAnswerD(char)
      }
    },
    [addMessage],
  )

  return (
    <Page>
      <Header>Quizu 〜 クロスワード</Header>

      <p>
        <strong>ソル・ジェネリッヒ</strong>と<strong>マリアノ・アリアス</strong>
        によって作られました
      </p>

      {/* <Commands>
        <Command onClick={focus}>Focus</Command>
        <Command onClick={fillAllAnswers}>Fill all answers</Command>
        <Command onClick={reset}>Reset</Command>
      </Commands> */}

      <CrosswordWrapper>
        <Crossword
          data={data}
          ref={crossword}
          onCorrect={onCorrect}
          onLoadedCorrect={onLoadedCorrect}
          onCrosswordCorrect={onCrosswordCorrect}
          onCellChange={onCellChange}
          useStorage={false}
        />
      </CrosswordWrapper>

      <Kotae
        answerA={answerA}
        answerB={answerB}
        answerC={answerC}
        answerD={answerD}
      />

      {/* <Messages>{messages}</Messages> */}
    </Page>
  )
}

export default App
