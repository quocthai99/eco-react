import React, { useMemo } from "react";
import { range } from "../ultils/helpers";

const usePagination = (
  totalCount,
  currentPage,
  pageSize,
  siblingCount,
) => {
  const paginationRange = useMemo(() => {
    console.log(totalCount / pageSize)
    const totalPageCount = Math.ceil(totalCount / pageSize) // tong so trang
    console.log({currentPage, totalPageCount, totalCount, pageSize})

    const totalPageNumber = siblingCount + 5 // tong so trang toi thieu hien thi

    if (totalPageNumber >= totalPageCount) {
      return range(1, totalPageCount)
    }

    // show dot
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if ( !shouldShowLeftDots && shouldShowRightDots ) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1 , leftItemCount)

      return [...leftRange, '...', totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
};

export default usePagination;
