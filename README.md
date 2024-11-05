# InteractiveQuizApp

**InteractiveQuizApp** is an interactive quiz application that allows users to test their knowledge on various topics. This project is built with modern web technologies to provide a smooth and dynamic quiz-taking experience.

## Description

This application allows users to choose a category for testing their knowledge and answer single-choice questions. Scores are tracked and displayed at the end of the quiz. New questions and answers for each category can be added dynamically by each user. Quiz data are fetched from the Next.js API for a seamless experience.

The project was developed gradually. Various stages were completed to consolidate knowledge, all of them being merged at the end of the project.

### Technologies Used

- [Next.js](https://nextjs.org/): Framework for server-rendered React applications.
- [React](https://react.dev/) React: JavaScript library for building user interfaces.
- [CSS Modules](https://nextjs.org/docs/pages/building-your-application/styling#css-modules): Scoped CSS for styling components.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have **Node.js (v14+)** and **npm** or **yarn** installed on your machine.

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

## License

This project is licensed under the MIT License.
