export interface ArticleData {
	title: string;
	author: string;
	date: string;
	content: string;
}

const articlesData: ArticleData[] = [
	{
		author: "John Doe",
		date: "May 15, 2023",
		title: "The Future of Web Development: Trends and Innovations",
		content:
			"In this article, we explore the latest trends and innovations shaping the future of web development. From the rise of serverless architectures to the increasing importance of accessibility, we delve into the key factors that will influence the way we build and deploy web applications in the years to come.",
	},
	{
		author: "Jane Smith",
		date: "April 20, 2023",
		title: "Mastering React: A Comprehensive Guide",
		content:
			"This in-depth article provides a comprehensive guide to mastering React, the popular JavaScript library for building user interfaces. We cover the fundamentals of React, including components, state management, and lifecycle methods, as well as advanced topics such as hooks, context, and server-side rendering.",
	},
	{
		author: "Sarah Lee",
		date: "March 1, 2023",
		title: "Accessibility in Web Design: Best Practices and Techniques",
		content:
			"In this article, we explore the importance of accessibility in web design and provide a comprehensive guide to best practices and techniques. From ensuring proper color contrast to optimizing for screen readers, we cover the essential principles and strategies for creating inclusive and user-friendly web experiences.",
	},
	{
		author: "Michael Chen",
		date: "February 10, 2023",
		title: "Optimizing Web Performance: Strategies and Techniques",
		content:
			"In this article, we dive into the world of web performance optimization, exploring a range of strategies and techniques that can help you improve the speed and responsiveness of your web applications. From image optimization to code minification, we cover the essential steps to ensure your website delivers a lightning-fast experience for your users.",
	},
	{
		author: "Emily Wang",
		date: "January 5, 2023",
		title:
			"The Rise of Headless CMS: Unlocking the Future of Content Management",
		content:
			"This article explores the growing popularity of headless CMS (Content Management Systems) and how they are transforming the way we manage and deliver content on the web. We discuss the benefits of a headless architecture, the key features to look for, and the impact it has on the development and deployment of modern web applications.",
	},
	{
		author: "David Lee",
		date: "December 15, 2022",
		title: "The Future of JavaScript: Exploring the Latest Language Features",
		content:
			"In this article, we take a deep dive into the latest features and advancements in the JavaScript language. From the introduction of ES6 and beyond, we explore the evolution of JavaScript and how these new capabilities are shaping the future of web development. We cover topics such as arrow functions, async/await, and the growing popularity of TypeScript.",
	},
];

export default articlesData;
