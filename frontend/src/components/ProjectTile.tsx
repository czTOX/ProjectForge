import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProjectMin } from '../models';


/**
 * ProjectTile component
 *
 * @param {ProjectMin} props
 * @returns {*}
 */
const ProjectTile: FC<ProjectMin> = (props: ProjectMin) => {

  return (
    <Link to={`/projects/${props.id}`} className="projectTile">
      <div className="projectTile__name">
        <h5 className="text-bold">{props.name}</h5>
      </div>
      <div className="projectTile__info">
        <div className="projectTile__team">
          <span className="text-regular">Team: {props.teamName}</span>
        </div>
        <div className="projectTile__activeTasks">
          <span className="text-regular">Active tasks: {props._count.tasks}</span>
        </div>
      </div>
    </Link>
  );
}


export default ProjectTile;