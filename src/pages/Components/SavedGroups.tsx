import React, { useState, useEffect } from 'react';
const trash = require('../../assets/img/icons8-trash.svg');

interface Group {
  groupName: string;
  color: string;
  tabs: chrome.tabs.Tab[];
}

export const SavedGroups = () => {
  const [savedGroups, setSavedGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = () => {
      chrome.storage.local.get(['groups'], (result) => {
        if (chrome.runtime.lastError) {
          console.log('Error getting groups');
          return;
        }
        setSavedGroups(result.groups || []);
      });
    };

    loadGroups();
  }, []);

  const openTabs = (groupData: Group) => {
    const urls = groupData.tabs.map((tab) => tab.url).filter((url) => url !== undefined) as string[];
    if (urls.length > 0) {
      chrome.windows.create({ url: urls });
    }
  };

  const deleteGroup = (groupName: string) => {
    chrome.storage.local.get(['groups'], (result) => {
      if (chrome.runtime.lastError) {
        console.log('Error getting groups');
        return;
      }
      const groups = result.groups || [];
      const updatedGroups = groups.filter((group: Group) => group.groupName !== groupName);

      chrome.storage.local.set({ groups: updatedGroups }, () => {
        if (chrome.runtime.lastError) {
          console.log('Error deleting group');
          return;
        }
        setSavedGroups(updatedGroups);
      });
    });
  };

  return (
    <div className="p-2">
      {savedGroups.length === 0 ? (
        <h2 className="flex justify-center items-center text-center text-base h-full text-customGrey-text">
          Click On New Group
        </h2>
      ) : (
        <h2 className="text-base text-customGrey-text">Saved Groups</h2>
      )}

      <div className="max-h-64 overflow-auto scrollbar-thin scrollbar-webkit">
        {savedGroups.map((group) => (
          <div
            key={group.groupName}
            onClick={() => openTabs(group)}
            className="text-base m-2 p-2 px-6 bg-customGrey-savedGroups rounded-md cursor-pointer flex justify-between items-center"
          >
            <div className='flex items-center gap-2'>
              <div
                className={`w-3 h-3 rounded-full mr-2 ${group.color || 'bg-black'}`}
              ></div>
              <h3 className='max-w-[134px] overflow-hidden'>{group.groupName}</h3>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteGroup(group.groupName);
              }}
            >
              <img className="w-6 h-6 z-10" src={trash} alt="Delete icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
