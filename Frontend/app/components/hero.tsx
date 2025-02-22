import React from "react";

const Hero = () => {
  return (
    <div className="parent  p-10 grid md:grid-cols-2 items-center bg-slate-50 sm:grid-cols-1  ">
      <div>
        <div>
          <h1 className=" text-center uppercase">
            for all your furniture need
          </h1>
        </div> 
        <p className="text-justify capitalize">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam rerum,
          maiores neque iusto odit voluptas vero. Sequi, fuga voluptate tenetur
          exercitationem laborum odit mollitia doloribus! Distinctio provident
          illo id blanditiis?
        </p>
        <div className=" flex justify-center mt-3">
          <button className="prbtn">countact</button>
          <button className="secbtn">about</button>
        </div>
      </div>
      <div className="ml-3">
        <img className="w-full" src="/slider-img.png" alt="img"></img>
      </div>
    </div>
  );
};

export default Hero;
