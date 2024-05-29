import React, { useState } from 'react';
import { NewGroupButton } from '../Components/NewGroupButton';
import { SavedGroups } from '../Components/SavedGroups';
import { TitleBar } from '../Components/TitleBar';
import { NewGroupOptions } from '../Components/NewGroupOptions';

const Tabify = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleNewGroupClick = () => {
    setShowOptions(currentShowOptions => !currentShowOptions);
  };

  return (
    <div className="">
      <header className="">
        <div className="w-[20rem] p-2 rounded-2xl">
          {showOptions ? (
            <NewGroupOptions handleClick={handleNewGroupClick} />
          ) : (
            <>
              <TitleBar />
              <NewGroupButton handleClick={handleNewGroupClick} />
              <hr className="h-px my-3 bg-gray-100 border-0 dark:bg-gray-200" />
              <SavedGroups />
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Tabify;
