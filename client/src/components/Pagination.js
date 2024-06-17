import React from "react";
import { usePagination } from "../hook";
// import { createSearchParams, useNavigate } from "react-router-dom";

const notActivePage = 'bg-gray-200 cursor-pointer hover:bg-gray-400 px-5 py-2 max-w-10 flex items-center justify-center rounded-full'
const activePage = 'bg-gray-400 cursor-pointer px-5 py-2 max-w-10 flex items-center justify-center rounded-full'

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 10,
}) => {
  const paginationRange = usePagination(totalCount, currentPage, pageSize, siblingCount)
  // const navigate = useNavigate()
  const onPrev = () => {
    onPageChange(currentPage - 1)
  }
  const onNext = () => {
    onPageChange(currentPage + 1)
  }
  
  // useEffect(() => {
  //   navigate({
  //     pathname: '',
  //     search: createSearchParams({
  //       page: currentPage
  //     }).toString()
  //   })

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage])

  return <div>
    <div className="flex justify-center items-center gap-5">
      <div onClick={onPrev} className={`${currentPage === 1 || currentPage === undefined && 'hidden'} cursor-pointer`}>{'<<'}</div>
      {paginationRange?.map((page, i) => {
        return (
          <div
            key={i}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? activePage : notActivePage}
          >
            {page}
          </div>
        )
      })}
      <div onClick={onNext} className={`${currentPage >= paginationRange?.length || currentPage === undefined ? 'hidden' : "cursor-pointer"}`}>{'>>'}</div>
    </div>
  </div>;
};

export default Pagination;
