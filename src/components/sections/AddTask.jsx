import IconButton from "../Ui/IconButton";
import Input from "../Ui/Input";
import Button from "../Ui/Button";
import SvgButton from "../Ui/Svgbutton";
//states
import { useState, useEffect } from "react";
//imgs
import Paragraph from "../Ui/Paragraph";
//icons
import DateTimeIcon from "../pages/datetime";
//about date time picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GenirateId } from "../../js/genirateId.js";
//this for fire base
import { db, auth } from "../../Firebase/firebase.js";
import { setDoc, doc } from "firebase/firestore";

function AddTask({
  setTasks,
  tasks,
  value,
  setValue,
  selected,
  setHide,
  onClick,
  setSelected,
}) {
  //state for opinning the date time when we add task-----------------
  const [openDateForm, setopenDateForm] = useState(false);
  //state for date -----------
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [SchudulDate, setSchudulDate] = useState({});
  //durition for select heurs --------------
  const [duration, setDuration] = useState("");
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
  // function to handle add task
  //add task
  function addTask(e) {
    //
    const user = auth.currentUser;
    console.log(user, "user");
    //
    const date = new Date().toLocaleString();
    const dateOnly = SchudulDate.userShosenDate
      ? SchudulDate.userShosenDate.toISOString().split("T")[0]
      : "";
    const timeOnly = SchudulDate.startTime
      ? SchudulDate.startTime.toTimeString().slice(0, 5)
      : "";
    //adding the task ----------------
    const newTask = {
      id: GenirateId(tasks),
      date: date,
      task: value,
      type: selected || "others",
      taskDay: dateOnly,
      whenToStart: timeOnly || "",
      taskDuration: duration,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    async function addTasksToFireStore() {
      try {
        await setDoc(doc(db, "users", user.uid, "tasks", newTask.id), newTask);
      } catch (error) {
        console.log(error);
      }
    }
    addTasksToFireStore();
    //
    setSchudulDate({});
    setValue("");
    setSelected("");
  }
  //
  function hanldeDateChange(date) {
    setSelectedDate(date);
  }
  function handlestartTime(time) {
    setStartTime(time, "time");
  }
  //function to add objet
  function handleSubmit(e) {
    e.preventDefault();
    setopenDateForm((prev) => !prev);
    setSchudulDate({
      userShosenDate: selectedDate,
      startTime: startTime,
      duration: duration || "",
    });
  }
  //
  return (
    <div className="p-3 fixed top-1/2 left-1/2 bg-white z-50 shadow-[0_10px_50px_rgba(128,128,128,0.8)] -translate-x-1/2 -translate-y-1/2 min-w-[328px] rounded-md">
      <div>
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
              className={`absolute -top-[303px] border border-gray-400/30 p-4 rounded-md bg-white w-[275px]  ${openDateForm ? "block" : "hidden"}`}
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
                  onChange={hanldeDateChange}
                  placeholderText="Choose a date"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  className="registerInput w-auto"
                  required
                />
              </div>
              <div>
                <label className="inputTitle">{"start time"}</label>
                <DatePicker
                  selected={startTime}
                  onChange={handlestartTime}
                  placeholderText="Choose start time"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start time"
                  dateFormat="h:mm aa"
                  className="registerInput w-auto"
                  required
                />
              </div>
              <div className="mb-1">
                <label className=" inputTitle">{"duration"}</label>
                <select
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="registerInput w-auto
             outline-none transition
             focus:border-blue-500 focus:ring-2
             focus:ring-blue-100"
                >
                  <option value="" disabled className="text-gray-500">
                    Select duration
                  </option>
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
                    setSchudulDate({});
                  }}
                  className={` inputSubBtn text-white bg-gradient-to-r from-gray-400 to-gray-700 mb-1 mt-5 flex item-center justify-center gap-1`}
                  text={"cancel"}
                />
              </div>
            </form>
            {/* // --------*/}
            <SvgButton
              onclick={() => {
                setopenDateForm(true);
              }}
              type="button"
              svg={<DateTimeIcon />}
              className="btn w-[60px] flex items-end justify-center"
            />
          </div>
          <Button
            disabled={value.trim().length <= 0}
            onClick={addTask}
            className={`btn flex-1 text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]" : ""}`}
            text={"add"}
          />
          <Button
            onClick={() => {
              setHide(false);
              setSchudulDate({});
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
