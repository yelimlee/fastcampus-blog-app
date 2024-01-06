import React, { useContext, useEffect, useState } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp'; // 초기화한 값
import AuthContext from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CATEGORIES, CategoryType, PostProps } from './PostList';

export default function PostForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('Frontend');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title);
      setContent(post?.content);
      setSummary(post?.summary);
      setCategory(post?.category as CategoryType);
    }
  }, [post]);

  const getPost = async (id: string) => {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    } else {
      console.log('No such document!');
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'summary') {
      console.log(value);

      setSummary(value);
    }

    if (name === 'content') {
      setContent(value);
    }

    if (name === 'category') {
      setCategory(value as CategoryType);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 수정
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post?.id);

        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updateAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category: category,
        });
        navigate(`/posts/${post.id}`);
        toast?.success('게시물을 수정했습니다.');
      } else {
        await addDoc(collection(db, 'posts'), {
          title: title,
          summary: summary,
          content: content,
          createAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
        });
        navigate('/');
        toast?.success('게시물을 생성했습니다.');
      }
    } catch (e: any) {
      toast?.error(e?.code);
    }
  };
  return (
    <form onSubmit={onSubmit} className='form'>
      <div className='form__block'>
        <label htmlFor='title'>제목</label>
        <input
          onChange={onChange}
          value={title}
          type='text'
          name='title'
          id='title'
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='category'>카테고리</label>
        <select
          name='category'
          id='category'
          onChange={onChange}
          defaultValue={category}>
          <option value=''>카테고리를 선택해주세요.</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='form__block'>
        <label htmlFor='summary'>요약</label>
        <input
          onChange={onChange}
          value={summary}
          type='text'
          name='summary'
          id='summary'
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='content'>내용</label>
        <textarea
          onChange={onChange}
          value={content}
          name='content'
          id='content'
          required
        />
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value={post ? '수정' : '제출'}
          className='form__btn--submit'
        />
      </div>
    </form>
  );
}
