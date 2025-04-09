"use client";
import { useState } from "react";
import Quiz from "./quiz"; // assuming your Quiz component is also in the app directory
import Image from "next/image";
import { Button } from "@mui/material";

export default function Home() {
  const [startQuiz, setStartQuiz] = useState(false);

  const scatteredImages = [
    { src: "/small_bar.png", top: "5%", left: "10%" },
    { src: "/small_candy.png", top: "20%", left: "80%" },
    { src: "/small_chocolate.png", top: "70%", left: "5%" },
    { src: "/small_cracker.png", top: "60%", left: "85%" },
    { src: "/small_cupcake.png", top: "20%", left: "35%" },
    { src: "/small_drink.png", top: "80%", left: "50%" },
    { src: "/small_bar.png", top: "5%", left: "10%" },
    { src: "/small_candy.png", top: "20%", left: "80%" },
    { src: "/small_chocolate.png", top: "70%", left: "5%" },
    { src: "/small_cracker.png", top: "60%", left: "85%" },
    { src: "/small_cupcake.png", top: "20%", left: "35%" },
    { src: "/small_drink.png", top: "80%", left: "50%" },
    { src: "/small_candy.png", top: "40%", left: "17%" },
    { src: "/small_candy.png", top: "40%", left: "17%" },
    { src: "/small_drink.png", top: "9%", left: "65%" },
    { src: "/small_drink.png", top: "9%", left: "65%" },
    { src: "/small_bar.png", top: "90%", left: "72%" },
    { src: "/small_bar.png", top: "90%", left: "72%" },
    { src: "/small_cracker.png", top: "83%", left: "25%" },
    { src: "/small_cracker.png", top: "83%", left: "25%" },
    { src: "/small_chocolate.png", top: "40%", left: "95%" },
    { src: "/small_chocolate.png", top: "40%", left: "95%" },
    // Add more if needed
  ];

  {scatteredImages.map((img, index) => (
    <Image
      key={index}
      src={img.src}
      alt={`snack-${index}`}
      width={40}
      height={40}
      style={{
        position: "absolute",
        top: img.top,
        left: img.left,
        pointerEvents: "none",
        filter: "contrast(0) brightness(2)", // Makes it white
        opacity: 1,
      }}
    />
  ))}

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
      {/* Scattered PNGs */}
      {scatteredImages.map((img, index) => (
        <Image
          key={index}
          src={img.src}
          alt={`snack-${index}`}
          width={40}
          height={40}
          style={{
            position: "absolute",
            top: img.top,
            left: img.left,
            opacity: 0.8,
            pointerEvents: "none", // prevents hover blocking
          }}
        />
      ))}

      {/* Logo */}
      <Image
        src="/mdlz_logo.jpeg"
        alt="Snack Match Logo"
        width={300}
        height={300}
        style={{ marginBottom: "1rem", borderRadius: "1rem" }}
      />

      {/* Slogan */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Take this quiz and find your snack match!
      </h1>

      {/* Start Quiz Button */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "#4e1f6f",
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
