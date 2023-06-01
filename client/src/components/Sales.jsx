import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePurchaseById } from '../redux/asyncActions';

import Pagination from './Pagination';
import SalesDetails from './SalesDetails';

import { Box, Button, Spacer, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';

function Sales({ salesData }) {
  const dispatch = useDispatch();
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleStatusChange = (saleId, newStatus) => {
    dispatch(updatePurchaseById({ purchaseId: saleId, purchaseData: { status: newStatus } }));
  };

  const handlePurchaseDetail = (saleId) => {
    setSelectedSaleId(saleId);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = salesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(salesData.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      <Spacer height="2" />
      {selectedSaleId ? (
        <SalesDetails
          saleData={salesData.find((sale) => sale.id === selectedSaleId)}
          onClose={() => setSelectedSaleId(null)}
        />
      ) : (
        <>
          <Table variant="simple" width="100%">
            <Thead>
              <Tr>
                <Th width="10%" fontSize="sm">
                  ID
                </Th>
                <Th width="20%" fontSize="sm">
                  NAME
                </Th>
                <Th width="20%" fontSize="sm">
                  PHONE NUMBER
                </Th>
                <Th width="20%" fontSize="sm">
                  EMAIL
                </Th>
                <Th width="10%" fontSize="sm">
                  TOTAL
                </Th>
                <Th width="15%" fontSize="sm">
                  DATE
                </Th>
                <Th width="15%" fontSize="sm">
                  STATUS
                </Th>
                <Th width="10%" fontSize="sm">
                  Details
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentSales.map((sale) => {
                const createdAtDate = new Date(sale.createdAt);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <Tr key={sale.id}>
                    <Td width="10%">{sale.id}</Td>
                    <Td width="20%">
                      {sale.User.name} {sale.User.lastname}
                    </Td>
                    <Td width="20%">{sale.User.phoneNumber}</Td>
                    <Td width="20%">{sale.User.email}</Td>
                    <Td width="10%">${sale.total.toFixed(2)}</Td>
                    <Td width="15%">{formattedDate}</Td>
                    <Td width="15%">
                      <Box display="flex" alignItems="center">
                        <Button
                          size="sm"
                          variant={sale.status === 'Preparing' ? 'solid' : 'outline'}
                          colorScheme={sale.status === 'Preparing' ? 'blue' : 'gray'}
                          onClick={() => handleStatusChange(sale.id, 'Preparing')}
                          mx="1"
                        >
                          Preparing
                        </Button>

                        <Button
                          size="sm"
                          variant={sale.status === 'On its way' ? 'solid' : 'outline'}
                          colorScheme={sale.status === 'On its way' ? 'yellow' : 'gray'}
                          onClick={() => handleStatusChange(sale.id, 'On its way')}
                          mx="1"
                        >
                          On its way
                        </Button>

                        <Button
                          size="sm"
                          variant={sale.status === 'Delivered' ? 'solid' : 'outline'}
                          colorScheme={sale.status === 'Delivered' ? 'green' : 'gray'}
                          onClick={() => handleStatusChange(sale.id, 'Delivered')}
                          mx="1"
                        >
                          Delivered
                        </Button>

                        <Button
                          size="sm"
                          variant={sale.status === 'Canceled' ? 'solid' : 'outline'}
                          colorScheme={sale.status === 'Canceled' ? 'red' : 'gray'}
                          onClick={() => handleStatusChange(sale.id, 'Canceled')}
                          mx="1"
                        >
                          Canceled
                        </Button>
                      </Box>
                    </Td>
                    <Td width="10%">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Button
                          colorScheme="blue"
                          variant="ghost"
                          backgroundColor="white"
                          onClick={() => handlePurchaseDetail(sale.id)}
                        >
                          <FaShoppingBag />
                        </Button>
                      </Box>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Box display="flex" justifyContent="center" mt="4">
            <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
          </Box>
        </>
      )}
    </Box>
  );
}

export default Sales;
