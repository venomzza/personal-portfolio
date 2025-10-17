import React from 'react';

const skillCategories: { title: string; skills: string[] }[] = [
  {
    title: 'Frontend',
    // order: HTML -> CSS -> JavaScript (sequence requested), then React as extra
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend / DevOps',
    // put MongoDB and Express earlier to follow the requested sequence
    skills: ['MongoDB', 'Express', 'Node.js', 'REST APIs', 'Socket.io'],
  },
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C'],
  },
  {
    title: 'Tools / Testing',
    skills: ['Git', 'Linux'],
  },
];

const Skills: React.FC = () => {
  const iconMap: Record<string, string> = {
    typescript:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    javascript:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    python:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    react:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    /* next.js removed intentionally */
    'tailwind css':
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    html: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    css: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'node.js':
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    express:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    mongodb:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'rest apis':
      '/images/restful-logo.svg',
    c: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    'socket.io':
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
    linux:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  };

  // default proficiency percentages (you can edit these later)
  // Remove proficiency percentages

  return (
    <section className="mt-20 sm:mt-32">
      <div className="flex justify-between mb-6 items-center">
        <div className="text-4xl sm:text-5xl font-medium">Skills</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skillCategories
          .flatMap(cat =>
            cat.skills.map(s => ({ category: cat.title, name: s }))
          )
          .map(skill => {
            const key = skill.name.toLowerCase();
            const icon = iconMap[key];
            return (
              <div
                key={skill.name}
                className="bg-card p-2 rounded-md flex flex-col items-center text-center shadow-sm hover:shadow md transition-shadow"
              >
                <div className="h-14 w-14 flex items-center justify-center mb-2">
                  {icon ? (
                    // Render inline SVG for REST APIs to avoid external/static loading issues
                    key === 'rest apis' ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        className="h-12 w-12 object-contain"
                        aria-hidden="true"
                      >
                        <rect width="48" height="48" rx="8" fill="#0EA5A9" />
                        <path d="M16 18h16" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 24h8" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="11" cy="24" r="2.5" fill="#fff" />
                        <circle cx="37" cy="18" r="2.5" fill="#fff" />
                        <circle cx="21" cy="24" r="2.5" fill="#fff" />
                      </svg>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={icon}
                        alt={`${skill.name} logo`}
                        className="h-12 w-12 object-contain"
                      />
                    )
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-white font-semibold text-sm">
                      {skill.name
                        .split(' ')
                        .map(w => w[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium">{skill.name}</div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Skills;
