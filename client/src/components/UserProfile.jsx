import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user } = useAuth0();

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900">
          User Information
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Username
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
        </dl>

        <div className="mx-auto bg-gray-200">
          <ul className="flex flex-col gap-4 bg-white text-gray-900">
            {user.map((item) => (
              <li>{user.item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
