import { useState, useEffect } from 'react';
import { Project } from './types/Project';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  //   projects    = the actual data, the array of Project
  //   setProjects = a method to update the data
  //   <Project[]> = an array of the type project that we created in the types folder (the .ts file bringing in the table info)
  //   ([])        = initial state or default state is an empty array

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('https://localhost:5000/water/allprojects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);
  // Pulling in the data to setProjects (from the hook above), if no data is found to be coverted to json,
  //      then the array that is returned is empty.

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map(
        (
          p // essentially the for loop to get all rows of data.
        ) => (
          <div id="projectCard">
            <h3>{p.projectName}</h3>

            <ul>
              <li>Project Type: {p.projectType}</li>
              <li>Regional Program: {p.projectRegionalProgram}</li>
              <li>Impact: {p.projectImpact} Individuals Served</li>
              <li>Project Phase: {p.projectPhase}</li>
              <li>Project Status: {p.projectFunctionalityStatus}</li>
            </ul>
          </div>
        )
      )}
    </>
  );
}

export default ProjectList;
