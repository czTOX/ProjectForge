import { useMutation, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TeamsApi } from '../services';
import { useForm } from 'react-hook-form';
import { NewTeam } from '../models';


const TeamSettingsPage: FC = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: team } = useQuery({
    queryKey: ['getTeam', id],
    queryFn: () => TeamsApi.getSingle(id!),
    enabled: !!id,
  });

  const { mutate: editSettings } = useMutation({
    mutationFn: (body: NewTeam) => TeamsApi.editTeam({...body, id: id || ''}),
    onSuccess: (res) => {
      navigate(`/teams/${res.data.id}`);
    },
    onError: () => {
      alert('Something went wrong');
    },
  });

  const { register, handleSubmit } = useForm<NewTeam>({defaultValues: {
    name: team?.data.name,
  }});
  const onSubmit = (data: NewTeam) => editSettings(data);

  return (
    <div className="container task__page">
      <h1 className="heading"><Link to={`/teams/${id}`} className="heading">{team?.data.name}</Link>&apos;s settings</h1>
      <div className="divider"></div>
      <div className="team__info">
        <span className="text-regular">Invite code: <i>{team?.data.inviteCode}</i></span>
      </div>
      <h2 className="heading">Edit settings</h2>
      <div className="divider--small"></div>
      <div className="settings__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__input">
            <label htmlFor="name" className="text-regular">Name:</label>
            <input key='name' type='text' placeholder='Name' defaultValue={team?.data.name} {...register('name', { required: true })}></input>
          </div>
          <div className="settings__submit">
            <button className='form__button text-bold' type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamSettingsPage;