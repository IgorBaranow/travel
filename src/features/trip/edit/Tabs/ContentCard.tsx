import React from 'react';

import { Card, Typography } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ContentCard({ title, children }: Props) {
  return (
    <Card variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 4 }}>
      <Typography mb={2} color="text.secondary">
        {title}
      </Typography>
      {children}
    </Card>
  );
}