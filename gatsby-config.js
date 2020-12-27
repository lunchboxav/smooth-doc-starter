module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Smooth DOC Starter",
        description: "Use your own description...",
        siteUrl: "https://example.com",
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pages/posts`,
        name: 'posts',
      },
    },
  ],
};
