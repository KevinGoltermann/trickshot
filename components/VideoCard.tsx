import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {

  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  useEffect(() => {
    if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image width={62} height={62} className="rounded-full" src={post.postedBy.image} alt="profile picture" layout="responsive"></Image>
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                  {post.postedBy.userName}
                  {' '}
                  <GoVerified className='text-blue-400 text-md'></GoVerified>
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <Link href={`/detail/${post._id}`}>
            <video 
              src={post.video.asset.url} 
              ref={videoRef} 
              loop 
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            >
            </video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
              {playing ? (
                <button>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' onClick={onVideoPress} />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' onClick={onVideoPress}/>
                </button>
              )}
              {isVideoMuted ? (
                <button>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' onClick={() => setIsVideoMuted(false)} />
                </button>
              ) : (
                <button>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' onClick={() => setIsVideoMuted(true)} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard