import { useState } from "react";
function Task({ count, onClick, category, selectedCategory }) {
  //function to filter tasks
  console.log(selectedCategory, "selected category ");
  return (
    <div
      className={`p-4 ${category.className} ${selectedCategory ? "border-green-500" : "border-transparent"} font-inter rounded-xl border cursor-pointer `}
      onClick={onClick}
    >
      <img className="w-5" src={category.img} alt={`${category.type} img`} />
      <div className="">
        <span className="mr-1 text-[#121212] font-bold">{count}</span>
        <span className="text-[RGB(18,18,18,.5)] inline-block capitalize">
          {category.type}
        </span>
      </div>
    </div>
  );
}
export default Task;
