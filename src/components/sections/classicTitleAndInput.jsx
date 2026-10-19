import SvgButton from "../Ui/Svgbutton";
import HidePasswordicon from "../icons/HidePassword";
import ShowPasswordicon from "../icons/ShowPassword";
function clasicTitleAndInput({
  type,
  title,
  name,
  onblur,
  focused,
  onfocuse,
  showPassword,
  setshowPassword,
  required = "",
  autoComplete = "",
  ...props
}) {
  //
  return (
    <>
      <div className="mb-4">
        <label className="block inputTitle">{title}</label>
        <div className="relative">
          <input
            required
            type={type}
            name={name}
            onBlur={onblur}
            onFocus={onfocuse}
            autoComplete={autoComplete}
            className="registerInput"
            {...props}
          />
          {focused && (
            <SvgButton
              type="button"
              className="h-4 w-4 absolute right-3 top-[calc(50%-8px)]"
              svg={
                showPassword ? (
                  <ShowPasswordicon width="w-full" height="h-full" />
                ) : (
                  <HidePasswordicon width="w-full" height="h-full" />
                )
              }
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onclick={() => {
                setshowPassword((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default clasicTitleAndInput;
