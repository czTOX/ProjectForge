import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Message, MessageCreate } from '../models';
import { useMutation } from '@tanstack/react-query';
import { ProjectsApi } from '../services';
import { SERVER_URL } from '../variables';

interface MessageBoxInterface {
  projectId: string;
  messages: Message[];
  setMessages: Function;
}

const MessageBox: FC<MessageBoxInterface> = (props: MessageBoxInterface) => {
  const { mutate: postMessage } = useMutation({
    mutationFn: (body: MessageCreate) => ProjectsApi.postMessage(props.projectId, body),
    onSuccess: (res) => {
      props.setMessages([...props.messages, res.data]);
      reset();
    },
  });
  
  const { register, handleSubmit, reset } = useForm<MessageCreate>();
  const onSubmit = (data: MessageCreate) => postMessage(data);

  let box = document.getElementById('messageLog');
  if (box) {
    box.scrollTop = box.scrollHeight;
  }

  return (
    <div className="messageBox">
      <div id='messageLog' className="messageLog">
        {props.messages.map((message) => (
          <div className="message">
            <div className="avatar" style={message.author.profilePic ? {background: `url('${SERVER_URL}/profilePics/${message.author.profilePic}')`} : {}}>
              {message.author.profilePic ? '' : (message.author.firstName[0] + message.author.lastName[0])}
            </div>
            <p className="message__text text-regular">
              {message.content}
            </p>
          </div>
        ))}
      </div>
      <form className="form messageBox__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input">
          <textarea placeholder='Your message' rows={3} {...register('content', { required: true })}/>
        </div>
        <button className='form__button text-bold' type='submit'>Submit</button>
      </form>

    </div>
  );
}


export default MessageBox;