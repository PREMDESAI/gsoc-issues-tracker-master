"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function IssueDetails() {
  const { organizationName, repoName } = useParams();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `/api/repos/${organizationName}/${repoName}/issues`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIssues(data.Allissues);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [organizationName, repoName]);

  const totalPages = Math.ceil(
    issues.filter((issue) => issue.state === "open" && !issue.assignee).length /
      itemsPerPage
  );
  const currentIssues = issues
    .filter((issue) => issue.state === "open" && !issue.assignee)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-2 justify-center mt-[20%]">
        <div className="spinner"></div>
        <div>Loading....</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-20 w-full">
      <div className="flex flex-col items-center justify-center w-full h-50 bg-blue-200 shadow-md p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{repoName}</h1>
        <p className="text-lg text-gray-600">
          Total Unassigned Issues: {issues.length}
        </p>
      </div>

      <MDBRow className="w-full md:w-10/12 lg:w-8/12">
        {currentIssues.map((issue) => (
          <MDBCol md="6" lg="4" className="mb-4" key={issue.id}>
            <MDBCard
              className="h-100 d-flex flex-column"
              style={{
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <MDBCardBody className="d-flex flex-column">
                <MDBCardTitle
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: "bold",
                    color: "#34495e",
                  }}
                >
                  {issue.title}
                </MDBCardTitle>
                <MDBCardText
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "14px",
                    color: "#7f8c8d",
                  }}
                >
                  <strong>Issue Number:</strong> {issue.number}
                </MDBCardText>
                <MDBCardText
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "14px",
                    color: "#7f8c8d",
                  }}
                >
                  <strong>Created At:</strong>{" "}
                  {new Date(issue.created_at).toLocaleDateString()}
                </MDBCardText>
                <MDBCardText
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "14px",
                    color: "#7f8c8d",
                  }}
                >
                  <strong>Updated At:</strong>{" "}
                  {new Date(issue.updated_at).toLocaleDateString()}
                </MDBCardText>
                <MDBCardText
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "14px",
                    color: "#7f8c8d",
                  }}
                >
                  <strong>State:</strong> {issue.state}
                </MDBCardText>
                {issue.assignee ? (
                  <div>
                    <MDBCardText
                      style={{
                        fontFamily: "Verdana, sans-serif",
                        fontSize: "14px",
                        color: "#7f8c8d",
                      }}
                    >
                      <strong>Assignee:</strong> {issue.assignee.login}
                    </MDBCardText>
                    <MDBCardImage
                      src={issue.assignee.avatar_url}
                      alt={`${issue.assignee.login}'s avatar`}
                      className="img-fluid rounded-circle mb-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "2px solid #2980b9",
                      }}
                    />
                  </div>
                ) : (
                  <MDBCardText
                    style={{
                      fontFamily: "Verdana, sans-serif",
                      fontSize: "14px",
                      color: "#7f8c8d",
                    }}
                  >
                    <strong>Assignee:</strong> No assignee
                  </MDBCardText>
                )}
                <MDBCardText
                  style={{
                    fontFamily: "Verdana, sans-serif",
                    fontSize: "14px",
                    color: "#7f8c8d",
                  }}
                >
                  <strong>Comments:</strong> {issue.comments}
                </MDBCardText>

                <div className="mt-auto text-center">
                  <MDBBtn
                    href={`https://github.com/${organizationName}/${repoName}/issues/${issue.number}`}
                    target="_blank"
                    color="dark"
                    className="w-100"
                    style={{
                      borderRadius: "10px",
                      fontWeight: "bold",
                      backgroundColor: "#34495e",
                      color: "#ecf0f1",
                      border: "none",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    View on GitHub
                    <MDBIcon fab icon="github" className="ml-2" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      <MDBPagination className="mb-4 flex items-center justify-center mt-8 cursor-pointer">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <MDBPaginationItem active={i + 1 === currentPage} key={i}>
            <MDBPaginationLink onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={handleFirstPage}>
            First Page
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </div>
  );
}
