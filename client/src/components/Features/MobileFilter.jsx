import React, {useState, Fragment} from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const MobileFilter = ({categories,selectedCategory,setSelectedCategory, mobileFiltersOpen, setMobileFiltersOpen}) => {
    const [toggleCategories, settoggleCategories] = useState();
    return (
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Filters by Category
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className="py-1">
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
                            selectedCategory === mainCategory.name &&
                            "font-bold"
                          } text-left items-center px-4 py-2 text-sm cursor-pointer`}
                          value={mainCategory.name}
                        >
                          {mainCategory.name}
                        </button>
                        {toggleCategories === mainCategory.name &&
                          mainCategory.subCategories.map(
                            (subCategory, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={(e) => {
                                  console.log(e.target);
                                  setSelectedCategory(e.target.value);
                                }}
                                className={`block w-full ${
                                  selectedCategory === subCategory &&
                                  "font-bold"
                                } text-left items-center px-8 py-2 text-sm cursor-pointer`}
                                value={subCategory}
                              >
                                {subCategory}
                              </button>
                            )
                          )}
                      </div>
                    ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
}

export default MobileFilter