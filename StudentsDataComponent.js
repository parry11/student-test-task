import { useState } from "react";
import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    const studentsDataCopy = [];
    const schoolsDataCopy = [];
    const legalguardiansDataCopy = [];
    for (const studentId of studentIds) {
      const studentData = await fetchStudentData(studentId);
      studentsDataCopy.push(studentData);
    }

    for (const student of studentsDataCopy) {
      const { schoolId, legalguardianId } = student;
      const schoolData = await fetchSchoolData(schoolId);
      schoolsDataCopy.push(schoolData);

      const legalguardianData = await fetchLegalguardianData(legalguardianId);
      legalguardiansDataCopy.push(legalguardianData);
    }
    setStudentsData([...studentsDataCopy]);
    setSchoolsData([...schoolsData, schoolData]);
    setLegalguardiansData([...legalguardiansData, legalguardianData]);
    for (const studentId of studentIds) {
      const studentData = await fetchStudentData(studentId);
      setStudentsData([...studentsData, studentData]);
      for (const student of studentData) {
        const { schoolId, legalguardianId } = student;
        const schoolData = await fetchSchoolData(schoolId);
        setSchoolsData([...schoolsData, schoolData]);
        const legalguardianData = await fetchLegalguardianData(legalguardianId);
        setLegalguardiansData([...legalguardiansData, legalguardianData]);
      }
    }
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
