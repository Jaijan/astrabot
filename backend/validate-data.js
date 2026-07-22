import { careers, questions } from './data.js';

const required = ['slug','title','description','category','confidence','reason','skills','education','salary','careerStats','futureScope','aiImpact','relatedCareers','certifications','books','courses','videos','projects','companies','interviewQuestions','softSkills','technicalSkills','growthRoadmap','dailyRoutine','faqs','overview','demand','visualTraits'];
const errors = [];
const unique = (values, name) => values.forEach((value, index) => { if (values.indexOf(value) !== index) errors.push(`Duplicate ${name}: ${value}`); });
if (careers.length < 100) errors.push(`Expected at least 100 careers, found ${careers.length}`);
unique(careers.map(c => c.slug), 'slug'); unique(careers.map(c => c.title), 'career title'); unique(questions.map(q => q.text), 'question');
for (const career of careers) {
  for (const field of required) if (career[field] === undefined || career[field] === null || career[field] === '') errors.push(`${career.slug}: missing ${field}`);
  for (const field of required.filter(field => Array.isArray(career[field]))) if (!career[field].length) errors.push(`${career.slug}: empty ${field}`);
  if (!career.salary || !['entry','mid','senior','note'].every(key => typeof career.salary[key] === 'string' && career.salary[key])) errors.push(`${career.slug}: invalid salary`);
  const stats = career.careerStats;
  if (!stats || !Number.isInteger(stats.hiringDemand) || stats.hiringDemand < 1 || stats.hiringDemand > 5 || !Number.isInteger(stats.workLifeBalance) || stats.workLifeBalance < 1 || stats.workLifeBalance > 5) errors.push(`${career.slug}: invalid careerStats`);
  if (career.faqs.length < 5) errors.push(`${career.slug}: fewer than 5 FAQs`);
  for (const title of career.relatedCareers) if (!careers.some(candidate => candidate.title === title)) errors.push(`${career.slug}: broken related career ${title}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; } else console.log(`Career data valid: ${careers.length} careers and ${questions.length} unique questions.`);
