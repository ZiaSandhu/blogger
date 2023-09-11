import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';


export default function FilterButton({ categories, selectedCategory, setSelectedCategory }) {
  const [toggleCategories, settoggleCategories] = useState();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Filter By Category
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              className={`block w-full ${
                selectedCategory === 'All Categories' && "font-bold"
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
                          console.log(e.target);
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
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
