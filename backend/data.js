import fs from 'node:fs';

// The catalogue is intentionally authored once in the frontend knowledge module.
// This parser reads its compact definition table so API and UI cannot drift.
const source = fs.readFileSync(new URL('../src/data/careers.ts', import.meta.url), 'utf8');
const match = source.match(/const definitions: Definition\[\] = (\[[\s\S]*?\n\];)/);
if (!match) throw new Error('Unable to load career definitions');
const definitions = Function(`return ${match[1]}`)(); // controlled, repository-local data only
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const questionTags = {
  1: ['patients', 'healthcare'], 2: ['programming'], 3: ['people', 'management'], 4: ['law'], 5: ['outdoors'], 6: ['aircraft'],
  7: ['buildings', 'design'], 8: ['numbers', 'finance'], 9: ['research', 'science'], 10: ['creative', 'media'], 11: ['teaching'], 12: ['defence']
};
export const questions = [
  ['Do you enjoy working directly with patients or improving health outcomes?', 1.4], ['Do you enjoy programming computers and debugging systems?', 1.4],
  ['Would you rather manage people and operations than build a product yourself?', 1.2], ['Would you enjoy researching laws, contracts or appearing in court?', 1.4],
  ['Do you enjoy fieldwork, sites, farms or working outdoors?', 1.2], ['Would you like to fly aircraft or work with aviation systems?', 1.5],
  ['Would you rather design buildings and physical spaces than software?', 1.4], ['Do you enjoy analysing accounts, markets and financial decisions?', 1.3],
  ['Do experiments, evidence and scientific discovery excite you?', 1.3], ['Do you want to create visual stories, films, music or digital art?', 1.3],
  ['Do you enjoy explaining ideas and helping others learn?', 1.2], ['Would you be motivated by a structured defence or public-service career?', 1.4]
].map(([text, weight], index) => ({ id: index + 1, text, weight, tags: questionTags[index + 1] }));

const salary = { entry: '₹3–6 LPA', mid: '₹7–12 LPA', senior: '₹14–28 LPA', note: 'Indicative Indian salary; varies by city and employer.' };
export const careers = definitions.sort((a,b) => a[0].localeCompare(b[0])).map(([title, category, matchingTags]) => ({
  slug: slugify(title), title, category, matchingTags, confidence: 88, description: `India-focused ${title} career path.`, reason: `Signals match ${matchingTags.join(', ')}.`, skills: matchingTags,
  education: ['Relevant Indian degree, diploma or recognised vocational programme', 'NPTEL/SWAYAM learning and practical experience'], salary, careerStats: { entrySalary: salary.entry, hiringDemand: 4, workLifeBalance: 3, aiRisk: 'Low', futureGrowth: 'High' },
  futureScope: 'Growing India-focused opportunity for skilled professionals.', aiImpact: 'AI supports routine work while judgement and domain skill remain valuable.', relatedCareers: [], certifications: ['NPTEL/SWAYAM', 'NSDC / Skill India'], books: [`Introduction to ${title}`], courses: ['NPTEL relevant course'], videos: ['NPTEL lecture series'], projects: ['Foundation project', 'Applied portfolio project'], companies: ['TCS', 'Infosys', 'Reliance', 'L&T'], interviewQuestions: [`Why ${title}?`], softSkills: ['Communication', 'Collaboration'], technicalSkills: matchingTags, growthRoadmap: ['Build foundations', 'Create proof of work', 'Develop domain depth'], dailyRoutine: ['Plan work', 'Solve practical problems', 'Collaborate'], faqs: Array.from({ length: 5 }, (_, i) => ({ question: `How can I prepare for ${title}? (${i + 1})`, answer: 'Build recognised foundations and practical evidence of your skills.' })), overview: `${title} in India.`, demand: 'Steady demand in India.', visualTraits: matchingTags
}));
careers.forEach((career, index) => { career.relatedCareers = [1,2,3,4].map((offset) => careers[(index + offset) % careers.length].title); });

export function scoreCareer(career, answers = {}) {
  return Object.entries(answers).reduce((score, [id, answer]) => {
    const question = questions.find((item) => item.id === Number(id));
    if (!question) return score;
    const response = answer === 'yes' ? 1 : answer === 'probably' ? 0.65 : answer === 'probably-not' ? -0.45 : -0.75;
    const overlap = question.tags.filter((tag) => career.matchingTags.includes(tag)).length;
    return score + response * question.weight * (overlap ? 1 + overlap : 0.15);
  }, 0);
}
