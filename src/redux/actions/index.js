const SAVE_USER = 'SAVE_USER';

const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

export {
  SAVE_USER,
  saveUser,
};
