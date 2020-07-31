import React, { useState } from 'react';
import ViewContext from './viewContext';

const ViewState = (props) => {
  const [sideNav, setSideNav] = useState(false);

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  return (
    <ViewContext.Provider
      value={{
        sideNav,
        toggleSideNav,
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
};

export default ViewState;
