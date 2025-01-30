import "./testing.css";
import { useState } from "react";

//let count = 0;// meken thama hookseka hadanna kalin api increment venna
//haduve eth ehema hadala hariyanne na hooks nathuva reat vala veriable manage
//karanna ba e nisa apata me vadak na meka api hook ekk magin karagannava methanin
//me veraible eka ain karala api eka dan udin hadamu
export default function TestOne() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Name");
  //methama use state hook eka mekediapata veriable eka arrey ekkata dala denava methana 0
  // apata inzilize karana velavadei thiyenna oni value eka
  // me hook eken apata deval dekak denava e thama veraible ekk saha function ekk (setCount)
  // me count kiyana value eka apata chanage karaganna  puluvan me setCount function eka magin
  // ethhakota e avashya vade karanne set count function eka athule

  function function1() {
    console.log("incrementinvg");
    setCount(count + 1);
    // count = count + 1//methana venama karamu vade dan api hadapu hook eka athule
    //  thibbe function eke karagathtaha
  }

  function function2() {
    setCount(count - 1); //me set count eken verible eka venas akrana gaman page refresh karnava
  }

  function btn1() {
    setName("Student");
  }

  function btn2() {
    setName("Teacher");
  }

  function btn3() {
    setName("Admin");
  }

  return (
    <div className="numberclass">
      <h1>{name}</h1>

      {/* //dan apata span eke count eka dammata vadi venne na
            // apata mevage veriable manage akaaranna usestate hooks 
            // oni venava  ekat api use state hooks eka import karaganna oni  */}

      <button className="m" onClick={function2}>
        -
      </button>
      <span>{count}</span>

      <button className="m" onClick={function1}>
        +
      </button>

      <div className="btns">
        <button onClick={btn1}>Student</button>
        <button onClick={btn2}>Teacher</button>
        <button onClick={btn3}>Admin</button>
      </div>
    </div>
  );
}
