import { useState } from 'react';
import { Project } from '../types/Project';
import { updateProject } from '../api/ProjectsAPI';

interface EditProjectFormProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: EditProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({ ...project });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // changes the variable 'setFormData' as you edit the box in the website
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // handles the subitting of the new information from the website
    e.preventDefault();
    await updateProject(formData.projectId, formData); //calling this from the ProjectsAPI page
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <label>
        Project Name:
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
        />
      </label>
      <label>
        Project Type:
        <input
          type="text"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
        />
      </label>
      <label>
        Regional Program:
        <input
          type="text"
          name="projectRegionalProgram"
          value={formData.projectRegionalProgram}
          onChange={handleChange}
        />
      </label>
      <label>
        Impact:
        <input
          type="number"
          name="projectImpact"
          value={formData.projectImpact}
          onChange={handleChange}
        />
      </label>
      <label>
        Project Phase:
        <input
          type="text"
          name="projectPhase"
          value={formData.projectPhase}
          onChange={handleChange}
        />
      </label>
      <label>
        Project Functionality Status:
        <input
          type="text"
          name="projectFunctionalityStatus"
          value={formData.projectFunctionalityStatus}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditProjectForm;
