import path from 'node:path';
import fs from 'node:fs/promises';
import { genSaltSync, hashSync } from 'bcrypt';
import { faker } from '@faker-js/faker';
import type {
  Transaction,
  TransactionStatus,
  RejectionReason,
} from '@rdzcn/common/types';
import { PORT } from './constants';

const PASSWORD = '123code';
const SALT = genSaltSync(10);
const BASE_URL = `http://localhost:${PORT}`;

const getPath = (file: string) => path.join(__dirname, 'data', file);

const smes = [
  {
    id: '6fa0ea41-9249-43d5-8479-81af6a55b946',
    legalName: 'Fellowship GmbH',
    businessType: 'GMBH',
  },
  {
    id: '58c0645c-ce36-4395-9658-9a654cd3f3f9',
    legalName: 'Gollum Enterprises',
    businessType: 'EINZELUNTERNEHMEN',
  },
];

const smeIds = [
  '6fa0ea41-9249-43d5-8479-81af6a55b946',
  '58c0645c-ce36-4395-9658-9a654cd3f3f9',
];

const userIds = {
  '6fa0ea41-9249-43d5-8479-81af6a55b946': [
    'b3f271ef-e73b-4c12-ad85-665c3686017a',
    'f757b26e-444b-45d0-b5a7-e8944a36d70a',
  ],
  '58c0645c-ce36-4395-9658-9a654cd3f3f9': [
    '5fb473af-2413-43ee-b899-7a4835ee607f',
  ],
};

const users = [
  {
    id: 'b3f271ef-e73b-4c12-ad85-665c3686017a',
    smeId: '6fa0ea41-9249-43d5-8479-81af6a55b946',
    name: 'Gandalf the Grey',
    image: 'gandalf.png',
  },
  {
    id: 'f757b26e-444b-45d0-b5a7-e8944a36d70a',
    smeId: '6fa0ea41-9249-43d5-8479-81af6a55b946',
    name: 'Frodo Baggins',
    image: 'frodo.png',
  },
  {
    id: '5fb473af-2413-43ee-b899-7a4835ee607f',
    smeId: '58c0645c-ce36-4395-9658-9a654cd3f3f9',
    name: 'Gollum',
    image: 'gollum.png',
  },
];

const merchants = [
  { image: 'mi-aws.png', name: 'Amazon Web Services' },
  { image: 'mi-figma.png', name: 'Figma' },
  { image: 'mi-github.png', name: 'Github' },
  { image: 'mi-lieferando.png', name: 'Lieferando' },
  { image: 'mi-linkedin.png', name: 'LinkedIn' },
  { image: 'mi-sharenow.png', name: 'Share Now' },
  { image: 'mi-slack.png', name: 'Slack' },
  { image: 'mi-uber.png', name: 'Uber' },
  { image: 'mi-wework.png', name: 'WeWork' },
  { image: 'mi-zendesk.png', name: 'ZenDesk' },
];

