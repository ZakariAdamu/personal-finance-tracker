##### Q1. Brief explanation (in README):

## Project Features
1. Personal Finance Tracker <br/>
This application helps users manage their personal finances by tracking monthly income and expenses across multiple categories.

2. Category-Based Budgeting <br/>
Users can define budgets for different spending categories (e.g., housing, food, transportation, entertainment, utilities) and monitor how their expenses compare to their allocated budgets.

3. Budget Manager Input Form <br/>
A dedicated Budget Manager section allows users to set category budgets using structured input fields. Forms provide an efficient and user-friendly way to collect and manage user data.

4. Date Picker for Transactions <br/>
A date picker component is implemented to simplify date selection and reduce input errors, providing a more convenient alternative to manually entering transaction dates.

5. Budget Progress Tracking <br/>
A dynamic progress bar displays the relationship between the user’s set budget and their current spending, making it easy to visualize how much of each category budget has been used.

6. Color-Based Spending Indicators <br/>
Progress bars use color indicators to quickly communicate budget health:

🟢 Green – spending is within a safe range

🟡 Yellow – spending is approaching the budget limit

🔴 Red – spending is near or exceeding the budget limit

7. Spending Visualization with Pie Chart <br/>
A pie chart visualization provides an overview of how expenses are distributed across different categories, helping users better understand their spending patterns.

8. Monthly Transaction Table <br/>
All financial activities are displayed in a structured table, allowing users to easily review and track their recorded transactions.

9. Monthly Data Filtering <br/>
Users can filter transaction records by month, enabling them to quickly view and analyze financial activities for a specific time period.

##### Q2. What you'd improve with more time
1. With more time I could implement the following:
2. A Theme switcher to enable switching between light and dark mode
3. Connect data to a backend API for improved performance
4. User authentication for personalized usage
5. Share the app with real users, request user feedback and optimize further based on approved feedback
   
##### Q3. Any challenges you faced
1. A major challenge faced was linked to the implementation of the dynamic progress bars for each budget category

##### Q4. Time spent (approximately)
1. The project took me less than a day, roughly 8 to 10 hours.

   ___


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
