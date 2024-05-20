import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { NewRole, NewRoleForm, WorksAt } from '../models';
import { TeamsApi } from '../services';
import { useForm } from 'react-hook-form';
import { SERVER_URL } from '../variables';

interface ChangeRoleFormInterface {
  work: WorksAt;
  setOpened: Function;
  members: WorksAt[];
  setMembers: Function;
  setPermissionLevel: Function;
}

const ChangeRoleForm: FC<ChangeRoleFormInterface> = (props: ChangeRoleFormInterface) => {

  const roles = ['Member', 'Project manager'];

  const { mutate: changeRole } = useMutation({
    mutationFn: (body: NewRole) => TeamsApi.changeRole(body),
    onSuccess: (res) => {
      let newMembers: WorksAt[] = [];
      for (let i = 0; i < props.members.length; i++) {
        const x = props.members[i];
        if (x.id === res.data.id) {
          newMembers.push(res.data);
        } else {
          newMembers.push(x);
        }
      }
      props.setMembers(newMembers);
      props.setPermissionLevel(res.data.permissionLevel);
      props.setOpened(false);
    },
  });

  const { register, handleSubmit } = useForm<NewRoleForm>();
  const onSubmit = (data: NewRoleForm) => changeRole({
    workId: props.work.id,
    role: roles[data.role - 1],
    permissionLevel: data.role
  });

  return (
    <div className="fullscreanBG">
      <div className="newProjectPopup">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className='changeRolePopup__member'>
            <div className="avatar" style={props.work.user.profilePic ? {background: `url('${SERVER_URL}/profilePics/${props.work.user.profilePic}')`} : {}}>
              {props.work.user.profilePic ? '' : (props.work.user.firstName[0] + props.work.user.lastName[0])}
            </div>
            <div className="member__info">
              <span className="text-bold member__info--name">{props.work.user.firstName + ' ' + props.work.user.lastName}</span>
              <span className="text-regular member__info--role">Role: {props.work.role}</span>
            </div>
          </div>
          <div className="form__input">
            <select id="newRole" defaultValue={props.work.permissionLevel} {...register('role', { required: true })}>
              <option value={2}>{roles[1]}</option>
              <option value={1}>{roles[0]}</option>
            </select>
          </div>
          <div className="newProjectPopup__buttons">
            <button className='form__button text-bold' onClick={() => {props.setOpened(false);}}>Back</button>
            <button className='form__button text-bold' type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default ChangeRoleForm;