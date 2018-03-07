import React from 'react';
import { Button } from 'material-ui';

const nextPage = (props) => {
  const {
    page,
    onChangePage
  } = props;

  let nextPage = page + 1;
  onChangePage(nextPage);
};

const previousPage = (props) => {
  const {
    page,
    onChangePage
  } = props;

  let previousPage = page - 1;
  onChangePage(previousPage);
};

const Pagination = (props) => {
  const {
    page,
    pageSize,
    count,
    isFetching
  } = props;

  const lastPage = (count <= pageSize ? 1 : Math.ceil(count / pageSize));

  return (
    <div>
      <Button
        disabled={page === 1 || isFetching}
        onClick={() => previousPage(props)}
      >
        Previous
      </Button>
      <Button
        onClick={() => nextPage(props)}
        disabled={count < pageSize || page === lastPage || isFetching}
      >
        Next
      </Button>
    </div>
  )
};

export default Pagination;
