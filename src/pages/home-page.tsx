import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@redux/selectors";
import { UserContentLayout } from "@views/user-content-layout";
import { useEffect, useMemo } from "react";

export const HomePage = () => {
  const { users, isLoading } = useAppSelector(userSelector);

  const [archived, active] = useMemo(() => {
    const archived = users.filter((user) => user.isArchived);
    const active = users.filter((user) => !user.isArchived);
    return [archived, active];
  }, [users]);

  if (isLoading)
    return (
      <div
        className={
          "h-min-80 absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center"
        }
      >
        <div
          className="text-blue-600 inline-block size-10 animate-spin rounded-full border-[3px] border-gray-300 border-t-transparent dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <section className="text-black-100 mt-7 w-full flex flex-col space-y-8 mb-10">
      <UserContentLayout title="Активные" users={active} />
      <UserContentLayout title="Архив" users={archived} />
    </section>
  );
};
