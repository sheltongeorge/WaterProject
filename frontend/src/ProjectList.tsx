import { useState, useEffect, use } from 'react';
import { Project } from './types/Project';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  //   projects    = the actual data, the array of Project
  //   setProjects = a method to update the data
  //   <Project[]> = an array of the type project that we created in the types folder (the .ts file bringing in the table info)
  //   ([])        = initial state or default state is an empty array
  const [pageSize, setPageSize] = useState<number>(10);
  //this will hold the variable for the page, as well as the function that will set the new page size.
  const [pageNum, setPageNum] = useState<number>(1);
  // this will be used to get the page numbers and change the page numbers
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
                    // this is what we will be putting onto our request, it iterates through the project types to be able to tell the API which we want.

      const response = await fetch(
        `https://localhost:5000/water/allprojects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`, //the last part of this is an if statement: if selectedCategories has a length, then send the string const categoryParams, Else ''
        {
          credentials: 'include',
        }
      ); //this will query from the REACT frontend to the .NET backend server side, which will respond with the variables below
      const data = await response.json();
      setProjects(data.projects); // the json project objects sent by the server's API
      setTotalItems(data.totalNumProjects); // the second variable in the server API response, the num of projects
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchProjects();
  }, [pageSize, pageNum, totalItems, selectedCategories]); // With this, whenever there is a change in this variable the command will rerun, refreshing page.
  // Pulling in the data to setProjects (from the hook above), if no data is found to be coverted to json,
  //      then the array that is returned is empty.

  return (
    <>
      {projects.map(
        (
          p // essentially the for loop to get all rows of data.
        ) => (
          <div id="projectCard" className="card" key={p.projectId}>
            <h3>{p.projectName}</h3>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <strong>Project Type: </strong>
                  {p.projectType}
                </li>
                <li>
                  <strong>Regional Program: </strong>
                  {p.projectRegionalProgram}
                </li>
                <li>
                  <strong>Impact: </strong>
                  {p.projectImpact} Individuals Served
                </li>
                <li>
                  <strong>Project Phase: </strong>
                  {p.projectPhase}
                </li>
                <li>
                  <strong>Project Status: </strong>
                  {p.projectFunctionalityStatus}
                </li>
              </ul>
            </div>
          </div>
        )
      )}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/*  Building the buttons dynamically for each page that is needed for the objects */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
          // this is goint to disable the buttons when you are on the page you are on.
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
