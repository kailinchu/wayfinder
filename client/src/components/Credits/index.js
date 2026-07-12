import React from 'react';
import './style.css';

const executiveTeam = [
  'Negha Elsa Binod',
  'Kailin Chu',
  'Achinthyaa Kaveri',
  'Shlok Panchal',
  'Malika Sinnarajah',
];

const currentVolunteers = [
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
  'Simon Hanna',
  'Tony Hu',
  'Malika Shahid',
];

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
        translation, content, and web development.
      </p>
    </div>

    <div className="credits-grid">
      <article className="credits-card credits-card-featured">
        <h2>Executive Team</h2>
        <NameList names={executiveTeam} />
      </article>

      <article className="credits-card">
        <h2>Present and Past Volunteers</h2>
        <NameList names={currentVolunteers} />
      </article>

      <article className="credits-card">
        <h2>Previous Exec</h2>
        <NameList names={previousExec} />
      </article>
    </div>
  </section>
);

export default Credits;
