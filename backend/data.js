export const questions = [
  { id: 1, text: 'Do you enjoy solving complex problems with logic?', weight: 1.2 },
  { id: 2, text: 'Would you rather build systems than just describe them?', weight: 1.1 },
  { id: 3, text: 'Do you like creating elegant interfaces and experiences?', weight: 1 },
  { id: 4, text: 'Are you curious about data, trends, and hidden patterns?', weight: 1.1 },
  { id: 5, text: 'Do you enjoy leading teams or shaping strategy?', weight: 0.9 },
  { id: 6, text: 'Would you like your work to influence millions of users?', weight: 1 },
  { id: 7, text: 'Do you enjoy technical depth and continuous learning?', weight: 1.1 },
  { id: 8, text: 'Do you care deeply about user empathy and experience?', weight: 0.95 }
];

export const careers = [
  {
    slug: 'software-engineer',
    title: 'Software Engineer',
    description: 'Builds resilient products, systems, and digital experiences that shape modern life.',
    category: 'Technology',
    confidence: 92,
    reason: 'Your answers suggest a strong preference for systems thinking, problem-solving, and iterative creation.',
    skills: ['TypeScript', 'Distributed Systems', 'Architecture', 'Testing'],
    education: ['Computer Science Degree', 'Practical engineering portfolio'],
    salary: '$140k-$220k',
    futureScope: 'Demand remains exceptionally strong as software powers every industry.',
    aiImpact: 'AI will automate repetitive implementation tasks, increasing the value of design, orchestration, and product judgment.',
    relatedCareers: ['Product Manager', 'Data Scientist', 'ML Engineer'],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
    books: ['Clean Code', 'Designing Data-Intensive Applications'],
    courses: ['CS50', 'Frontend Masters'],
    videos: ['System Design by Gaurav Sen', 'The Pragmatic Engineer'],
    projects: ['Build a full-stack AI assistant', 'Design a distributed event platform'],
    companies: ['OpenAI', 'Stripe', 'Google'],
    interviewQuestions: ['Design a URL shortener', 'How would you scale a chat system?'],
    softSkills: ['Communication', 'Leadership', 'Critical Thinking'],
    technicalSkills: ['Algorithms', 'Cloud', 'Databases', 'APIs'],
    growthRoadmap: ['Learn systems design', 'Ship production apps', 'Mentor junior engineers'],
    dailyRoutine: ['Review metrics', 'Code with testing', 'Collaborate with designers and PMs'],
    faqs: [
      { question: 'Is software engineering still worth it?', answer: 'Yes, especially for those who combine coding with product, systems, and communication skills.' }
    ],
    overview: 'Software engineering is a high-impact career that turns ideas into reliable products used by millions.',
    demand: 'Persistent demand across startups, enterprise, and AI companies.',
    visualTraits: ['Analytical', 'Structured', 'Productive']
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    description: 'Designs elegant, intuitive products that blend human needs with technical possibilities.',
    category: 'Design',
    confidence: 84,
    reason: 'Your profile leans toward empathy, visual thinking, and crafting delightful interactions.',
    skills: ['Figma', 'UX Research', 'Design Systems', 'Interaction Design'],
    education: ['Design bootcamp or degree', 'Portfolio of end-to-end experiences'],
    salary: '$110k-$180k',
    futureScope: 'Designers who can pair strategy, storytelling, and AI prototyping will stay in high demand.',
    aiImpact: 'Generative AI will speed concepting, but strong UX judgment remains essential.',
    relatedCareers: ['UX Researcher', 'Design Strategist', 'Product Manager'],
    certifications: ['Google UX Design', 'IDEO Design Thinking'],
    books: ["Don't Make Me Think", 'The Design of Everyday Things'],
    courses: ['Google UX Design Certificate', 'Coursera Interaction Design'],
    videos: ['Refactoring UI', 'Design Systems Weekly'],
    projects: ['Redesign a fintech onboarding flow', 'Create a premium AI dashboard'],
    companies: ['Apple', 'Notion', 'Figma'],
    interviewQuestions: ['How do you validate a design hypothesis?', 'Describe your design process from research to launch.'],
    softSkills: ['Empathy', 'Storytelling', 'Collaboration'],
    technicalSkills: ['Design Tools', 'Prototyping', 'Accessibility', 'Research'],
    growthRoadmap: ['Build a strong portfolio', 'Learn systems thinking', 'Understand product metrics'],
    dailyRoutine: ['Research user pain points', 'Prototype flows', 'Collaborate with engineers'],
    faqs: [
      { question: 'Do I need to code to be a designer?', answer: 'Not necessarily, but coding literacy improves collaboration and execution.' }
    ],
    overview: 'Product designers turn complex needs into intuitive interfaces and compelling product journeys.',
    demand: 'Strong demand for designers who can connect business goals and user experience.',
    visualTraits: ['Empathetic', 'Creative', 'Visionary']
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    description: 'Transforms ambiguity into insight and strategic action through analysis and modeling.',
    category: 'Data',
    confidence: 81,
    reason: 'You appear drawn to patterns, rigorous reasoning, and turning information into leverage.',
    skills: ['Python', 'Statistics', 'ML', 'SQL'],
    education: ['Statistics or CS degree', 'Portfolio of analytics projects'],
    salary: '$125k-$210k',
    futureScope: 'Data science remains critical as organizations seek better decisions and automation.',
    aiImpact: 'AI tools expand throughput, but the need for experimentation and causal reasoning persists.',
    relatedCareers: ['ML Engineer', 'Analytics Engineer', 'Research Scientist'],
    certifications: ['Google Data Analytics', 'AWS Machine Learning'],
    books: ['Hands-On Machine Learning', 'Think Stats'],
    courses: ['Fast.ai', 'DeepLearning.AI'],
    videos: ['StatQuest', 'Made with ML'],
    projects: ['Forecast churn for a subscription product', 'Build an explainable recommender'],
    companies: ['Meta', 'Netflix', 'Palantir'],
    interviewQuestions: ['How do you evaluate a model?', 'What metrics would you use for a recommendation system?'],
    softSkills: ['Curiosity', 'Communication', 'Judgment'],
    technicalSkills: ['Python', 'SQL', 'Experimentation', 'Visualization'],
    growthRoadmap: ['Master statistics', 'Build end-to-end projects', 'Learn ML deployment'],
    dailyRoutine: ['Explore data', 'Train models', 'Translate insights to stakeholders'],
    faqs: [
      { question: 'Is data science still a good path?', answer: 'Yes, especially for those who pair analysis with business context and communication.' }
    ],
    overview: 'Data scientists quantify uncertainty and guide smarter business and product decisions.',
    demand: 'High demand in finance, healthcare, e-commerce, and AI-native companies.',
    visualTraits: ['Curious', 'Analytical', 'Adaptive']
  }
];

export function scoreCareer(career, answers = {}) {
  let score = 0;

  Object.entries(answers).forEach(([id, answer]) => {
    const question = questions.find((item) => item.id === Number(id));
    if (!question) return;

    const responseScore = answer === 'yes' ? 1 : answer === 'probably' ? 0.7 : answer === 'no' ? -0.3 : 0.2;
    score += question.weight * responseScore;
  });

  if (career.title.includes('Software')) score += 2.4;
  if (career.title.includes('Product')) score += 1.8;
  if (career.title.includes('Data')) score += 1.9;

  return score;
}
