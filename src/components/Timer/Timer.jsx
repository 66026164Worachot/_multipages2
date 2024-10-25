import { useEffect, useState } from "react"; /*ใช้ usestate */
import "./Timer.css";

function Timer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState( 10 * 36244);     /*เช็คเวลา */

  /*สร้างปุ่ม Run */
  function runClick() {
    setRunning(!running); /*กลับจากจริงเป็นเท็จ */
  }

  useEffect( () => {
    let interval = null
    if (running) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      },1000)
    }
    return () => clearInterval(interval)   /** */
  }, [running,seconds])

  function secondsToString(seconds){               /*sec รับวินาทีออกมาเป็นข้อความ*/
    const MINUTE_SECONDS = 60
    const HOUR_SECONDS = 60 * MINUTE_SECONDS
    const DAY_SECONDS = 24 * HOUR_SECONDS

    const days = Math.floor(seconds / DAY_SECONDS)   /*math.floor ปัดลงมา */
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS)
    const minute = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS)
    const secs = seconds % MINUTE_SECONDS 

    if (days > 0){                   /*แสดงออกมายังไง */
      return `${days}D ${hours}H ${minute}M ${secs}S`
    } else if (hours > 0) {       /*เช็คถ้าไม่มีวัน แต่มีชั่วโมง */
      return `${hours}H ${minute}M ${secs}S`    
    } else if (minute > 0) {      /*เช็คถ้าไม่มีชั่วโมง แต่มีนาที */
      return `${minute}M ${secs}S`
    } else {                      /*เช็คถ้าไม่มีนาทีหรือไม่มีสักอัน แต่มีวินาที */
      return `${secs}S`
    }
  }

  function resetClick (){
    setRunning(false)        /*รีเช็ท Run */
    setSeconds(0)            /*เช็ทเวลาเป็น 0 */
  }


  return (
    <div className="timer-container">
      <h3 className="timer-title">Timer</h3>
      <p>
        <input
          className="timer-display"
          type="text"
          readOnly={true}
          // placeholder="3d 23h 35m 10s"
          value={secondsToString(seconds)} /*เรียก fun และใส่ sec แลัวมันทำงานไปเรื่อยๆ */
        />
      </p>
      <div className="timer-button">
        <button className="btn btn-danger" onClick={resetClick} >Reset</button>
        <button className={"btn " + (running ? "btn btn-warning" : "btn btn-success")} onClick={runClick}>  {/*Running โชว์เป็นเหลือง ถ้าไม่เป็นสีเขียว*/}
          {running ? 'Pause' : 'Run'}              {/*กลับจากจริงเป็นเท็จนำมาใช้ตรงนี้ ถ้าจริงเป็น Pause ถ้าเท็จเป็น Run*/}
        </button>     
      </div>
    </div>
  );
}

export default Timer;


