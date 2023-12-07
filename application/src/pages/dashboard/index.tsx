// Dashboard.js
import React from "react";

const Dashboard = () => {
  return (
    <div className="relative w-full">
      <div className="absolute w-full">
        <div className="flex w-full flex-col gap-[10px]">
          <div className="flex w-full h-[120px] gap-[10px]">
            <div className="bg-white w-[33%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 1</h3>
              <p>Conteúdo do Card 1</p>
            </div>
            <div className="bg-white w-[33%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 2</h3>
              <p>Conteúdo do Card 2</p>
            </div>
            <div className="bg-white w-[33%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 3</h3>
              <p>Conteúdo do Card 3</p>
            </div>
          </div>
          <div className="flex w-full h-[calc(100% - 120px)] gap-[10px]">
            <div className="bg-white w-[50%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 4</h3>
              <p>Conteúdo do Card 4</p>
            </div>
            <div className="bg-white w-[50%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 5</h3>
              <p>Conteúdo do Card 5</p>
            </div>
          </div>
          <div className="flex w-full h-[calc(100% - 120px)] gap-[10px]">
            <div className="bg-white w-[50%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 6</h3>
              <p>Conteúdo do Card 6</p>
            </div>
            <div className="bg-white w-[50%] p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">Card 7</h3>
              <p>Conteúdo do Card 7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
