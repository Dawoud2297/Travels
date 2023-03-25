import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../Hooks/usePagination";
import filterAction from "../actions/filterAction";
import { useDispatch } from "react-redux";
import dateFormat from "../helpers/dateFormat";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    //////////////////////
    dest,
    options,
    checkIn,
    checkOut,
  } = props;

  const dispatch = useDispatch();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const sendPageNum = (pageNum) => {
    dispatch(filterAction(
      dest.dest_id,
      dest.dest_type,
      dateFormat(checkIn),
      dateFormat(checkOut),
      options.adults,
      options.children,
      options.rooms,
      pageNum -1
    ))
    onPageChange(pageNum)
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.length && paginationRange[paginationRange?.length - 1];

  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render Page Pills
        return (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage
            })}
            // onClick={() => onPageChange(pageNumber)}
            onClick={() => sendPageNum(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
