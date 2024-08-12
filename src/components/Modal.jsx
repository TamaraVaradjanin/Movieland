import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../data/modalSlice'
import '../styles/modal.scss'
import YouTubePlayer from './YoutubePlayer'

const Modal = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {
    modal: { videoKey = '' },
  } = state

  return (
    <div className="modal">
      <div className="modal-wrapper">
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div className="no-trailer">
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}
        <button type="button" id="close-button" onClick={() => dispatch(closeModal())} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}

export default Modal
