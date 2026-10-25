import Input from "../Ui/Input";
import Button from "../Ui/Button";
import Paragraph from "../Ui/Paragraph";
import DatePicker from "react-datepicker";
import DateTimeIcon from "../pages/datetime";
import SvgButton from "../Ui/Svgbutton";
//firebase
import { db, auth } from "../../Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

//states
import { useState, useEffect } from "react";
//imgs

function EditTask({
  setTasks,
  tasks,
  onClick,
  value,
  setValue,
  selected,
  setSelected,
  selectedTask,
  setEdit,
}) {
  //state for opinning the date time when we add task-----------------
  const [openDateForm, setopenDateForm] = useState(false);
  //state for date -----------
  const [selectedDate, setSelectedDate] = useState(
    selectedTask.taskDay ? new Date(selectedTask.taskDay + "T00:00:00") : null,
  );
  const [startTime, setStartTime] = useState(
    selectedTask.whenToStart
      ? new Date(`${selectedTask.taskDay}T${selectedTask.whenToStart}:00`)
      : null,
  );
  //durition for select heurs --------------
  const [duration, setDuration] = useState(
    selectedTask.taskDuration ? selectedTask.taskDuration : "",
  );
  const [SchudulDate, setSchudulDate] = useState({
    userShosenDate: new Date(selectedTask.taskDay + "T00:00:00") || "",
    startTime:
      new Date(`${selectedTask.taskDay}T${selectedTask.whenToStart}:00`) || "",
  });
  // date fore datePicker
  // const date = selectedDate.taskDay
  //   ? new Date(selectedDate.taskDay + "T00:00:00")
  //   : null;
  // const time = selectedTask.whenToStart
  //   ? new Date(`2000-01-01T${selectedTask.whenToStart}:00`)
  //   : null;
  //
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
  //
  function hanldeDateChange(date) {
    setSelectedDate(date);
  }
  function handlestartTime(time) {
    setStartTime(time, "time");
  }
  function handleSubmit(e) {
    e.preventDefault();
    setopenDateForm((prev) => !prev);
    setSchudulDate({
      userShosenDate: selectedDate || "",
      startTime: startTime || "",
    });
  }
  // edit task
  function editTask() {
    const dateOnly = SchudulDate.userShosenDate
      ? SchudulDate.userShosenDate.toLocaleDateString("en-CA")
      : "";
    const timeOnly = SchudulDate.startTime
      ? SchudulDate.startTime.toTimeString().slice(0, 5)
      : "";
    // const durition = SchudulDate.duration;
    setTasks((prev) =>
      prev.map((task) => {
        if (task?.id === selectedTask.id) {
          selectedTask.task = value;
          selectedTask.type = selected || "others";
          selectedTask.taskDay = dateOnly;
          selectedTask.whenToStart = timeOnly;
          selectedTask.taskDuration = duration;
        }
        return task;
      }),
    );
    setEdit(false);
    //change the the firebase task
    async function updateTask() {
      const user = auth.currentUser;
      const taskRef = doc(db, "users", user.uid, "tasks", selectedTask.id);

      await updateDoc(taskRef, {
        task: value,
        type: selected || "others",
        taskDay: dateOnly,
        whenToStart: timeOnly,
        taskDuration: duration,
      });
    }
    updateTask();
  }
  return (
    <div className="mb-8 bg-white ">
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
                    // setSchudulDate({});
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
            onClick={editTask}
            className={`btn flex-1 text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]" : ""}`}
            text="edit"
          />
          <Button
            onClick={onClick}
            className={`btn text-[#898989] capitalize w-[87px]`}
            text={"cancel"}
          />
        </div>
      </div>
    </div>
  );
}
export default EditTask;
