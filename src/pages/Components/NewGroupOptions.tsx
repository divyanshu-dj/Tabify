import React, { useState } from 'react';
import { ColorButton } from './ColorButton';

interface NewGroupButtonProps {
  handleClick: () => void;
}

export const NewGroupOptions: React.FC<NewGroupButtonProps> = ({ handleClick }) => {
  const [groupName, setGroupName] = useState('');
  const [isGroupNameValid, setIsGroupNameValid] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');

  const saveTabs = (groupName: string, selectedColor: string) => {
    if (!groupName) {
      setIsGroupNameValid(false);
      return;
    }
    setIsGroupNameValid(true);

    chrome.runtime.sendMessage({ message: 'get_tabs_info' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      if (response.error) {
        console.error(response.error);
        return;
      }

      const groupData = {
        groupName: groupName,
        tabs: response.tabs,
        color: selectedColor,
      };

      chrome.storage.local.set({ [groupName]: groupData }, () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
        }

        chrome.storage.local.get(['groups'], (result) => {
          const groups = result.groups || [];
          const updatedGroups = [groupData, ...groups];
          chrome.storage.local.set({ groups: updatedGroups }, () => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              return;
            }

            setGroupName('');
            handleClick();
          });
        });
      });
    });
  };

  return (
    <div className="m-2">
      <h2 className="font-bold text-lg">Create New Group</h2>
      <hr className="my-1" />
      <div>
        <input
          className={`border ${!isGroupNameValid ? 'border-red-500' : ''} border-gray-400 rounded-md p-2 w-full mt-2 text-lg`}
          placeholder="Group Name"
          spellCheck="false"
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {!isGroupNameValid && <p className="text-red-500">A group name must be chosen</p>}
        <ColorButton setSelectedColor={setSelectedColor} />
        <button
          className="w-full bg-black text-white rounded-full py-2 text-base font-semibold"
          onClick={() => saveTabs(groupName, selectedColor)}
        >
          New Group
        </button>
      </div>
    </div>
  );
};
