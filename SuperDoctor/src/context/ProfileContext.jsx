import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const profiles = [
  { id: 'self', name: 'Self', role: 'Primary', age: 34, bloodGroup: 'O+', allergies: 'Penicillin' },
  { id: 'parent', name: 'Parent (Mother)', role: 'Dependent', age: 62, bloodGroup: 'B+', allergies: 'None' },
  { id: 'child', name: 'Dependent (Child)', role: 'Dependent', age: 8, bloodGroup: 'O+', allergies: 'Peanuts' }
];

export const ProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);
  const [emergencyAccess, setEmergencyAccess] = useState(false);

  const switchProfile = (id) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) setActiveProfile(profile);
  };

  return (
    <ProfileContext.Provider value={{ activeProfile, switchProfile, profiles, emergencyAccess, setEmergencyAccess }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
