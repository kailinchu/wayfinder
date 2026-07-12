import React from 'react';
import './style.css';

const leadershipTeam = [
  { name: 'Kailin Chu', role: 'WayFinder Lead' },
  { name: 'Negha Elsa Binod', role: 'Maps Lead' },
  { name: 'Achinthyaa Kaveri', role: 'FAQs/Directory Lead' },
  { name: 'Shlok Panchal', role: 'Web Dev Lead' },
  { name: 'Malika Sinnarajah', role: 'FAQs/Directory Lead' },
];

const projectTeams = [
  {
    team: 'Web Team',
    members: [
      { name: 'Shlok Panchal', role: 'Web Dev Lead' },
      { name: 'Matthew Atu', role: 'Team Member' },
      { name: 'Kaiyan Chu', role: 'Team Member' },
    ],
  },
  {
    team: 'Maps Team',
    members: [
      { name: 'Negha Elsa Binod', role: 'Maps Lead' },
      { name: 'Anjaly Jeyacanthan', role: 'Team Member' },
      { name: 'Faith Zou', role: 'Team Member' },
      { name: 'Julianne Hu', role: 'Team Member' },
      { name: 'Neha Rahman', role: 'Team Member' },
    ],
  },
];

const contributors = [
  'Andrew Chen',
  'Kaiyan Chu',
  'Jiya Freya',
  'Hera Jamil',
  'Anjaly Jeyacanthan',
  'Nishanthi Kaneshalingam',
  'Achinthyaa Kaveri',
  'Anushiya Kuhanathan',
  'Sarah Ling',
  'Lina Lu',
  'Samara Marjaan',
  'Matthew Atu',
  'George Nader',
  'Aadheesh Nandan',
  'Shlok Panchal',
  'Antonette Pillainayagam',
  'Pierrette Praden',
  'Neha Rahman',
  'Siya Sharma',
  'Magdi Shihata',
  'Malika Sinnarajah',
  'Ziyi (Chelsea) Song',
  'Tharaka Srikanthan',
  'Swetha Suvendran',
  'Ghaviyaa Thankeswaran',
  'Julianne Hu',
  'Jaedon Visva',
  'Valli Yasotharan',
  'Fadi Zidan',
  'Faith Zou',
];

const previousExec = [
  { name: 'Simon Hanna', role: 'Advisory Role' },
  { name: 'Tony Hu', role: 'Previous Exec' },
  { name: 'Malika Shahid', role: 'Previous Exec' },
];

const RoleList = ({ people }) => (
  <ul className="credits-role-list">
    {people.map((person) => (
      <li key={`${person.name}-${person.role}`}>
        <span className="credits-person-name">{person.name}</span>
        <span className="credits-person-role">{person.role}</span>
      </li>
    ))}
  </ul>
);

const NameList = ({ names }) => (
  <ul className="credits-name-list">
    {names.map((name) => (
      <li key={name}>{name}</li>
    ))}
  </ul>
);

const Credits = () => (
  <section className="credits-page" aria-labelledby="credits-title">
    <div className="credits-hero">
      <p className="credits-eyebrow">SHN WayFinder</p>
      <h1 id="credits-title">Volunteer Credits</h1>
      <p>
        WayFinder was built by a volunteer-led team across design, mapping,
        translation, content, and web development, with thanks to every
        contributor who helped bring the project to launch.
      </p>
    </div>

    <div className="credits-grid">
      <article className="credits-card credits-card-featured">
        <p className="credits-card-label">Current Team (2026)</p>
        <h2>Leadership Team</h2>
        <RoleList people={leadershipTeam} />
      </article>

      <article className="credits-card">
        <h2>Project Teams</h2>
        <div className="credits-team-grid">
          {projectTeams.map((team) => (
            <section className="credits-team" key={team.team}>
              <h3>{team.team}</h3>
              <RoleList people={team.members} />
            </section>
          ))}
        </div>
      </article>

      <article className="credits-card">
        <h2>Present and Past Volunteers</h2>
        <NameList names={contributors} />
      </article>

      <article className="credits-card">
        <h2>Previous Exec</h2>
        <RoleList people={previousExec} />
      </article>
    </div>
  </section>
);

export default Credits;
