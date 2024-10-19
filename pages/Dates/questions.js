export const quizes = [
  {
    category: 'HTML',
    questions: [
      {
        question: 'What are the 3 basic required elements for an HTML page?',
        answers: [
          '<header>, <main>, <footer>',
          '<html>, <body>, <script>',
          '<html>, <head>, <body>',
        ],
        correctAnswer: '<html>, <head>, <body>',
      },
      {
        question:
          'Which attribute of an input type of radio links them together to ensure only one is selected?',
        code: `&lt;input type='radio' ...&gt;`,
        answers: ['role', 'value', 'id', 'name'],
        correctAnswer: 'name',
      },
      {
        question:
          'What are considered the two most important attributes for a form?',
        answers: ['before, after', 'id, class', 'method, action'],
        correctAnswer: 'method, action',
      },
    ],
    id: 1,
  },

  {
    category: 'CSS',
    questions: [
      {
        question:
          'What does the CSS property order for flex items allow you to do?',
        answers: [
          'Specify the direction that flex items appear',
          'Sort flex items by different values (alphabetical, numerical)',
          'Specify which order the flex items appear',
        ],
        correctAnswer: 'Specify which order the flex items appear',
      },
      {
        question: 'How would you set a background color to red?',
        answers: [
          'backgroundcolor: red',
          'bg-color: red',
          'background-color: red',
        ],
        correctAnswer: 'background-color: red',
      },
      {
        question: 'What does box-sizing: border-box do?',
        answers: [
          'Adds a border to the element',
          'Forces the element to maintain rectangular shape',
          'Forces the margin, padding, and border dimensions to be inclusive of its width',
        ],
        correctAnswer:
          'Forces the margin, padding, and border dimensions to be inclusive of its width',
      },
    ],
    id: 2,
  },

  {
    category: 'JS',
    questions: [
      {
        question: 'What is a JavaScript method?',
        answers: [
          'A style of writing out code in a readable way',
          'A type of variable that allows it to be mutable',
          'A property of an object that executes a function',
        ],
        correctAnswer: 'A property of an object that executes a function',
      },
      {
        question: 'What makes an object different than an array?',
        answers: [
          'Objects can contain any data structure, while arrays cannot',
          'Arrays are only useful as a storage medium, while objects can contain functions',
          'Objects associate keys and values, while arrays are simply a list of data',
        ],
        correctAnswer:
          'Objects associate keys and values, while arrays are simply a list of data',
      },
      {
        question: 'When would you use a switch statement?',
        answers: [
          'When you want to produce a random outcome',
          'When you need to switch a boolean to true or false',
          'When you need many differing actions for many specific evaluations',
        ],
        correctAnswer:
          'When you need many differing actions for many specific evaluations',
      },
    ],
    id: 3,
  },
];
