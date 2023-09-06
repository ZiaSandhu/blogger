import React from 'react'
import { Triangle } from  'react-loader-spinner'
const Loader = () => {
  return (
    <div className="mx-auto max-w-5xl flex justify-center items-center mt-20  px-2 sm:px-6 lg:px-8 text-center h-[60vh]">
      <div>
        <Triangle
          height="120"
          width="120"
          color="gray"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default Loader