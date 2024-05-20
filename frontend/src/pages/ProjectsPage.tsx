import { FC } from 'react';
import { UsersApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import ProjectLine from '../components/ProjectLine';


const ProjectsPage: FC = () => {
  const { data: myProjects } = useQuery({
    queryKey: ['myProjects'],
    queryFn: () => UsersApi.getMyProjects(),
  });

  return (
    <div className="container projects__page">
      <h1 className="heading">My active projects</h1>
      <div className="divider--long"></div>
      <div className="projects">
      {myProjects?.data.worksAt.map((work) => (
          work.team.projects.map((project) => (
            <ProjectLine {...project} key={`projectTile-${project.id}`} {...project} />
          ))
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;