const articles = [
  {
    id: "a7e34f3e-7d28-4e2e-b82e-74e28410e121",
    authorId: "b3f271ef-e73b-4c12-ad85-665c3686017a",
    title: "The Rise of TypeScript in Modern Web Development",
    content: "TypeScript has become one of the most popular programming languages in modern web development. It is a superset of JavaScript that provides optional static typing, which can significantly improve the development process by catching errors early and providing a more robust codebase. The adoption of TypeScript has grown rapidly due to its ability to work seamlessly with existing JavaScript code and its powerful developer tooling. With the rise of frameworks like Angular and the integration of TypeScript into popular libraries like React and Vue.js, more developers are turning to TypeScript to manage large-scale applications. It also provides a much better development experience by offering features like autocomplete, better refactoring, and easy debugging, which are crucial for building scalable applications. As the need for maintainable and reliable code grows, the benefits of TypeScript become more apparent. Many companies are now converting their codebases to TypeScript to take advantage of its type-checking capabilities and to ensure fewer bugs in production. Given these trends, it is clear that TypeScript is not just a fad but a critical tool for web developers looking to create stable and high-performance applications."
  },
  {
    id: "b82364e2-df26-4b0e-8b71-78c34d4e59f9",
    authorId: "b3f271ef-e73b-4c12-ad85-665c3686017a",
    title: "Understanding Node.js and Its Impact on Backend Development",
    content: "Node.js has revolutionized backend development by allowing developers to use JavaScript on the server side. Before Node.js, JavaScript was mainly a front-end language, but its introduction created new possibilities for building server-side applications using a single programming language across the stack. One of the significant advantages of Node.js is its non-blocking, event-driven architecture, which makes it highly efficient and capable of handling thousands of simultaneous connections with minimal overhead. This efficiency has led to widespread use in real-time applications, such as chat servers, collaborative tools, and streaming services. Additionally, Node.js has a vast ecosystem of libraries and modules available through npm (Node Package Manager), which accelerates the development process and reduces the amount of boilerplate code needed. With its growing community and its use in popular frameworks like Express.js and NestJS, Node.js has become a go-to choice for building scalable and high-performance backend systems. As the demand for faster and more responsive applications continues to grow, Node.js will likely remain at the forefront of backend development technologies."
  },
  {
    id: "d7f5b5b1-8fcd-4d8b-86f1-53c2c4de073a",
    authorId: "b3f271ef-e73b-4c12-ad85-665c3686017a",
    title: "Exploring the Benefits of React in Front-End Development",
    content: "React has transformed the way we think about building user interfaces in modern web development. Created by Facebook, React's component-based architecture allows developers to build reusable UI components, making code more modular and easier to maintain. One of React's core features is its Virtual DOM, which optimizes updates and renders, leading to faster and more efficient performance. This is particularly beneficial in large-scale applications where frequent UI updates are necessary. React's popularity has led to a large ecosystem of tools and libraries, including state management solutions like Redux and MobX, which help manage complex application states. Another significant benefit is React's support for server-side rendering, which improves SEO and reduces the time it takes for a web page to become interactive. With a robust developer community and extensive documentation, React continues to be a top choice for developers looking to create dynamic and high-performance user interfaces."
  },
  {
    id: "e914ab87-83e4-4a6c-bf13-62a8f7998a35",
    authorId: "b3f271ef-e73b-4c12-ad85-665c3686017a",
    title: "CSS-in-JS: A Modern Approach to Styling in JavaScript",
    content: "CSS-in-JS has emerged as a modern approach to styling web applications, providing a more dynamic and programmatic way of handling CSS. This technique involves writing CSS directly within JavaScript files, which allows styles to be tied closely to the components they are meant to style. Libraries like styled-components and Emotion have popularized this method, enabling developers to leverage JavaScript's full power to manage styles, including variables, logic, and conditional rendering. CSS-in-JS offers advantages like scoped styles, which prevent styles from leaking into other parts of the application, and better integration with JavaScript's logic. Additionally, the ability to generate styles dynamically at runtime helps in creating themeable and adaptable UI components. As the demand for more interactive and dynamic web applications grows, CSS-in-JS provides a solution that aligns with the modern development workflow and supports the trend toward component-driven development."
  },
  {
    id: "f1d6feca-3b1b-4236-bc6d-938a57dc23e2",
    authorId: "b3f271ef-e73b-4c12-ad85-665c3686017a",
    title: "State Management in React: Understanding Redux and Context API",
    content: "State management is a critical aspect of building React applications, and understanding how to handle state effectively can make a significant difference in performance and code maintainability. Two of the most popular solutions for state management in React are Redux and the Context API. Redux provides a predictable state container with a centralized store that makes it easier to manage state changes in a consistent manner. It also offers middleware like Redux Thunk and Redux Saga for handling asynchronous operations, which is crucial in complex applications. On the other hand, the Context API is a built-in solution that allows data to be passed down the component tree without the need to manually pass props at every level. While the Context API is great for simpler state management needs, Redux is generally preferred for large-scale applications due to its robust ecosystem and middleware capabilities. Choosing the right state management solution depends on the complexity of the application and the specific requirements of the project."
  },
  {
    id: "a58d47ea-1e33-4ed3-b4e3-2bb63b4acb7f",
    authorId: "f757b26e-444b-45d0-b5a7-e8944a36d70a",
    title: "The Evolution of Front-End Frameworks: Angular vs. Vue.js",
    content: "Front-end frameworks have evolved significantly over the years, with Angular and Vue.js emerging as two of the most popular choices for modern web development. Angular, developed by Google, is a full-fledged framework that offers a comprehensive solution for building large-scale applications. It provides a powerful set of tools and features, including dependency injection, RxJS, and a well-defined architecture that supports enterprise-level applications. Vue.js, on the other hand, is a progressive framework that focuses on simplicity and ease of integration. It is lightweight and can be adopted incrementally, making it a favorite for developers who need flexibility and quick development. Both frameworks have strong communities and extensive ecosystems, but they cater to different needs. While Angular is ideal for complex, structured applications, Vue.js is often preferred for smaller projects and rapid development. The choice between Angular and Vue.js ultimately depends on the specific project requirements and the developer's familiarity with each framework."
  },
  {
    id: "b9732bfc-6cd5-481f-a2df-9a85e5cd72f7",
    authorId: "f757b26e-444b-45d0-b5a7-e8944a36d70a",
    title: "Server-Side Rendering in Modern Web Applications",
    content: "Server-side rendering (SSR) has become an essential technique in modern web development, especially for improving the performance and SEO of web applications. Unlike client-side rendering, where the browser renders the content, SSR generates the HTML content on the server, which is then sent to the client's browser. This approach significantly reduces the time to the first paint, making the application feel more responsive. SSR is particularly beneficial for applications that require fast load times and better search engine optimization, as search engines can easily index the pre-rendered content. Popular frameworks like Next.js for React and Nuxt.js for Vue have made implementing SSR more accessible and straightforward. These frameworks provide a seamless experience by handling both client-side and server-side rendering out of the box. As web applications continue to grow in complexity, SSR remains a vital tool for developers seeking to enhance user experience and SEO."
  },
  {
    id: "cf439b24-4ab6-4d64-bc59-7f6aef1e973b",
    authorId: "f757b26e-444b-45d0-b5a7-e8944a36d70a",
    title: "Exploring JavaScript's Newest Features: ES2023",
    content: "JavaScript continues to evolve with each new release, and ES2023 brings several exciting features that enhance the language's functionality and ease of use. Among the highlights are improvements to the handling of asynchronous code, with the introduction of new methods for working with Promises. Additionally, ES2023 includes enhancements to the standard library, adding more utility functions that simplify common operations. Another notable feature is the increased focus on security and performance optimizations, which make JavaScript even more efficient for modern web applications. These updates are part of the ongoing efforts to make JavaScript a more robust and versatile language, capable of handling the growing demands of modern software development. As the language evolves, staying up-to-date with these new features will be crucial for developers looking to leverage the latest advancements in their projects."
  },
  {
    id: "d5e6af59-5e3a-4a44-9b18-3c3e04e5287b",
    authorId: "f757b26e-444b-45d0-b5a7-e8944a36d70a",
    title: "Building Scalable APIs with GraphQL",
    content: "GraphQL has transformed the way developers build APIs by providing a more efficient, flexible, and scalable approach compared to traditional REST APIs. One of the main advantages of GraphQL is its ability to allow clients to request exactly the data they need, and nothing more. This level of precision reduces the amount of data transferred over the network, improving the performance of applications. GraphQL's schema-based architecture makes it easier to define the structure of the data and manage changes to the API without breaking existing functionality. Another key feature is its real-time capabilities, which enable applications to receive updates through subscriptions. This makes GraphQL an excellent choice for modern applications that require dynamic data. As more companies adopt GraphQL, it is becoming a critical tool for building scalable and maintainable APIs in the ever-evolving landscape of web development."
  },
  {
    id: "e1b10e59-c43d-42d4-8b6b-14d8e7c68c84",
    authorId: "Jf757b26e-444b-45d0-b5a7-e8944a36d70a",
    title: "The Importance of Performance Optimization in Web Development",
    content: "Performance optimization is a critical aspect of web development that directly affects user experience and engagement. Faster websites lead to higher user satisfaction, better search engine rankings, and increased conversion rates. There are numerous techniques for optimizing web performance, including minimizing HTTP requests, compressing files, using a content delivery network (CDN), and optimizing images. Modern tools like Lighthouse and Webpack have made it easier for developers to identify bottlenecks and improve performance metrics. Additionally, lazy loading, code splitting, and the use of service workers are becoming standard practices to enhance load times and provide a smoother user experience. As the web continues to evolve, focusing on performance optimization is not just an option but a necessity for staying competitive in the digital world."
  }
]


