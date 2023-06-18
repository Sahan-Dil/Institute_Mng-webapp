import React, { useState, useEffect } from 'react';
import { Grid, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ListSection = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleToggleAccordion = () => {
    setIsOpen(prevOpen => !prevOpen);
  };

  return (
    <div style={{ margin: 'auto', width: '98%', marginBottom: '40px', marginTop: '40px' }}>
      <div
        style={{
          background: '#006400',
          color: '#fff',
          padding: '10px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
        onClick={handleToggleAccordion}
      >
        <span>{title}</span>
        <FontAwesomeIcon icon={faChevronUp} color="#fff" />
      </div>
      {isOpen && (
        <div style={{ padding: '10px', border: '0.5px solid #006400', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px' }}>
          <TableContainer component={Paper} style={{ background: '#f5f5f5' }}>
          <Table>
          <TableHead style={{ background: '#808080' }}>
            <TableRow>
              {Object.keys(data[0]).map((property) => (
                property !== 'ID' && <TableCell key={property}>{property}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {Object.values(item).map((value, index) => (
                  index !== 0 && <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default ListSection;
