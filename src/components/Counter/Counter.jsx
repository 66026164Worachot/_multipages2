import { useState } from "react";
import "./Counter.css";

function Counter(props) {

    const [value, setValue] = useState(props.value || 0)       /*props.value เพื่อดึงค่าเริ่มต้นเป็น 10 จาก bang หน้า app || ถ้าไม่ใส่เข้ามาให้เริ่มต้น 0*/

    function increment(){
        // value = value + 1
        setValue(value + 1)
        console.log(value)
    }

    function decrement(){
        setValue(value - 1)
        console.log(value)
    }

  return (
    <div className = "counter-box">                                {/*ต้องใช้ div เพื่อรวบทั้งหมด เพราะไม่สามารถสร้างแยกได้*/}
      <h3 className="counter-name">{props.Name || "CounterD"}</h3>  {/*คือถ้า props มีชื่อจะขึ้นชื่อที่กำหนด ถ้าไม่มีจะเป็น CounterD*/}
      <button className="btn btn-danger" onClick={decrement}>-</button>
      <span className="counter-value">{value}</span>                                  {/*props.value or value*/}
      <button className="btn btn-success" onClick={increment}>+</button>   {/*ใน react ไม่ต้องใส่ ()*/}
    </div>
  );
}

export default Counter;

