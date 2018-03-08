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
    <div className="pagination">
      <div style={{ marginRight: '5px' }}>
        <Button
          color="primary"
          variant="raised"
          disabled={page === 1 || isFetching}
          onClick={() => previousPage(props)}
        >
        Anterior
        </Button>
      </div>
      <div style={{ marginLeft: '5px' }}>
        <Button
          color="primary"
          variant="raised"
          onClick={() => nextPage(props)}
          disabled={count < pageSize || page === lastPage || isFetching}
        >
        Próximo
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
