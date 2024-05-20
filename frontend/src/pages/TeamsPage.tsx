import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TeamsApi, UsersApi } from '../services';
import { JoinTeam, NewTeam } from '../models';
import { useForm } from 'react-hook-form';


const TeamsPage: FC = () => {
  const navigate = useNavigate();
  const [ opened, setOpened ] = useState(false);

  const { data: myTeams } = useQuery({
    queryKey: ['myTeams'],
    queryFn: () => UsersApi.getMyTeams(),
  });

  const { mutate: createTeam } = useMutation({
    mutationFn: (body: NewTeam) => TeamsApi.createTeam(body),
    onSuccess: (res) => {
      setOpened(false);
      navigate(`/teams/${res.data.id}`);
    },
  });

  const { mutate: joinTeam } = useMutation({
    mutationFn: (body: JoinTeam) => TeamsApi.joinTeam(body),
    onSuccess: (res) => {
      setOpened(false);
      navigate(`/teams/${res.data.team.id}`);
    },
  });

  const { register, handleSubmit } = useForm<NewTeam>();
  const onSubmit = (data: NewTeam) => createTeam(data);

  const { register: register2, handleSubmit: handleSubmit2 } = useForm<JoinTeam>();
  const onSubmitInvite = (data: JoinTeam) => joinTeam(data);

  return (
    <div className='main'>
      {opened &&
        <div className="fullscreanBG">
          <div className="newTeamPopup">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input">
                <input type='text' placeholder='Team name' {...register('name', { required: true })}/>
                <button className='form__button text-bold' type='submit'>Create new</button>
              </div>
            </form>
            <form className="form" onSubmit={handleSubmit2(onSubmitInvite)}>
              <div className="form__input">
                <input type='text' placeholder='Invite code' {...register2('inviteCode', { required: true })}/>
                <button className='form__button text-bold' type='submit'>Join team</button>
              </div>
            </form>
            <div className="newTeamForm__buttons">
              <button className='form__button text-bold' onClick={() => {setOpened(false);}}>Back</button>
            </div> 
          </div>
        </div>
      }
      <div className="container teamsPage">
        <div className="subPage__header">
          <h1 className="heading">My Teams</h1>
          <button className='subPage__header--addNew text-bold' onClick={() => {setOpened(true);}}>+ Add new</button>
        </div>
        <div className="divider"></div>
        <div className="teamsList">
          {myTeams?.data.worksAt.map((work) => (
            <Link to={`/teams/${work.team.id}`} key={`team-${work.team.id}`} className="teamDetailTile">
              <h3 className="text-bold teamDetailTile__name">{work.team.name}</h3>
              <div className="teamDetailTile__info">
                <span className="text-regular teamDetailTile__members">Team memebers: <strong>{work.team._count.users}</strong></span>
                <span className="text-regular teamDetailTile__role">Role: <strong>{work.role}</strong></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;