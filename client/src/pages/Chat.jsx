/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]

export default function Chat() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [loading, setLoading] = useState(false)
  return (
    <>
      {/* {loading && <Loader />} */}

      {!loading && (
        <div className="bg-gray-50">
          <>
            {/* Mobile filter dialog */}
            {/* <MobileFilter
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
            /> */}

            <main className="mx-auto max-w-5xl max-h-[80vh] py-10 px-4 sm:px-6 h-auto lg:px-8 shadow-xl overflow-hidden">
              {/* <div className="flex items-baseline justify-between border-b border-gray-200 pt-10"> */}
                {/* <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button> */}
              {/* </div> */}

              <section
                aria-labelledby="products-heading"
                className="overflow-y-auto scroll-auto h-auto bg-gray-50 border-2"
              >
                <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-5">
                  {/* Filters */}

                  <div className="col-span-2 h-auto border-r-2">
                    <h1 className="text-3xl bg-white pl-4 h-16 flex items-center border-b-2 font-bold tracking-tight text-gray-900">
                      Inbox
                    </h1>
                    {/* users */}
                    <div className="flex flex-col gap-4 px-4 mt-5 overflow-y-auto scroll-auto">
                      {people.map((person) => (
                        <div className="flex min-w-0 gap-4">
                          <img
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            src={person.imageUrl}
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {person.email}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-3 relative h-auto overflow-y-auto bg-gray-50">
                    {/* header */}
                    <div className="h-16 px-4 flex gap-x-4 items-center bg-white border-b-2">
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <p className="text-base font-normal leading-6 text-gray-900">
                        Someone
                      </p>
                    </div>
                    {/* chat */}
                    <div className="flex-grow overflow-y-auto pr-2 max-w-xl mx-auto bg-gray-100">
                      <div className="flex flex-col mb-4 gap-4 py-4">
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-gray-900 text-sm">
                              Hey, how are you?
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-white text-sm">
                              I'm good, thanks! How about you?
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-gray-900 text-sm">
                              I'm doing great, thanks for asking!
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-gray-900 text-sm">
                              Hey, how are you?
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-white text-sm">
                              I'm good, thanks! How about you?
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-gray-900 text-sm">
                              I'm doing great, thanks for asking!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* input form */}
                    <div className="absolute bottom-0 px-3 w-full flex justify-center items-center h-16">
                      <input
                        type="text"
                        className="border block border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4"
                        placeholder="Type a message..."
                      />
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </>
        </div>
      )}
    </>
  );
}
