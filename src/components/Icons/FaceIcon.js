import '../../styling/Icons/FaceIcon.css';

const FaceIcon = sad => {
    return (
        <i className="icon-face" data-sad={sad}>
            <i className='eye-1'></i>
            <i className='eye-2'></i>
            <i className='mouth'></i>
        </i>
    )
};

export default FaceIcon;