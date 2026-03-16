import React from 'react';

import { Card, Stack, Typography } from '@mui/material';

interface Props {
  title: string;
  titleElement?: React.ReactNode;
  children: React.ReactNode;
}

export default function ContentCard({ title, children, titleElement }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, maxWidth: 1400 }}
    >
      <Stack justifyContent="space-between" direction="row" mb={2}>
        <Typography color="text.secondary">{title}</Typography>
        {titleElement}
      </Stack>
      {children}
    </Card>
  );
}