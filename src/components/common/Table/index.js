import React from "react";
import "./table.css";
function Table({ columns, data,actions }) {
  return (
    <div>
      <div className="column">
        {columns.map((col, index) => {
          return (
            <div style={col.style} key={index}>
              {col.title}
            </div>
          );
        })}
      </div>
      <div className="data">
        {data.map((row, index) => {
          return (
            <div className="column">
              {columns.map((col, index) => {
                if (col.type === "button") {
                  return (
                    <div style={col.style}>
                      <button
                      onClick={()=>{actions(row,'edit')}}
                      className="edit"
                      >Edit</button>
                      <button
                      onClick={()=>{actions(row,'delete')}}
                      className="delete"
                      >Delete</button>
                    </div>
                  );
                } else {
                  return <div style={col.style}>{row[col.datakey]}</div>;
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
