const blogs = [
  {
    id: 1,
    title: 'Building Smart IoT Systems',
    excerpt: 'Learn how we integrated sensors and cloud services for real-time monitoring.',
    content: 'Detailed content about IoT integration...',
    category: 'IoT & Robotics',
    date: 'Jan 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    id: 2,
    title: 'Cybersecurity Best Practices for Web Apps',
    excerpt: 'Protecting your applications from modern threats using advanced security patterns.',
    content: "Security is paramount in today's digital landscape...",
    category: 'Security',
    date: 'Jan 05, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
  },
];

export const handler = async (event) => {
  const pathParts = event.path.replace('/.netlify/functions/blogs', '').split('/').filter(Boolean);
  const id = pathParts[0] ? parseInt(pathParts[0]) : null;

  if (id) {
    const blog = blogs.find((b) => b.id === id);
    if (!blog) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Blog not found' }),
      };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogs),
  };
};
