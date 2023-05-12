import { Button, ButtonGroup } from '@chakra-ui/react';

function Pagination({ totalPages, currentPage, changePage }) {
  const maxPages = 5;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const pageRange = Math.floor((maxPages - 1) / 2);
  let maxPageNumber = currentPage + pageRange;
  let minPageNumber = currentPage - pageRange;

  if (minPageNumber < 1) {
    minPageNumber = 1;
    maxPageNumber = minPageNumber + (maxPages - 1);
  }

  if (maxPageNumber > totalPages) {
    maxPageNumber = totalPages;
    minPageNumber = totalPages - (maxPages - 1);
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  return (
    <ButtonGroup size="sm" mb="40px">
      <Button
        onClick={() => changePage(1)}
        className="firstPageButton"
        title="First"
        variant="ghost"
        disabled={currentPage === 1}
      >
        First
      </Button>

      <Button
        onClick={handlePrevPage}
        className="prevPageButton"
        title="Prev"
        variant="ghost"
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {pageNumbers
        .filter((pageNumber) => pageNumber >= minPageNumber && pageNumber <= maxPageNumber)
        .map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            className={pageNumber === currentPage ? 'activePageButton' : 'pageButton'}
            variant={pageNumber === currentPage ? 'solid' : 'ghost'}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </Button>
        ))}

      <Button
        onClick={handleNextPage}
        className="nextPageButton"
        title="Next"
        variant="ghost"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>

      <Button
        onClick={() => changePage(totalPages)}
        className="lastPageButton"
        title="Last"
        variant="ghost"
        disabled={currentPage === totalPages}
      >
        Last
      </Button>
    </ButtonGroup>
  );
}

export default Pagination;
