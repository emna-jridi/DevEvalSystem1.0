/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect, useContext } from "react";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employeeFullName, setEmployeeFullName] = useState(
    localStorage.getItem("employeeFullName") || ""
  );
  const [releaseName, setReleaseName] = useState(localStorage.getItem("releaseName") || "");

  useEffect(() => {
    localStorage.setItem("employeeFullName", employeeFullName);
  }, [employeeFullName]);

  useEffect(() => {
    localStorage.setItem("releaseName", releaseName);
  }, [releaseName]);

  const updateEmployeeFullName = (newName) => {
    setEmployeeFullName(newName);
  };

  const updateReleaseName = (newRelease) => {
    setReleaseName(newRelease);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employeeFullName,
        updateEmployeeFullName,
        releaseName,
        updateReleaseName,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

const useEmployeeContext = () => useContext(EmployeeContext);

export { EmployeeProvider, useEmployeeContext };
/* eslint-enable react/prop-types */
