import React from 'react';

const UserInfoContext = React.createContext({ userInfo: {}, isSignedIn: false });

export default UserInfoContext;
