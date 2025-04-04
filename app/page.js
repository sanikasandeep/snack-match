"use client";
import { useState } from "react";
import Quiz from "./quiz"; // assuming your Quiz component is also in the app directory
import Image from "next/image";
import { Button } from "@mui/material";

export default function Home() {
  const [startQuiz, setStartQuiz] = useState(false);

  if (startQuiz) {
    return <Quiz />;
  }

  return (
    <div
      style={{
        backgroundColor: "#4e1f6f", // Purple background
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      {/* Logo */}
      <Image
        src="/mdlz_logo.jpeg"
        alt="Snack Match Logo"
        width={200}
        height={200}
        style={{ marginBottom: "1rem", borderRadius: "1rem" }}
      />

      {/* Slogan */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Find your snack match!
      </h1>

      {/* Start Quiz Button */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "#800080",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderRadius: "30px",
          padding: "0.75rem 2rem",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s",
        }}
        onClick={() => setStartQuiz(true)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Start the Quiz
      </Button>
    </div>
  );
}
