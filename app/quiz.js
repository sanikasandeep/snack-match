"use client"; // Needed for Next.js App Router
import { useState, useEffect } from "react";
import { Button, RadioGroup, FormControlLabel, Radio, LinearProgress, Box} from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";


export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedSnacks, setSelectedSnacks] = useState({});
  const [finalSnack, setFinalSnack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();

  // Fetch questions from JSON file
  useEffect(() => {
    fetch("/questions.json") // Assuming it's in the `public/` folder
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions); // Access the "questions"xwarray
        setLoading(false);
      });
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (snack) => {
    setSelectedSnacks((prev) => ({ ...prev, [currentQuestion]: snack }));
  };

  const calculateFinalSnack = () => {
    // Count occurrences of each snack
    const snackCount = {};
    Object.values(selectedSnacks).forEach((snack) => {
      snackCount[snack] = (snackCount[snack] || 0) + 1;
    });

    // Sort snacks by frequency (descending)
    const sortedSnacks = Object.entries(snackCount).sort((a, b) => b[1] - a[1]);

    if (sortedSnacks.length === 0) return null;

    // one most frequent snack, return it
    if (sortedSnacks[0][1] > 1) return sortedSnacks[0][0];

    // two tied snacks, return first (or random)
    if (sortedSnacks.length > 1 && sortedSnacks[0][1] === sortedSnacks[1][1]) {
      return sortedSnacks[Math.random() < 0.5 ? 0 : 1][0]; // Random between two
    }

    // no duplicates, pick a random snack from user's selections
    const randomSnack = Object.values(selectedSnacks)[
      Math.floor(Math.random() * Object.values(selectedSnacks).length)
    ];
    return randomSnack;
  };

  // Move to the next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalSnack(calculateFinalSnack()); // Handle final snack selection
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const retakeQuiz = () => {
    setSelectedSnacks({});
    setFinalSnack(null);
    setCurrentQuestion(0);
  };

  if (loading) return <p>Loading...</p>;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const snackImages = {
    "Cadbury": "/Cadbury.jpg",
    "Oreo": "/oreo.jpeg",
    "Clif Bar": "/clif.jpeg",
    "Sour Patch Kids": "/sour_patch_kids.jpg",
    "BelVita": "/belvita.jpg",
    "Tang": "/tang.jpeg",
    "Toblerone": "/toblerone.jpg",
    "Triscuit": "/triscuit.jpg",
    "Wheat Thins": "/wheat_thins.jpeg",
    "Tates Bake Shop": "/tates_bake_shop.jpeg",
    "Ritz": "/ritz.jpg",
    "Philadelphia Cream Cheese": "/philadelphia.jpg",
    "Oreo": "/oreo.jpeg",
    "Milka": "/milka.jpeg",
    "Honey Maid": "/honey_maid.jpg",
    "Halls": "/halls.jpeg",
    "Clif Bar": "/clif.jpeg",
    "Chips Ahoy!": "/chips_ahoy.jpeg",
    "Cadbury": "/Cadbury.jpg",
    "Bournvita": "/bournvita.jpeg",
    "BelVita": "/belvita.jpg",
    "5 Star": "/5_star.webp"
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {finalSnack && <Confetti width={width} height={height} gravity={0.1} numberOfPieces={200} />}

      {/*<h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#6a1b9a", marginBottom: "20px" }}>
        Find your snack match!
      </h1>*/}

      {finalSnack ? (
        <>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ fontSize: "1.5rem", color: "#6a1b9a", fontWeight: "500" }}>
              Your snack match is:
            </p>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#6a1b9a", marginTop: "10px" }}>
              {finalSnack} 🎉
            </h1>
          </div>
          {snackImages[finalSnack] && (
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Image
                src={snackImages[finalSnack]}
                alt={finalSnack}
                width={250}
                height={250}
                style={{
                  objectFit: "contain",
                  borderRadius: "16px",
                  maxWidth: "90vw",
                }}
              />
            </div>
          )}
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              fontSize: "1.2rem",
              marginTop: "20px",
              backgroundColor: "#6a1b9a",
              color: "white",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(106, 27, 154, 0.4)", // white glow effect
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#7b2cbf",
                boxShadow: "0px 6px 15px rgba(106, 27, 154, 0.6)", // slightly stronger glow
              },
              "&:active": {
                transform: "scale(0.95)", // press-down effect
              },
            }}
          >
            Retake Quiz
          </Button>
        </>
      ) : (
        <>
          <Box sx={{ position: "relative", width: "80%", margin: "0 auto", marginBottom: "2rem" }}>
            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={(currentQuestion / 7) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#eee",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#800080",
                },
              }}
            />

            {/* Cookie image positioned based on progress */}
            <Box
              sx={{
                position: "absolute",
                top: "-7px", // adjust to move image vertically
                left: `calc(${(currentQuestion / 7) * 100}% - 15px)`, // adjust -15px to center image
                transition: "left 0.59s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/cookie.png"
                alt="Cookie"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            </Box>
          </Box>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#4e1f6f" }}>
            Question {currentQuestion + 1}
          </h3>
          <Box fontWeight='600'>
            <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#4e1f6f"}}>
              {questions[currentQuestion].text}
            </h2>
          </Box>
          <RadioGroup
            onChange={(e) => handleAnswerSelect(e.target.value)}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            {questions[currentQuestion].answers.map((option, index) => {
            let backgroundColor = "white"; // Default background

            // Assign background colors based on index
            if (index === 0) {
              backgroundColor = "#eae4ee"; // A
            } else if (index === 1) {
              backgroundColor = "#faecda"; // B
            } else if (index === 2) {
              backgroundColor = "#e1ecdf"; // C
            } else if (index === 3) {
              backgroundColor = "#dde8f1"; // D
            }

            return (
              <Box
                key={option.text}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: backgroundColor, // Apply dynamic background color
                  borderRadius: "15px",
                  padding: "12px",
                  marginBottom: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                  },
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                <FormControlLabel
                  value={option.snack}
                  control={
                    <Radio sx={{"&.Mui-checked": {color: "#6a1b9a"}}}/>
                  }
                  label={option.text}
                  style={{ width: "100%", fontSize: "1.2rem", color: "#555" }}
                />
              </Box>
              );
            })}
          </RadioGroup>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: "600px", marginTop: "20px" }}>
            {/* Back Button */}
            <Button
              variant="contained"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "#6a1b9a",
                color: "white",
                borderRadius: "25px",
                boxShadow: "0px 4px 10px rgba(106, 27, 154, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#7b2cbf",
                  boxShadow: "0px 6px 15px rgba(106, 27, 154, 0.6)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              Back
            </Button>
          <Button
            variant="contained"
            onClick={nextQuestion}
            disabled={!selectedSnacks[currentQuestion]}
            sx={{
              fontSize: "1.2rem",
              marginTop: "20px",
              backgroundColor: "#6a1b9a",
              color: "white",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(106, 27, 154, 0.4)", // White glow effect
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#7b2cbf",
                boxShadow: "0px 6px 15px rgba(106, 27, 154, 0.6)", // glow effect
              },
              "&:active": {
                transform: "scale(0.95)", // Press-down effect
              },
            }}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "See Result"}
          </Button>
          </div>
        </>
      )}
    </div>
  );
}

