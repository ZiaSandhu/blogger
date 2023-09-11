import React, {useState, Fragment} from "react";

const DesktopFilter = ({categories,selectedCategory,setSelectedCategory}) => {
  const [toggleCategories, settoggleCategories] = useState();

  return (
    <div className="hidden lg:block py-1">
      <h3 className="text-lg text-gray-700 pb-3 px-4 border-b border-gray-950">Filter</h3>
      
      <button
        className={`block w-full ${
          selectedCategory === "All Categories" && "font-bold"
        } text-left items-center px-4 py-2 text-sm cursor-pointer`}
        onClick={() => {
          setSelectedCategory("All Categories");
        }}
      >
        All Categories
      </button>
      <hr className="m-2" />
      {categories &&
        categories.map((mainCategory, index) => (
          <div key={index} className="space-y-1">
            <button
              onClick={(e) => {
                setSelectedCategory(e.target.value);
                settoggleCategories(e.target.value);
              }}
              className={`block w-full ${
                selectedCategory === mainCategory.name && "font-bold"
              } text-left items-center px-4 py-2 text-sm cursor-pointer`}
              value={mainCategory.name}
            >
              {mainCategory.name}
            </button>
            {toggleCategories === mainCategory.name &&
              mainCategory.subCategories.map((subCategory, subIndex) => (
                <button
                  key={subIndex}
                  onClick={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  className={`block w-full ${
                    selectedCategory === subCategory && "font-bold"
                  } text-left items-center px-8 py-2 text-sm cursor-pointer`}
                  value={subCategory}
                >
                  {subCategory}
                </button>
              ))}
          </div>
        ))}
    </div>
  );
};

export default DesktopFilter;
