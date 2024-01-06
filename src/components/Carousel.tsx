import { useState } from 'react';

const IMAGE_1_URL =
  'https://images.unsplash.com/photo-1703692218696-c9f830a81f65?q=80&w=2968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_2_URL =
  'https://images.unsplash.com/photo-1703717101037-132d2c3fdd03?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const IMAGE_3_URL =
  'https://images.unsplash.com/photo-1703803828769-36c110f2d4e1?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function Carousel() {
  const [activeImage, setActiveImage] = useState(1);

  return (
    <div>
      <div className='carousel'>
        <ul className='carousel__slides'>
          <input
            type='radio'
            name='radio-buttons'
            id='img-1'
            checked={activeImage === 1}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img alt='scenery 1' src={IMAGE_1_URL} />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(3)}
                className='carousel__slide-prev'>
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(2)}
                className='carousel__slide-next'>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type='radio'
            name='radio-buttons'
            id='img-2'
            checked={activeImage === 2}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img src={IMAGE_2_URL} alt='scenery 1' />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(1)}
                className='carousel__slide-prev'>
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(3)}
                className='carousel__slide-next'>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input
            type='radio'
            name='radio-buttons'
            id='img-3'
            checked={activeImage === 3}
            readOnly
          />
          <li className='carousel__slide-container'>
            <div className='carousel__slide-img'>
              <img alt='scenery 3' src={IMAGE_3_URL} />
            </div>
            <div className='carousel__controls'>
              <label
                onClick={() => setActiveImage(2)}
                className='carousel__slide-prev'>
                <span>&lsaquo;</span>
              </label>
              <label
                onClick={() => setActiveImage(1)}
                className='carousel__slide-next'>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <div className='carousel__dots'>
            <label
              onClick={() => setActiveImage(1)}
              className='carousel__dot'
              id='img-dot-1'></label>
            <label
              onClick={() => setActiveImage(2)}
              className='carousel__dot'
              id='img-dot-2'></label>
            <label
              onClick={() => setActiveImage(3)}
              className='carousel__dot'
              id='img-dot-3'></label>
          </div>
        </ul>
      </div>
    </div>
  );
}
