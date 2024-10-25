import React, { useState, useEffect } from "react";

const fiedlWidth = 800; // ความกว้างของ field
const fiedlHeight = 500; // ความสูงของ field
const diameter = 70; // ขนาดลูกบอล

const maxLeft = fiedlWidth - diameter - 2;
const maxTop = fiedlHeight - diameter - 2;

const Animation = () => {
  const [vx, setVx] = useState(5); // ความเร็วแนวนอน
  const [vy, setVy] = useState(5); // ความเร็วแนวตั้ง
  const [running, setRunning] = useState(false); // เริ่มต้นยังไม่ run
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0); // การหมุน
  const [rotationSpeed, setRotationSpeed] = useState(3); // ความเร็วในการหมุนของลูกบอล
  const [ballImage, setBallImage] = useState("none"); // รูปภาพของลูกบอล

  // สุ่มความเร็วใหม่ระหว่าง 2 ถึง 4 พิกเซลต่อเฟรม
  const randomSpeed = () => Math.floor(Math.random() * 4) + 2;

  // สุ่มความเร็วการหมุนใหม่
  const randomRotationSpeed = () => Math.floor(Math.random() * 4) + 2;

  // ฟังก์ชันเคลื่อนที่
  const calculate = () => {
    let newX = x;
    let newY = y;

    if (newX >= maxLeft) {
      setGoRight(false);
      const newSpeed = randomSpeed();
      setVx(newSpeed);
      setVy(newSpeed);
      setRotationSpeed(randomRotationSpeed());
    }
    if (newX <= 0) {
      setGoRight(true);
      const newSpeed = randomSpeed();
      setVx(newSpeed);
      setVy(newSpeed);
      setRotationSpeed(randomRotationSpeed());
    }
    if (newY >= maxTop) {
      setGoDown(false);
      const newSpeed = randomSpeed();
      setVx(newSpeed);
      setVy(newSpeed);
      setRotationSpeed(randomRotationSpeed());
    }
    if (newY <= 0) {
      setGoDown(true);
      const newSpeed = randomSpeed();
      setVx(newSpeed);
      setVy(newSpeed);
      setRotationSpeed(randomRotationSpeed());
    }

    if (goRight) {
      newX += vx;
    } else {
      newX -= vx;
    }
    if (goDown) {
      newY += vy;
    } else {
      newY -= vy;
    }

    setX(newX);
    setY(newY);

    setRotation((prevRotation) => (prevRotation >= 360 ? 0 : prevRotation + rotationSpeed));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
      }
    }, 25); // ทำงานทุก 25ms

    return () => clearInterval(interval);
  }, [x, y, running, vx, vy, rotationSpeed, goRight, goDown]);

  const handleRunClick = () => setRunning(!running);

  const changeImage = (type) => {
    switch (type) {
      case "basketball":
        setBallImage("url(./png-transparent-basketball-illustration-basketball-sports-equipment-sports-league-woodville-tompkins-institute-basketball-sport-orange-team-thumbnail-removebg-preview.png)");
        break;
      case "football":
        setBallImage("url(./F4A2000_M1.jpg)");
        break;
      case "volleyball":
        setBallImage("url(./Volleyball.jpg)");
        break;
      case "human":
        setBallImage("url('/Guide.png')");
        break;
      case "cartoon":
        setBallImage("url(./photo-1515041219749-89347f83291a.jpg)");
        break;
      case "logo":
        setBallImage("url(./15635757_5643919.jpg)");
        break;
      default:
        setBallImage("none");
        break;
    }
  };

  return (
    <div id="container" style={{ margin: "10px auto", width: "fit-content", border: "1px solid rgb(2, 0, 95)", borderRadius: "5px" }}>
      <div
        id="field"
        style={{
          width: fiedlWidth + "px",
          height: fiedlHeight + "px",
          border: "1px solid rgb(0, 0, 0)",
          margin: "10px",
          backgroundImage: "url(./cute-abstract-modern-background-free-vector.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <div
          id="ball"
          style={{
            width: diameter + "px",
            height: diameter + "px",
            borderRadius: "50%",
            border: "1px solid rgb(0, 0, 0)",
            backgroundColor: "rgb(249, 189, 255)",
            position: "absolute",
            top: y + "px",
            left: x + "px",
            backgroundImage: ballImage,
            backgroundSize: "120%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `rotate(${rotation}deg)`,
          }}
        ></div>
      </div>

      <div id="control" style={{ margin: "10px" }}>
        <button onClick={handleRunClick} className={`btn ${running ? "btn-danger" : "btn-success"} me-4`}>
          {running ? "Pause" : "Run"}
        </button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("none")}>None</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("basketball")}>Basketball</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("football")}>Football</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("volleyball")}>Volleyball</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("human")}>Human</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("cartoon")}>Cartoon</button>
        <button className="btn btn-dark me-2" onClick={() => changeImage("logo")}>Logo</button>
      </div>
    </div>
  );
};

export default Animation;