/**
 * Returns a single user, with encrypted password and the profile images
 * pointing to the correct url
 *
 * @param options
 * @returns
 */
const createUser = (options: {
  id: string;
  smeId: string;
  name: string;
  image: string;
}) => {
  const { name, image, id, smeId } = options;
  const email = `${name.toLowerCase().split(' ').join('.')}@test.com`;
  const profileImage = `${BASE_URL}/static/${image}`;

  return {
    id,
    smeId,
    name,
    email,
    profileImage,
    password: hashSync(PASSWORD, SALT),
  };
};

/**
 * Iterates through the predetermined users, calls `createUser` on them,
 * and saves the result to `./data/users.json`
 */
const createUsers = async () => {
  const data = users.map(createUser);
  const filePath = getPath('users.json');

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(
    "✨ Created Users:\x1b[90m packages/api/src/data/\x1b[0musers.json"
  );
  console.log('   Users and passwords:');
  const userTexts = data.map(
    (user) => `     \x1b[32m ${user.email} \x1b[90m/\x1b[32m 123code\x1b[0m`
  );
  for (const userText of userTexts) {
    console.log(userText);
  }
};

/**
 * Saves the SME data to `./data/smes.json`
 */
const createSmeData = async () => {
  const filePath = getPath('smes.json');
  await fs.writeFile(
    filePath,
    JSON.stringify(smes, null, 2),
    'utf-8'
  );
  console.log(
    "✨ Created SMEs:\x1b[90m packages/api/src/data/\x1b[0msmes.json"
  );
};

