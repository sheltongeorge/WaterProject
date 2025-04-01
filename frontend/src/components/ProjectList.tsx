import { useState, useEffect, use } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

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
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);

        setProjects(data.projects); // the json project objects sent by the server's API
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, selectedCategories]); // With this, whenever there is a change in this variable the command will rerun, refreshing page.
  // Pulling in the data to setProjects (from the hook above), if no data is found to be coverted to json,
  //      then the array that is returned is empty.
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

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

              <button
                className="btn btn-success"
                onClick={() =>
                  navigate(`/donate/${p.projectName}/${p.projectId}`)
                } // navigation
              >
                Donate
              </button>
            </div>
          </div>
        )
      )}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
