import IconButton from "../Ui/IconButton";
import Input from "../Ui/Input";
import Button from "../Ui/Button";
//states
import { useState, useEffect } from "react";
//imgs
import Xmark from "@/assets/icons/xmark.png";

function EditTask({
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
}) {
  const typesArray = ["health", "work", "mental health", "education", "debts"];

  //function to add objet
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
        <div className="flex gap-2">
          <Button
            onClick={() => {
              action(selectedTask);
            }}
            className={`btn flex-1 text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]" : ""}`}
            text={btntext}
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
