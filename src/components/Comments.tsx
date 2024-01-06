import { useContext, useState } from 'react';
import { CommentsInterface, PostProps } from './PostList';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setCommnet] = useState('');
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    setCommnet(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post?.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDate: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          });
          await getPost(post.id);
        }
        toast.success('댓글을 생성했습니다.');
        setCommnet('');
      }
    } catch (e: any) {
      toast.error(e);
    }
  };

  const handelDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirm && post?.id) {
      console.log(post.id);

      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
      });
      toast.success('댓글을 삭제 했습니다.');
      await getPost(post.id);
    }
  };

  return (
    <div className='comments'>
      <form className='comments__form' onSubmit={onSubmit}>
        <div className='form__block'>
          <label htmlFor='comment'>댓글 입력</label>
          <textarea
            value={comment}
            onChange={onChange}
            name='comment'
            id='comment'
            required></textarea>
        </div>
        <div className='form__block form__block-reverse'>
          <input type='submit' value='입력' className='form__btn-submit' />
        </div>
      </form>
      <div className='comments__list'>
        {post.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.createAt} className='comment__box'>
              <div className='comment__profile-box'>
                <div className='comment__email'>{comment?.email}</div>
                <div className='comment__date'>{comment?.createAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    onClick={() => handelDeleteComment(comment)}
                    className='comment__delete'>
                    삭제
                  </div>
                )}
                <div></div>
                <div></div>
              </div>
              <div className='comment__text'>{comment?.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
