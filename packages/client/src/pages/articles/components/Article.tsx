export default function Article() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>John Doe</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>May 15, 2023</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">The Future of Web Development: Trends and Innovations</h3>
            <p className="text-muted-foreground">
              In this article, we explore the latest trends and innovations shaping the future of web development. From
              the rise of serverless architectures to the increasing importance of accessibility, we delve into the key
              factors that will influence the way we build and deploy web applications in the years to come.
            </p>
          </div>
        </article>
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>Jane Smith</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>April 20, 2023</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">Mastering React: A Comprehensive Guide</h3>
            <p className="text-muted-foreground">
              This in-depth article provides a comprehensive guide to mastering React, the popular JavaScript library
              for building user interfaces. We cover the fundamentals of React, including components, state management,
              and lifecycle methods, as well as advanced topics such as hooks, context, and server-side rendering.
            </p>
          </div>
        </article>
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>Sarah Lee</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>March 1, 2023</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">Accessibility in Web Design: Best Practices and Techniques</h3>
            <p className="text-muted-foreground">
              In this article, we explore the importance of accessibility in web design and provide a comprehensive
              guide to best practices and techniques. From ensuring proper color contrast to optimizing for screen
              readers, we cover the essential principles and strategies for creating inclusive and user-friendly web
              experiences.
            </p>
          </div>
        </article>
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>Michael Chen</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>February 10, 2023</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">Optimizing Web Performance: Strategies and Techniques</h3>
            <p className="text-muted-foreground">
              In this article, we dive into the world of web performance optimization, exploring a range of strategies
              and techniques that can help you improve the speed and responsiveness of your web applications. From image
              optimization to code minification, we cover the essential steps to ensure your website delivers a
              lightning-fast experience for your users.
            </p>
          </div>
        </article>
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>Emily Wang</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>January 5, 2023</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">
              The Rise of Headless CMS: Unlocking the Future of Content Management
            </h3>
            <p className="text-muted-foreground">
              This article explores the growing popularity of headless CMS (Content Management Systems) and how they are
              transforming the way we manage and deliver content on the web. We discuss the benefits of a headless
              architecture, the key features to look for, and the impact it has on the development and deployment of
              modern web applications.
            </p>
          </div>
        </article>
        <article className="rounded-lg bg-background shadow-sm transition-all hover:shadow-md">
          <div className="p-6">
            <div className="mb-4 flex items-center space-x-4 text-sm text-muted-foreground">
              <div>David Lee</div>
              <div className="flex items-center space-x-1">
                <div className="h-4 w-4" />
                <span>December 15, 2022</span>
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold">The Future of JavaScript: Exploring the Latest Language Features</h3>
            <p className="text-muted-foreground">
              In this article, we take a deep dive into the latest features and advancements in the JavaScript language.
              From the introduction of ES6 and beyond, we explore the evolution of JavaScript and how these new
              capabilities are shaping the future of web development. We cover topics such as arrow functions,
              async/await, and the growing popularity of TypeScript.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}