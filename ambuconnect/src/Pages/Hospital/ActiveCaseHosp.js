import React, { memo, useState, useEffect } from "react";
import { useUser } from "../UserContext";
import { Client, Databases, Query } from "appwrite";
import conf from "../../conf/conf";
import Navbar from "../../HomePage/Navbar";
import spinner from "../../Assets/svg-spinner.svg";
import PatientCardActive from "../PatientCardActive";

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const Activecaseshosp = () => {
  const { userEmail } = useUser();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const listCompletedCasesAmbu = async () => {
      try {
        const response = await databases.listDocuments(
          conf.appwriteDbId,
          conf.appwriteCollectionId,
          [
            Query.equal("Hospital_Email", userEmail),
            Query.equal("status", false),
          ]
        );

        const patientData = await Promise.all(
          response.documents.map(async (document) => {
            try {
              const fetchedlisteddoc = await databases.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                document.$id
              );
              console.log(fetchedlisteddoc);
              return fetchedlisteddoc;
            } catch (error) {
              console.error("Error docid fetch document:", error);
              return null;
            }
          })
        );

        setPatients(patientData.filter((patient) => patient !== null));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error listing documents:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    listCompletedCasesAmbu();
  }, [userEmail]);

  if (loading) {
    return (
      <div style={{ "margin-left": "50%", "margin-top": "10%" }}>
        <img src={spinner} width={"100px"} alt="loading"></img>
        <br />
        <p>Loading.......</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return <div>No data found or an error occurred</div>;
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <PatientCardActive key={patient.$id} patient={patient} />
        ))}
      </div>
    </>
  );
};

export default memo(Activecaseshosp);
