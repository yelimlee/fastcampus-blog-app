import { Link } from 'react-router-dom';

export default function PostDetail() {
  return (
    <>
      <div className='post__detail'>
        <div className='post__box'>
          <div className='post__title'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, rem
            totam aliquid aliquam laudantium
          </div>
          <div className='post__profile-box'>
            <div className='post__profile' />
            <div className='post__author-name'>패스트캠퍼스</div>
            <div className='post__date'>2023.07.08 토요일</div>
          </div>
          <div className='post__utils-box'>
            <div className='post__delete'>삭제</div>
            <div className='post__edit'>
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
          </div>
          <div className='post__text'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus, dolores est incidunt harum, inventore hic sapiente
            unde rerum eveniet eius sint. Suscipit, deleniti culpa nostrum nihil
            commodi aut odit recusandae!
          </div>
        </div>
      </div>
    </>
  );
}
