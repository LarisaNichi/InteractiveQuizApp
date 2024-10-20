# InteractiveQuizApp

**InteractiveQuizApp** is an interactive quiz application where users can test their knowledge and also add their own questions to the quiz.

## Description

The project was developed gradually, applying _JavaScript_ fundamentals, using the [React](https://react.dev/) library and [Next.js](https://nextjs.org/) framework. Various stages were completed to consolidate knowledge, all of them being merged at the end of the project.

### 🔸 First stage (_Module-1_ branch):

- Entities were defined (questions, quiz and categories);
- Routes were defined using Next.js:
  - Home (pages/index.js)
  - Categories (pages/categories.js)
  - Quiz (pages/quiz/[quizId].js)
  - Question (pages/quiz/[quizId]/question/[questionId].js)
- Navigation between pages was implemented using Next.js routing (next/link).

### 🔸🔸 Second stage (_Module-2_ branch):

- Question were read from newly created questions.json file using getServerSideProps;
- All the pages were update in order to show data from .json file instead of static data;
- New features were added: the correct / wrong answer is shown when clicking an answer, the final score is computed and displayed at the end of the quiz.

### 🔸🔸🔸 Third stage (_Module-3_ branch):

- An API route was created in Next.js (pages/api/questions.js) which returned the questions from questions.json file;
- The Components were modified so that questions were displayed using "useEffect", while data were stored in "state" with "useState";
- A new form was created so that the users could add new questions to the form;
- The questions submitted were added in questions.json file.

### 🔸🔸🔸🔸 Improvements (_Improvements_ branch):

- The added question was connected to the corresponding quiz and displayed in the related quiz;
- Input validations were defined before submitting the form;
- Refactoring of the code from the input form.

## Getting Started

### Installing

1. Open a terminal.
2. Change the current working directory to the location where you want to install the app.
3. Run the command:

```
git clone https://github.com/LarisaNichi/InteractiveQuizApp.git
```

4. Press _Enter_ to create your local clone.
5. Navigate to the working directory where your project was cloned.

### Dependencies

Install packages locally with the command:

```
npm install
```

### Executing program

1. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/questions](http://localhost:3000/api/questions). This endpoint can be edited in `pages/api/questions.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

