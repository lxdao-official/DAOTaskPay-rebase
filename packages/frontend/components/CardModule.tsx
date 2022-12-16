import { PropaneSharp } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useRef } from 'react';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function CardModule(props: {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  id?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}) {
  return (
    <Box
      style={{
        margin: '0 auto',
        padding: '16px',
        borderRadius: '10px',
        background: '#fff',
        marginBottom: '20px',
        opacity: 0.99,
      }}
    >
      <Box
        style={{
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: '30px',
          color: '#252525',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {props.title}
        <Box
          style={{
            fontSize: '14px',
            color: '#5B28EB',
          }}
        >
          {props.extra}
        </Box>
      </Box>
      <div>{props.children}</div>
    </Box>
  );
}
