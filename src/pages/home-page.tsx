import { Loader } from "@components/ui/loader";
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

  if (isLoading) return <Loader />;

  return (
    <section className="text-black-100 mt-7 w-full flex flex-col space-y-8 mb-10 p-4 md:p-0">
      <UserContentLayout title="Активные" users={active} />
      <UserContentLayout title="Архив" users={archived} />
    </section>
  );
};
