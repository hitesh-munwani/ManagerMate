import ActionTypes from '../utils/store';

const INITIAL_STATE = {
  userTheme: 'dark',
  bettingLines: 'advanced',
  userData: {
    firstname: '',
    lastname: '',
    username: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    profile_pic_link: 'https://static.wikia.nocookie.net/disney/images/5/50/Profile_-_Anakin_Skywalker.png/revision/latest/thumbnail/width/360/height/360?cb=20190313110540',
    wins: 12,
    following: 135,
    followers: 95,
    walletAmount: 1245.90,
    email: 'rd2d@gmail.com',
    // date_of_birth: new Date(),
    wallet_amount: 10.00,
    feed: []
  },
  otherUserData: {
  },
};


const currentUserReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ActionTypes.USER_DATA:
      return {
        ...state, userData: action.payload,
      };
    default:
      return state;
  }
};



export default currentUserReducer;
