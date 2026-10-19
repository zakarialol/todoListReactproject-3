import IconButton from "../Ui/IconButton";
import Input from "../Ui/Input";
import Button from "../Ui/Button";
import SvgButton from "../Ui/Svgbutton";
//states
import { useState, useEffect } from "react";
//imgs
import Xmark from "@/assets/icons/xmark.png";
import Paragraph from "../Ui/Paragraph";
//icons
import DateTimeIcon from "../pages/datetime";
//about date time picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTask({
  setTasks,
  tasks,
  onClick,
  btntext,
  action,
  setEdit,
  value,
  setValue,
  selected,
  setSelected,
  selectedTask,
  setHide,
}) {
  //durition for select heurs --------------
  const [duration, setDuration] = useState("60");

  const durations = [
    { label: "15 minutes", value: "15" },
    { label: "30 minutes", value: "30" },
    { label: "45 minutes", value: "45" },
    { label: "1 hour", value: "60" },
    { label: "1 hour 30 minutes", value: "90" },
    { label: "2 hours", value: "120" },
    { label: "3 hours", value: "180" },
    { label: "4 hours", value: "240" },
  ];
  //
  const typesArray = ["health", "work", "mental health", "education", "debts"];
  //state for opinning the date time when we add task-----------------
  const [openDateForm, setopenDateForm] = useState(false);
  //state for date -----------
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  //function to add objet
  function handleSubmit(e) {
    e.preventDefault();
    console.log("hello world");
  }
  return (
    <div className="mb-8 bg-white ">
      <div>
        <div className="flex justify-end mb-3" onClick={onClick}>
          <IconButton text={Xmark} />
        </div>
        <Input
          value={value}
          setValue={setValue}
          placeHolder="write a new task..."
          className={
            "w-full px-4 py-1 text-xl placeholder:opacity-30 placeholder:text-3xl outline-none placeholder:capitalize mb-5"
          }
        />
      </div>
      <div>
        <div className="flex gap-[10px] mb-5 flex-wrap">
          {typesArray.map((item, index) => (
            <span
              key={item}
              className={` uppercase bg-[RGB(224_224_224_/.4)] px-[6px] py-[4px] rounded text-xs text-[RGB(102_102_102_/.5)] border border-transparent cursor-pointer ${selected === item ? "selected" : ""}`}
              onClick={() => {
                setSelected((prev) => (prev === item ? "" : item));
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className=" flex gap-2">
          {/* //for datetime button ---------- */}
          <div className="relative">
            <form
              className={`absolute -top-[303px] border border-gray-400 p-4 rounded-md bg-white w-[275px]  ${openDateForm ? "block" : "hidden"}`}
              onSubmit={handleSubmit}
            >
              <div className="text-center">
                <Paragraph
                  className="formTitle text-base mb-1"
                  text="schedule (optional)"
                />
              </div>
              <div className="mb-1">
                <label className="inputTitle">{"date"}</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Choose a date"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  className="registerInput w-auto"
                />
              </div>
              <div>
                <label className="inputTitle">{"start time"}</label>
                <DatePicker
                  selected={startTime}
                  onChange={setStartTime}
                  placeholderText="Choose start time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start time"
                  dateFormat="h:mm aa"
                  className="registerInput w-auto"
                />
              </div>
              <div className="mb-1">
                <label className=" inputTitle">{"duration"}</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="registerInput w-auto
             outline-none transition
             focus:border-blue-500 focus:ring-2
             focus:ring-blue-100"
                >
                  {durations.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-1 mt-5 flex item-center justify-center gap-1"
                  text="save"
                />
                <Button
                  onClick={() => {
                    setopenDateForm((prev) => !prev);
                  }}
                  className={` inputSubBtn text-white bg-gradient-to-r from-gray-400 to-gray-700 mb-1 mt-5 flex item-center justify-center gap-1`}
                  text={"cancel"}
                />
              </div>
            </form>
            {/* // --------*/}
            <SvgButton
              onclick={() => {
                setopenDateForm((prev) => !prev);
              }}
              type="button"
              svg={<DateTimeIcon />}
              className="btn w-[60px] flex items-end justify-center"
            />
          </div>
          <Button
            disabled={value.trim().length <= 0}
            onClick={() => {
              action(selectedTask);
            }}
            className={`btn flex-1 text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]" : ""}`}
            text={btntext}
          />
          <Button
            onClick={() => {
              setHide(false);
            }}
            className={`btn text-[#898989] capitalize w-[87px]`}
            text={"cancel"}
          />
        </div>
      </div>
    </div>
  );
}
export default AddTask;
