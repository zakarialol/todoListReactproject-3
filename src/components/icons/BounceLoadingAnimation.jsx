function BounceLoadingAnimation({
  width = "48px",
  height = "24px",
  className = "",
}) {
  const dots = [
    {
      x: 100,
      begin: "0s",
      keyTimes: "0; 0.195122; 0.682927; 1",
      values: "100 145; 100 145; 100 125; 100 125",
      scaleTimes: "0; 0.195122; 0.682927; 1",
      scaleValues: "0.7 0.7; 0.7 0.7; 1 1; 1 1",
    },
    {
      x: 250,
      begin: "0s",
      keyTimes: "0; 0.097561; 0.585366; 1",
      values: "250 145; 250 145; 250 125; 250 125",
      scaleTimes: "0; 0.097561; 0.585366; 1",
      scaleValues: "0.7 0.7; 0.7 0.7; 1 1; 1 1",
    },
    {
      x: 400,
      begin: "0s",
      keyTimes: "0; 0.487805; 1",
      values: "400 145; 400 125; 400 125",
      scaleTimes: "0; 0.487805; 1",
      scaleValues: "0.7 0.7; 1 1; 1 1",
    },
  ];

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 500 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {dots.map((dot, index) => (
        <g key={dot.x}>
          <g transform={`translate(${dot.x},125)`}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={dot.values}
              keyTimes={dot.keyTimes}
              keySplines={
                index === 2
                  ? "0.333 0 0.667 1; 0 0 1 1"
                  : "0 0 1 1; 0.333 0 0.667 1; 0 0 1 1"
              }
              calcMode="spline"
              dur="1.367s"
              repeatCount="indefinite"
              fill="freeze"
            />

            <g>
              <animateTransform
                attributeName="transform"
                type="scale"
                values={dot.scaleValues}
                keyTimes={dot.scaleTimes}
                keySplines={
                  index === 2
                    ? "0.333 0 0.667 1; 0 0 1 1"
                    : "0 0 1 1; 0.333 0 0.667 1; 0 0 1 1"
                }
                calcMode="spline"
                dur="1.367s"
                repeatCount="indefinite"
                fill="freeze"
              />

              <circle cx="0" cy="0" r="30" fill="white" />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}

export default BounceLoadingAnimation;
