import AuthContext from 'context/AuthContext';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  content: string;
  summary: string;
  createAt: string;
  updateAt: string;
  uid: string;
  category?: CategoryType;
}

type TabType = 'all' | 'my';

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES: CategoryType[] = [
  'Frontend',
  'Backend',
  'Web',
  'Native',
];

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    setPosts([]); // 데이터를 부를때마다 초기화
    let postRef = collection(db, 'posts');
    let postsQuery;

    if (activeTab === 'my' && user) {
      //나의 글은 필터링
      postsQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('createAt', 'desc')
      );
    } else if (activeTab === 'all') {
      // 모든 글 보여주기
      postsQuery = query(postRef, orderBy('createAt', 'desc'));
    } else {
      postsQuery = query(
        postRef,
        where('category', '==', activeTab),
        orderBy('createAt', 'desc')
      );
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handelDelete = async (id: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && id) {
      await deleteDoc(doc(db, 'posts', id));
      toast.success('게시글을 삭제했습니다.');
      navigate('/');
      getPosts(); // 변경된 포스트 리스트 불러오기
    }
  };

  // activeTab이 바뀔때마다 getPost() 호출
  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className='post__navigation'>
          <div
            role='presentation'
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation-active' : ''}>
            전체
          </div>
          <div
            role='presentation'
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation-active' : ''}>
            나의 글
          </div>
          {CATEGORIES?.map((category) => (
            <div
              key={category}
              role='presentation'
              onClick={() => setActiveTab(category)}
              className={
                activeTab === category ? 'post__navigation-active' : ''
              }>
              {category}
            </div>
          ))}
        </div>
      )}
      <div className='post__list'>
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post.id} className='post__box'>
              <Link to={`posts/${post.id}`}>
                <div className='post__profile-box'>
                  <div className='post__profile' />
                  <div className='post__author-name'>{post.email}</div>
                  <div className='post__date'>{post.createAt}</div>
                </div>
                <div className='post__title'>{post.title}</div>
                <div className='post__text'>{post.summary}</div>
              </Link>
              {post.email === user?.email && (
                <div className='post__utils-box'>
                  <div
                    role='presentation'
                    onClick={() => {
                      handelDelete(post.id as string);
                    }}
                    className='post__delete'>
                    삭제
                  </div>
                  <div className='post__edit'>
                    <Link to={`/posts/edit/${post.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='post__no-post'>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
