import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import banner from '../assets/banner.svg';
import footer from '../assets/footer.svg';

const UserInput = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate('/pokedex');
  };

  return (
    <div className="text-center mt-5">
      <img
        src={banner}
        alt=""
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0',
          padding: '0',
          preserveAspectRatio: 'none',
        }}
      />
      <h1 style={{ color: 'red' }}>¡HELLO TRAINERS!</h1>
      <h6>Welcome to the pokemon world</h6>
      <div className="input-group justify-content-center">
        <input
          className="form-control text-center"
          placeholder="Type your name"
          style={{ maxWidth: '250px' }}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="btn btn-outline-danger" onClick={getName}>
          Start
        </button>
      </div>
      <img
        src={footer}
        alt=""
        style={{ width: '100%', position: 'absolute', bottom: '0', left: '0' }}
      />
    </div>
  );
};

export default UserInput;
