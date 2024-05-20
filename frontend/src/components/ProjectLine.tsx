import { FC } from 'react';
import { ProjectLineInterface } from '../models';
import { Link } from 'react-router-dom';
import { projectProgress } from '../functions/project';


/**
 * ProjectLine component
 *
 * @param {ProjectLineInterface} props
 * @returns {*}
 */
const ProjectLine: FC<ProjectLineInterface> = (props: ProjectLineInterface) => {
  return (
    <Link to={`/projects/${props.id}`} className="projects__project">
      <h3 className="text-bold">{props.name}</h3>
      <div className="project__progressLine">
        <span className="text-bold">{projectProgress(props.tasks)}%</span>
        <div className="project__progressLine--done" style={{width: `${projectProgress(props.tasks)}%`}}></div>
      </div>
    </Link>
  );
}


export default ProjectLine;