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

      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#6a1b9a", marginBottom: "20px" }}>
        Find your snack match!
      </h1>

      {finalSnack ? (
        <>
          <h2 style={{ fontSize: "2rem", color: "#6a1b9a" }}>
            Your snack match is: {finalSnack} 🎉
          </h2>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
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
                boxShadow: "0px 6px 15px rgba(106, 27, 154, 0.6)", // Slightly stronger glow
              },
              "&:active": {
                transform: "scale(0.95)", // Press-down effect
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
                transition: "left 0.5s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/cookie.png"
                alt="Cookie"
                width={30}
                height={30}
                style={{ borderRadius: "50%" }}
              />
            </Box>
          </Box>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#6a1b9a" }}>
            Question {currentQuestion + 1}
          </h3>

          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>
            {questions[currentQuestion].text}
          </h2>
          <RadioGroup
            onChange={(e) => handleAnswerSelect(e.target.value)}
            style={{ width: "100%", maxWidth: "600px" }}
          >
            {questions[currentQuestion].answers.map((option) => (
              <Box
                key={option.text}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  padding: "12px",
                  marginBottom: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft glow
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)", // Lift effect
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)", // Stronger glow
                  },
                  "&:active": {
                    transform: "scale(0.98)", // Press down effect
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
            ))}
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

