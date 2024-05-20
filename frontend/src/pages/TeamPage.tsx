import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TeamsApi } from '../services';
import NewProjectFrom from '../components/NewProjectForm';
import { projectProgress } from '../functions/project';
import { SERVER_URL } from '../variables';
import ChangeRoleForm from '../components/ChangeRoleForm';
import { WorksAt } from '../models';

/**
 * Team Page
 *
 * @returns {*}
 */
const TeamPage: FC = () => {

  function roleChangePopup(work: WorksAt) {
    setRolePopupOpened(true);
    setWork(work);
  }

  const { id } = useParams();
  const [ opened, setOpened ] = useState(false);
  const [ rolePopupOpened, setRolePopupOpened ] = useState<boolean>(false);
  const [ work, setWork ] = useState<WorksAt>();
  const [ members, setMembers ] = useState<WorksAt[]>([]);
  const [ permissionLevel, setPermissionLevel ] = useState<number>(0);

  const { data: team } = useQuery({
    queryKey: ['getTeam', id],
    queryFn: () => TeamsApi.getSingle(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (team?.data) {
      setMembers(team.data.users);
      setPermissionLevel(team.data.permissionLevel)
    }
  }, [team?.data]);

  return (
    <div className='main'>
      {opened && <NewProjectFrom teamId={team?.data.id || ''} setOpened={setOpened} />}
      {rolePopupOpened && work && <ChangeRoleForm work={work} setOpened={setRolePopupOpened} members={members} setMembers={setMembers} setPermissionLevel={setPermissionLevel} />}
      <div className="container team__page">
        <div className="subPage__header">
          <h1 className="heading">{team?.data.name}</h1>
          <div className="subPage__buttons">
            <button className='subPage__header--addNew text-bold' onClick={() => {setOpened(true);}}>+ Add new project</button>
            {permissionLevel && permissionLevel > 2  && <Link to={`settings`} className='subPage__header--addNew text-bold'>Settings</Link>}
          </div>
        </div>
        <div className="team__container">
          <div className="team__main">
            <div className="divider--long"></div>
            <div className="projects">
              {team?.data.projects.map((project) => (
                <Link key={`project-${project.id}`} to={`/projects/${project.id}`} className={`projects__project ${!project.active ? 'projects__project--finnished' : ''}`}>
                  <h3 className="text-bold">{project.name}</h3>
                  <div className="project__progressLine">
                    <span className="text-bold">{projectProgress(project.tasks)}</span>
                    <div className="project__progressLine--done" style={{width: `${projectProgress(project.tasks)}%`}}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="team__sidebar">
            <div className="sidebar__header">
              <h3 className="text-bold">Members</h3>
            </div>
            <div className="sidebar__members">
              {members.map((work) => (
                <div key={`memeber-${work.id}`} className={`sidebar__member ${(permissionLevel && permissionLevel > 1) && (work.permissionLevel < 3) ? 'sidebar__member--clickable' : ''}`} onClick={() => ((permissionLevel && permissionLevel > 1) && (work.permissionLevel < 3) ? roleChangePopup(work) : undefined)}>
                  <div className="avatar" style={work.user.profilePic ? {background: `url('${SERVER_URL}/profilePics/${work.user.profilePic}')`} : {}}>
                    {work.user.profilePic ? '' : (work.user.firstName[0] + work.user.lastName[0])}
                  </div>
                  <div className="member__info">
                    <span className="text-bold member__info--name">{work.user.firstName + ' ' + work.user.lastName}</span>
                    <span className="text-regular member__info--role">Role: {work.role}</span>
                  </div>
                </div>
              ))}
              <div key='memeber-new' className="sidebar__member sidebar__member--new" onClick={() => prompt('Copy this invite code and sent it to your coworker.', `${team?.data.inviteCode}`)}>
                <div className="avatar">+</div>
                <div className="member__info">
                  <span className="text-bold member__info--name">Add new member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;