import React, { Fragment, useState } from "react";
import { Typography, Divider } from "@material-ui/core";
import Typical from "react-typical";
import { useDencrypt } from "use-dencrypt-effect";
import Flippy, { FrontSide, BackSide, DefaultCard } from "react-flippy";

const decryptOptions = {
  chars: `A B C D E F G H I J K L M N O P 
          Q R S T U V W X U Z ! @ # $ % & ( ) 
          { [ ] } < > ? 0 1 2 3 4 5 6 7 8 9`
    .replace("\n", "")
    .split(" "),
  interval: 70
};

const steps = ["ABCDEFGHIJKL", "12345678901"];

export const TypicalText = ({ text, duration }) => {
  const steps = ["", 500, text[0], duration];
  for (let i = 1; i < text.length; i++) {
    steps.push(steps[i * 2] + text[i], duration);
  }
  steps.push(text, 3000);

  return (
    <div
      style={{
        // marginBlockStart: -20,
        // marginBlockEnd: -20,
        fontSize: 60,
        fontWeight: "1000",
        color: "white"
      }}
    >
      {/* <div style={{ position: "absolute", opacity: 0.15 }}>{text}</div> */}
      <Typical steps={steps} loop={Infinity} wrapper="p" style={{ padding: 0 }} />
    </div>
  );
};

export const DencryptText = ({ text }) => {
  const { result, dencrypt } = useDencrypt(decryptOptions);
  // const steps = [text[0]];
  // const interval = [2000];
  // let tmp = 250;
  // let add = 20;

  // text += " ";
  // for (let i = 1; i < text.length; i++) {
  //   steps.push(steps[i - 1] + text[i]);
  //   interval.push(tmp);
  //   tmp += add;
  //   add += 20;
  // }
  // steps[steps.length - 1] = " ";
  // interval[interval.length - 1] = 4000;

  // React.useEffect(() => {
  //   let i = 0;
  //   const func = () => {
  //     dencrypt(steps[i]);
  //     i = i === steps.length - 1 ? 0 : i + 1;
  //     setTimeout(func, interval[i]);
  //   };

  //   const action = setTimeout(func, 1000);

  //   return () => clearTimeout(action);
  // }, []);

  const intervals = [];
  const interval = decryptOptions.interval * text.length * 2;
  const curSteps = [];

  for (let i = 0; i < steps.length - 1; ++i) {
    curSteps.push(steps[i]);
    intervals.push(interval);
  }
  curSteps.push(text);
  intervals.push(interval);

  curSteps.push(text);
  intervals.push(800);
  intervals[0] = 4000;

  const colors = ["#ff5050", "#50ff50", "#5050ff"];
  const [changableColor, setColor] = useState("#888888");

  React.useEffect(() => {
    let i = 0;
    const func = () => {
      dencrypt(curSteps[i]);
      i = i === curSteps.length - 1 ? 0 : i + 1;
      if (i === 0) {
        setColor("#888888");
      } else {
        //setColor(colors[Math.floor(Math.random() * colors.length)]);
        setColor("#bbbbbb");
      }

      setTimeout(func, intervals[i]);
    };

    const action = setTimeout(func, 1000);

    return () => clearTimeout(action);
  }, []);

  //const texts = [text, " "];
  // React.useEffect(() => {
  //   let i = 0;
  //   const action = setInterval(() => {
  //     dencrypt(steps[i]);
  //     i = i === steps.length - 1 ? 0 : i + 1;
  //   }, 3000);
  //   return () => clearInterval(action);
  // }, []);

  return (
    <div
      style={{
        marginBlockEnd: 0,
        fontSize: 20,
        fontWeight: "900",
        color: changableColor
      }}
    >
      {/* <div style={{ position: "absolute", opacity: 0.15 }}>{text}</div> */}
      {result}&ensp;
    </div>
  );
};

export const ModuleDivider = (props) => {
  return (
    <Fragment>
      <Typography
        display="block"
        style={{ marginBlockStart: 20, color: "#888888" }}
      >
        {props.caption}
      </Typography>
      <Divider orientation={props.orientation} style={{ marginBlockEnd: 0 }} />
    </Fragment>
  );
};

export const AutoFlippy = ({ text }) => {
  const [isFlipped, setIsFlipped] = useState(true);

  React.useEffect(() => {
    let flipped = isFlipped;
    const action = setInterval(() => {
      flipped = !flipped;
      setIsFlipped(flipped);
    }, Math.floor(Math.random() * 500) + 1000);

    return () => clearInterval(action);
  }, []);

  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick={false} // default false
      flipDirection="horizontal" // horizontal or vertical
      isFlipped={isFlipped}
      style={{ width: "160px", height: "65px",textAlign:"center" }} /// these are optional style, it is not necessary
    >
      <FrontSide
        style={{
          backgroundColor: "grey",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: "900",
          fontFamily: "cursive"
        }}
      >
        {/* <div
          style={{
            fontSize: 20,
            margin: 0,
            position: "center"
          }}
        /> */}
        {text}
      </FrontSide>
      <BackSide
        style={{
          backgroundColor: "#DCDCDC",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0f3838",
          fontSize: 20,
          fontWeight: "900",
          fontFamily: "cursive"

        }}
      >
        {text}
      </BackSide>
    </Flippy>
  );
};
