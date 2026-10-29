import CustomeCheckBox from "../../sections/customCheckBox";

function BinTableHeader({ allSelected, onSelectAll }) {
  return (
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50 text-left">
        <th className="p-4">
          <CustomeCheckBox
            checked={allSelected}
            onClick={onSelectAll}
            id="select-all"
          />
        </th>

        <th className="p-4 ">Tasks</th>
        <th className="p-4 text-center">Created At</th>
        <th className="p-4 text-center">Type</th>
        <th className="p-4 text-center whitespace-nowrap">Task Day</th>
        <th className="p-4 text-center ">time</th>
        <th className="p-4 text-center">Duration</th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>
  );
}

export default BinTableHeader;
