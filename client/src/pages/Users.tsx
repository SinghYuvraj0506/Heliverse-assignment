import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

import UserCards from "@/components/UserCards";
import SearchingDiv from "@/components/SearchingDiv";
import PaginationDiv from "@/components/PaginationDiv";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/actions/userActions";
import { changeHeaderData } from "@/store/features/generalSlice";

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const UserState = useSelector((state) => state.users);

  const [currentPage, setcurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: null,
    domain: null,
    availability: null,
    search: null,
  });

  useEffect(() => {
    dispatch(
      fetchUsers({
        gender: filters?.gender,
        available: filters?.availability,
        domain: filters?.domain,
        search: filters?.search,
        page:currentPage
      })
    );
  }, [filters,currentPage]);


  useEffect(() => {
    if(UserState?.data?.count){
      dispatch(changeHeaderData({headerSubtitle:`${UserState?.data?.count} results out of ${UserState?.data?.totalUsers}`}))
    }
    else{
      dispatch(changeHeaderData({headerSubtitle:null}))
    }
  }, [UserState])
  

  const handleFilterChange = (name: string, value: string) => {
    setcurrentPage(1)
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="w-full flex flex-col gap-1 sm:gap-4 h-full">
      <Header />

      <section className="w-full h-full overflow-hidden relative mb-4 md:mb-8 flex flex-col gap-5 sm:gap-8">
        {/* searchbar and filters-------------------- */}
        <SearchingDiv handleFilterChange={handleFilterChange} />

        {/* Content dv---------- */}
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 h-[65%] sm:h-[80%] overflow-y-auto">
          {UserState?.data?.data?.map((user, i) => {
            return <UserCards {...user} />;
          })}
        </div>

        <PaginationDiv
          totalPages={UserState?.data?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setcurrentPage}
        />
      </section>
    </div>
  );
};

export default Users;
