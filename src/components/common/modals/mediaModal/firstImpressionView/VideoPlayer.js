import React, { useEffect, useRef, useState } from 'react'

const VideoPlayer = (props) => {
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    const initPlayer = () => {
      if (!isReady || typeof window.cloudinary === 'undefined') {
        return
      }

      try {
        if (playerRef.current) {
          playerRef.current.dispose()
        }

        playerRef.current = window.cloudinary.videoPlayer(videoRef.current, {
          cloud_name: props.options.cloudName,
          secure: true,
          publicId: props.options.publicId,
          fluid: false,
          controls: true,
          preload: 'auto',
          mute: false,
          autoplay: false,
          loop: true,
          sourceTypes: ['mp4'],
          width: 1280,
          height: 720,
          responsive: true,
          aspectRatio: '9:9',
        })

        playerRef.current.on('ended', () => {
          playerRef.current.play()
        })
      } catch (error) {
        console.error('Error initializing Cloudinary player:', error)
      }
    }

    initPlayer()

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose()
          playerRef.current = null
        } catch (error) {
          console.error('Error disposing player:', error)
        }
      }
    }
  }, [isReady, props.options.cloudName, props.options.publicId])

  return (
    <div className="video-player-wrapper">
      <video
        ref={videoRef}
        className="fn-video cld-video-player"
        id="cloudinary-video-player"
        controls
        playsInline
        loop
        width="1280"
        height="720"
      >
        <source
          src={`https://res.cloudinary.com/${props.options.cloudName}/video/upload/${props.options.publicId}.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
