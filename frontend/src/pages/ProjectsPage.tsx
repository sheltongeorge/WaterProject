import CartSummary from '../components/CartSummary';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // this is updated by the function "handleCheckboxChange" in the CategoryFilter.tsx file.
  // It is then sent through to be received in functions: ProjectList  &  CategoryFilter

  return (
    <div className="container mt-4">
      <CartSummary/>
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
