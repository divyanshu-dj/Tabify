import React, { useState, useEffect } from 'react';
import trash from '../../assets/img/icons8-trash.svg';

export const SavedGroups = () => {
  const [savedGroups, setSavedGroups] = useState({});

  useEffect(() => {
    chrome.storage.local.get(null, (result: any) => {
      if (chrome.runtime.lastError) {
        console.log('Error getting');
        return;
      }
      setSavedGroups(result);
    });
  }, [savedGroups]);

  const openTabs = (groupData: any) => {
    chrome.windows.create({ url: groupData.tabs.map((tab: any) => tab.url) });
  };

  const deleteGroup = (groupName: string) => {
    chrome.storage.local.remove([groupName], () => {
      if (chrome.runtime.lastError) {
        console.log('Error deleting');
        return;
      }
      setSavedGroups((prevGroups) => {
        const newGroups: { [key: string]: any } = { ...prevGroups };
        delete newGroups[groupName];
        return newGroups;
      });
    });
  };

  return (
    <div className="p-2">
      {Object.keys(savedGroups).length === 0 ? (
        <h2 className="flex justify-center items-center text-center text-base h-full text-grey-300">
          Click On New Group
        </h2>
      ) : (
        <h2 className="text-base">Saved Groups</h2>
      )}

      <div className="max-h-64 overflow-auto scrollbar-thin scrollbar-webkit">
        {Object.entries(savedGroups).map(([key, value]) => {
          const groupData = value as { color: string; tabs: any[] };

          return (
            <div
              key={key}
              onClick={() => openTabs(groupData)}
              className="text-base m-2 p-2 px-6 bg-customGrey-savedGroups rounded-md cursor-pointer flex justify-between items-center"
            >
              <div
                className={`w-3 h-3 rounded-full mr-2 ${groupData.color}`}
              ></div>
              <h3>{key}</h3>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteGroup(key);
                }}
              >
                <img className="w-6 h-6 z-10" src={trash} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
