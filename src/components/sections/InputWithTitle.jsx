function InputWithTitle({ title, type, name, error, showError, ...props }) {
  console.log(error, "erro iniside the input withtitle **@@@**");
  //
  //
  return (
    <>
      <div className="mb-4">
        <label htmlFor={title} className="block inputTitle">
          {title}
        </label>
        <input
          type={type}
          name={name}
          {...props}
          id={title}
          className="registerInput"
        />

        <div
          // className={`overflow-hidden transition-[max-height] duration-1000 ${
          //   error ? "max-h-5" : "max-h-[0px]"
          // }`}
          className={`overflow-hidden transition-[max-height] duration-1000 ${
            showError ? "max-h-6" : "max-h-0"
          }`}
        >
          {error.split(",").map((item) => {
            return (
              <p key={item} className="font-inter text-red-500 mr-4">
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default InputWithTitle;