/**
 * Creates a transaction using faker.
 *
 * @returns
 */
const createTransaction = (): Transaction => {
  const smeId = faker.helpers.arrayElement(smeIds);
  const userId = faker.helpers.arrayElement(
    userIds[smeId as keyof typeof userIds]
  );
  const merchant = faker.helpers.arrayElement(merchants);
  const status: TransactionStatus = faker.helpers.arrayElement([
    'REJECTED',
    'PENDING',
    'COMPLETED',
    'REVERSED',
  ]);

  const rejectionReason: RejectionReason | null =
    status === 'REJECTED'
      ? faker.helpers.arrayElement([
          'NOT_PERMITTED',
          'INSUFFICIENT_FUNDS',
          'CARD_MONTHLY_LIMIT_REACHED',
          'CARD_DAILY_LIMIT_REACHED',
          'CARD_EXPIRED',
          'CARD_SUSPENDED',
          'CARD_NOT_ACTIVE',
          'INCORRECT_PIN',
        ])
      : null;

  return {
    id: faker.datatype.uuid(),
    userId,
    smeId,
    transactionTime: faker.date.recent(180).toISOString(),
    merchantIconUrl: `${BASE_URL}/static/${merchant.image}`,
    merchantName: merchant.name,
    amount: faker.finance.amount(-800, -10),
    currency: faker.helpers.arrayElement(['EUR', 'USD']),
    status,
    rejectionReason,
  };
};

/**
 * Creates a number of transactions and saves them to `./data/transactions.json`
 */
const createTransactions = async () => {
  const NUMBER_OF_TRANSACTIONS = 100;
  const transactions: Transaction[] = [];

  for (let index = 0; index < NUMBER_OF_TRANSACTIONS; index++) {
    transactions.push(createTransaction());
  }

  const sortedTransactions = transactions.sort((a, b) =>
    a.transactionTime < b.transactionTime ? 1 : -1
  );
  const payload = JSON.stringify(sortedTransactions, null, 2);

  const filePath = getPath('transactions.json');
  await fs.writeFile(filePath, payload, 'utf-8');
  console.log(
    "✨ Created Transactions:\x1b[90m packages/api/src/data/\x1b[0mtransactions.json"
  );
};

/**
 * Saves the articles to `./data/articles.json`
 */

const createArticles = async () => {
  const filePath = getPath('articles.json');
  await fs.writeFile(
    filePath,
    JSON.stringify(articles, null, 2),
    'utf-8'
  );
  console.log(
    "✨ Created Articles:\x1b[90m packages/api/src/data/\x1b[0marticles.json"
  );
}

/**
 * Calls the functions that persist data to json.
 */
const createData = async () => {
  await createUsers();
  await createSmeData();
  await createTransactions();
  await createArticles();
};

createData();
