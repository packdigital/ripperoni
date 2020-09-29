/* eslint-disable max-lines */
/* eslint-disable import/no-default-export */

export default {
  "name": "Hero",
  "path": "themes/gatsby-theme-ripperoni-componenets/src/components/Hero/Hero.jsx",
  "content": {
    "image": {
      "displayName": "Image",
      "types": ["atomImage"]
    },
    "test_ContentRawText": {
      "displayName": "Raw Text",
      "types": ["text"]
    }
  },
  "slots": {
    "X": {
      "X": {
        "displayName": "Raw Text - Slot Test",
        "types": ["text"]
      }
    },
    "A": {
      "A": {
        "displayName": "A",
        "types": ["text", "atomText"]
      }
    },
    "AB": {
      "A": {
        "displayName": "A",
        "types": ["atomText"]
      },
      "B": {
        "displayName": "B",
        "multiple": true,
        "types": ["atomText", "atomLink"]
      }
    },
    "ABC": {
      "A": {
        "displayName": "A",
        "types": ["atomText"]
      },
      "B": {
        "displayName": "B",
        "types": ["atomText"]
      },
      "C": {
        "displayName": "C",
        "types": ["atomLink"]
      }
    }
  },
  "grids": [
    {
      "slots": "X",
      "displayName": "X",
      "grid": {
        "areas": "'X'",
        "alignContent": "center",
        "justifyContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", "X", "X", "X", "X", "X", "X", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "A",
      "displayName": "A",
      "grid": {
        "areas": "'A'",
        "alignContent": "center",
        "justifyContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", "A", "A", "A", "A", "A", "A", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "A",
      "displayName": "A",
      "grid": {
        "areas": "'A'",
        "alignContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        ["A", "A", "A", "A", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "A",
      "displayName": "A",
      "grid": {
        "areas": "'A'",
        "alignContent": "center",
        "justifyContent": "end"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "A", "A", "A", "A"],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "AB",
      "displayName": "A+B",
      "grid": {
        "areas": "'A A A A' '. B B .'",
        "alignContent": "center",
        "justifyContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", "A", "A", "A", "A", "A", "A", "."],
        [".", ".", "B", "B", "B", "B", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "AB",
      "displayName": "A+B",
      "grid": {
        "areas": "'A A' 'B .'",
        "alignContent": "end",
        "justifyContent": "start"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "."],
        ["A", "A", "A", ".", ".", "."],
        ["B", "B", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "ABC",
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A A' 'B B' 'C .'",
        "columns": "repeat(2, fit-content(25%))",
        "alignContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        ["A", "A", "A", "A", ".", ".", ".", "."],
        ["B", "B", "B", "B", ".", ".", ".", "."],
        ["C", "C", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "ABC",
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A A' 'B B' 'C .'",
        "columns": "repeat(2, fit-content(25%))",
        "alignContent": "center",
        "justifyContent": "end"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "A", "A", "A", "A"],
        [".", ".", ".", ".", "B", "B", "B", "B"],
        [".", ".", ".", ".", "C", "C", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "ABC",
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A A A A' '. B C .'",
        "alignContent": "center",
        "justifyContent": "center"
      },
      "thumbnail": [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", "A", "A", "A", "A", "A", "A", ".", "."],
        [".", ".", ".", "B", "B", "C", "C", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
      ]
    },
    {
      "slots": "A",
      "disabled": true,
      "displayName": "A",
      "grid": {
        "areas": "'A'",
        "textAlign": "center"
      },
      "thumbnail": [
        ["A", "A", "A", "A"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."]
      ]
    },
    {
      "slots": "A",
      "disabled": true,
      "displayName": "A",
      "grid": {
        "areas": "'A'",
        "alignContent": "end",
        "textAlign": "center"
      },
      "thumbnail": [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["A", "A", "A", "A"]
      ]
    },
    {
      "slots": "AB",
      "disabled": true,
      "displayName": "A+B",
      "grid": {
        "areas": "'A' 'B'",
        "alignContent": "start",
        "textAlign": "center"
      },
      "thumbnail": [
        ["A", "A", "A", "A"],
        ["B", "B", "B", "B"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."]
      ]
    },
    {
      "slots": "AB",
      "disabled": true,
      "displayName": "A+B",
      "grid": {
        "areas": "'A' 'B'",
        "alignContent": "end",
        "textAlign": "center"
      },
      "thumbnail": [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["A", "A", "A", "A"],
        ["B", "B", "B", "B"]
      ]
    },
    {
      "slots": "AB",
      "disabled": true,
      "displayName": "A+B",
      "grid": {
        "areas": "'A' 'B'",
        "alignContent": "space-between",
        "textAlign": "center"
      },
      "thumbnail": [
        ["A", "A", "A", "A"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["B", "B", "B", "B"]
      ]
    },
    {
      "slots": "ABC",
      "disabled": true,
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A' 'B' 'C'",
        "alignContent": "end",
        "textAlign": "center"
      },
      "thumbnail": [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["A", "A", "A", "A"],
        ["B", "B", "B", "B"],
        ["C", "C", "C", "C"]
      ]
    },
    {
      "slots": "ABC",
      "disabled": true,
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A A' 'B C'",
        "alignContent": "end",
        "textAlign": "center"
      },
      "thumbnail": [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["A", "A", "A", "A"],
        ["B", "B", "C", "C"]
      ]
    },
    {
      "slots": "ABC",
      "disabled": true,
      "displayName": "A+B+C",
      "grid": {
        "areas": "'A' '.' 'B' 'C'",
        "rows": "auto 1fr auto auto",
        "alignContent": "end",
        "textAlign": "center"
      },
      "thumbnail": [
        ["A", "A", "A", "A"],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        ["B", "B", "B", "B"],
        ["C", "C", "C", "C"]
      ]
    }
  ]
}
